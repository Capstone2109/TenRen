import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeDummyCryptoWorth} from "../../app/trade";
import UserProfileLineChart from "./UserProfileLineChart";
import CryptoTransaction from "./CryptoTransaction";
import PercentChangeIcon from "./PercentChangeIcon"
import { savePastGame, updatePastCrypto, updatePastGameDay } from "../../app/tradegame";
import { dollarFormat } from "./UserProfileLineChart";

const PastTrading = (props) => {

    const dispatch = useDispatch();
    //State for the Day

    //get game settings
    let game = useSelector(state => state.currentGames.past)

    let day = useSelector((state) => state.currentGames.past.day)

    console.log("Day is",day)
    //get crypto worth from state
    let dummyCrypto = useSelector((state) => state.cryptoWorth)

    //Get how much money we have left to spend from the state
    let dollarAvailable = useSelector((state) => state.currentGames.past.dollarAvailable);

    //Get the list of all the crytos we own from the state
    let allOwnedCrypto = useSelector((state) => state.currentGames.past.ownedCryptos)

    //Filter out the crypto for the one we are currently interacting with
    let ownedCrypto = allOwnedCrypto.filter(crypto => crypto.name = dummyCrypto.name)[0]

    //Get the userinfo for graph in state
    let gameHistory = useSelector((state) => state.currentGames.past.history)

    //DUMMY DATA, PRETEND WE HAVE SOME ALREADY AND WE HAVE 1000 DOLLARS
    // useEffect(() => {

    //     //Raise Money to current dummy Asset
    //     animateAsset(dollarAvailable || 0)
    // }, [])


    useEffect(() => {
        if (ownedCrypto) {
            saveDataToGraph()
        }

    }, [day])

    //Moves on to Next Day
    function goToNextDay() {
        if (!ownedCrypto.dollarValue) {
            window.alert("Please Make An Investment To Proceed")
            return
        }
        let valueChange = ((Math.random() * 50) * (Math.random() < .5 ? 1 : -1))
        let pricePer = Math.max(1, 60 + valueChange).toFixed(2)
        dispatch(changeDummyCryptoWorth({ ...dummyCrypto, pricePer }))

        let dollarValue = ownedCrypto.amount * pricePer;
        let previousDollarValue = ownedCrypto.dollarValue
        dispatch(updatePastCrypto({ ...ownedCrypto, dollarValue, previousDollarValue }))
        dispatch(updatePastGameDay(day + 1))
        //colorAnimateAssest((dollarValue > previousDollarValue))
    }

    // function colorAnimateAssest(increase = true) {
    //     let classToAdd = increase ? "dollar-increase" : "dollar-decrease"

    //     document.getElementById("total-asset").classList.add(classToAdd)
    //     setTimeout(() => {
    //         document.getElementById("total-asset").classList.remove(classToAdd)
    //     }, 3000);
    // }

    //Save Data To Graph
    function saveDataToGraph() {
        //let newUserInfo = JSON.parse(JSON.stringify(dummyUserInfo))

        let percentChange = ownedCrypto?.dollarValue / ownedCrypto?.previousDollarValue
        
            let newPortfolio = [
                {
                    name: ownedCrypto.name,
                    asset: ownedCrypto.dollarValue,
                    percentChange,
                    timestamp: Date.now()
                },
                {
                    name: "Cash",
                    asset: dollarAvailable,
                    percentChange: 1,
                    timestamp: Date.now()
                }
            ]
        
        gameHistory.addPortfolio(newPortfolio)

        //dispatch(saveUserPastData(newUserInfo))
        // animateAsset(ownedCrypto?.dollarValue + dollarAvailable, dollarAvailable)
    }

    //Handles action to perform when game is terminated
    function endGame(){
        //INCOMPLETE MISSING SAVING HISTORY OF GAME
        dispatch(savePastGame({...game, completed: true}))
    }

    //This value is in decimal form (<1 for loss, >1 for gain)
    let percentChange = gameHistory.latestDailyPercentChange(ownedCrypto.name)
    //console.log("Percent change is",percentChange)
    let percentChangeString = `${((Math.abs(percentChange - 1)) * 100).toFixed(2)} %`
    //let percentChangeString = `${percentChange} %`
    // function animateAsset(newAmount, currentAmount = 0) {
    //     let element = document.getElementById("total-asset")
    //     if (!element) return
    //     let speed = 10

    //     let step = (newAmount - currentAmount) / speed
    //     let difference = newAmount - currentAmount

    //     if (Math.abs(difference) > 10) {
    //         element.innerHTML = dollarFormat.format(currentAmount + step)
    //         setTimeout(animateAsset, 10, newAmount, (currentAmount + step));
    //     } else {
    //         element.innerHTML = dollarFormat.format(newAmount)
    //     }

    // }
    return (
        <div className="profile-trade">
            <div>
                <h1>Day: {day}</h1>
                <h3>Crypto: {ownedCrypto?.name}</h3>
                <h3>Invested: {dollarFormat.format(ownedCrypto?.dollarValue)}
                    {!isNaN(percentChange) && percentChange !== Infinity ? <PercentChangeIcon percentChange={percentChange} percentChangeString={percentChangeString} /> : ''}
                </h3>
                <h3>Price of Crypto: {dollarFormat.format(dummyCrypto.pricePer)}</h3>

            </div>
            <h3>Dollar Available: {dollarFormat.format(dollarAvailable)}</h3>
            {/* <h2>Assest: {<span id="total-asset">{0}</span>}</h2> */}
            <div className="trading-visuals">
                <div className="graph-section">
                    <UserProfileLineChart userProfileData={gameHistory} />
                </div>
                <div className="tools">
                    <CryptoTransaction />
                    <div className="transaction-section">
                        {day < Number(game?.duration) ?
                            <button className="profile-button big" onClick={goToNextDay}>Next Day!</button> :
                            // <button className="profile-button big" onClick={endGame}>End Game</button>
                        ""}
                        <button className="profile-button big" onClick={endGame}>End Game</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default PastTrading;