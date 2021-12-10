import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileLineChart from "./UserProfileLineChart";
import CryptoTransaction from "./CryptoTransaction";
import PercentChangeIcon from "./PercentChangeIcon";
import {
  fetchLiveSingleCryptosWorth,
  fetchSingleCryptosWorth,
  getCryptoWorth,
  getLiveCryptoWorth,
  saveLiveGame,
  savePastGame,
  updateLiveCrypto,
  updatePastCrypto,
  updatePastGameDay,
} from "../../app/tradegame";
import { dollarFormat } from "./UserProfileLineChart";


const PastTrading = ({liveMode}) => {
  //console.log("Trading game liveMode is",liveMode)
  const dispatch = useDispatch();
  //State for the Day

  //get game settings
  let game = useSelector((state) => liveMode ? state.currentGames.live : state.currentGames.past)

  let day = game.day//useSelector((state) => state.currentGames.past.day);

  //get crypto worth from state
  let currentCrypto = useSelector((state) => state.cryptoWorth);

  //Get how much money we have left to spend from the state
  let dollarAvailable = game.dollarAvailable//useSelector(
  //   (state) => state.currentGames.past.dollarAvailable
  // );

  //Get the list of all the crytos we own from the state
  let allOwnedCrypto = game.ownedCryptos//useSelector(
  //   (state) => state.currentGames.past.ownedCryptos
  // );

  //Filter out the crypto for the one we are currently interacting with
  let ownedCrypto = allOwnedCrypto.filter(crypto => {
    if(crypto.name === currentCrypto.name) return true
    return false
  })[0] || {name: currentCrypto.name, amount: 0, dollarValue: 0, previousDollarValue: 0};

  //Get the userinfo for graph in state
  let gameHistory = game.history//useSelector((state) => state.currentGames.past.history);

  useEffect(() => {
    if (!liveMode && ownedCrypto) {
      saveDataToGraph();
    }
  }, [day]);

  useEffect(()=>{
    if(liveMode && ownedCrypto){
      saveDataToGraph();
    }
      
  },[allOwnedCrypto])

 
  //Moves on to Next Day
  async function goToNextDay() {
    if (!ownedCrypto.dollarValue) {
      window.alert("Please Make An Investment To Proceed");
      return;
    }
     
    let currentlyOwnedCryptos = await Promise.all(allOwnedCrypto.map(async (crypto) => {
      
       const nextDayCryptoPrice = await fetchSingleCryptosWorth(crypto.name, day + 1)
       const newCryptoValue = {...crypto, dollarValue: crypto.amount * nextDayCryptoPrice.price, previousDollarValue: crypto.dollarValue}
      return newCryptoValue
      }))

    dispatch(updatePastCrypto(currentlyOwnedCryptos))
    dispatch(getCryptoWorth(currentCrypto.name, day + 1))
    dispatch(updatePastGameDay(day + 1));
  }

  //Save Data To Graph
  function saveDataToGraph() {

    let newPortfolio = allOwnedCrypto.map( crypto => {
      
      return {name: crypto.name, asset: crypto.dollarValue, percentChange: 1, timestamp: Date.now()}
    })

    newPortfolio.push(  {
          name: "Cash",
          asset: dollarAvailable,
          percentChange: 1,
          timestamp: Date.now(),
        })
    gameHistory.addPortfolio(newPortfolio);

    liveMode ? dispatch(saveLiveGame(game)) : dispatch(savePastGame(game));

  }

  async function refreshGraph(){

    let currentlyOwnedCryptos = await Promise.all(allOwnedCrypto.map(async (crypto) => {
          
      const newCryptoPrice = await fetchLiveSingleCryptosWorth(crypto.name)
      const newCryptoValue = {...crypto, dollarValue: crypto.amount * newCryptoPrice.price, previousDollarValue: crypto.dollarValue}
      return newCryptoValue
     }))

   dispatch(updateLiveCrypto(currentlyOwnedCryptos))

   const element = document.getElementById("crypto-select-option")

   if(element){
    //console.log("getting crypto value for",element.value,"on element",element)
    dispatch(getLiveCryptoWorth(element.value))
   }

  }

  //Handles action to perform when game is terminated
  function endGame() {

    liveMode ? dispatch(saveLiveGame({ ...game, completed: true })):
    dispatch(savePastGame({ ...game, completed: true }));
  }
  
  let percentChange = gameHistory.latestDailyPercentChange(ownedCrypto?.name);

  return (
    <div className="profile-trade addPadding">
      <div>
        {!liveMode ? <h1>Day: {day}</h1>:""}
        
        <h3>Crypto: {ownedCrypto?.name}</h3>
        <h3>
          Invested: {dollarFormat.format(ownedCrypto?.dollarValue)}
          {percentChange ? (
            <PercentChangeIcon
              percentChange={percentChange}
            />
          ) : (
            ""
          )}
        </h3>
        <h3>Price of Crypto: {dollarFormat.format(currentCrypto.price)}</h3>
      </div>
      <h3>Dollar Available: {dollarFormat.format(dollarAvailable)}</h3>
      
      <div className="trading-visuals">
        <div className="graph-section">
          <UserProfileLineChart userProfileData={gameHistory} />
        </div>
        <div className="tools">
          <CryptoTransaction liveMode={liveMode} />
          <div className="transaction-section">
            {!liveMode && day < Number(game?.duration) ? (
              <button className="profile-button big" onClick={goToNextDay}>
                Next Day!
              </button>
            ) : ("")}
            {liveMode ? <button className="profile-button big" onClick={refreshGraph}>
                Refresh!
              </button>:""}
            <button className="profile-button big" onClick={endGame}>
              End Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastTrading;
