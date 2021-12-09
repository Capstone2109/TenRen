import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileLineChart from "./UserProfileLineChart";
import CryptoTransaction from "./CryptoTransaction";
import PercentChangeIcon from "./PercentChangeIcon";
import {
  fetchSingleCryptosWorth,
  getCryptoWorth,
  savePastGame,
  updatePastCrypto,
  updatePastGameDay,
} from "../../app/tradegame";
import { dollarFormat } from "./UserProfileLineChart";
import axios from "axios";

const PastTrading = (props) => {
  const dispatch = useDispatch();
  //State for the Day

  //get game settings
  let game = useSelector((state) => state.currentGames.past);

  let day = useSelector((state) => state.currentGames.past.day);

  //get crypto worth from state
  let currentCrypto = useSelector((state) => state.cryptoWorth);

  //Get how much money we have left to spend from the state
  let dollarAvailable = useSelector(
    (state) => state.currentGames.past.dollarAvailable
  );

  //Get the list of all the crytos we own from the state
  let allOwnedCrypto = useSelector(
    (state) => state.currentGames.past.ownedCryptos
  );

  //Filter out the crypto for the one we are currently interacting with
  let ownedCrypto = allOwnedCrypto.filter(crypto => {
    if(crypto.name === currentCrypto.name) return true
    return false
  })[0] || {name: currentCrypto.name, amount: 0, dollarValue: 0, previousDollarValue: 0};

  //Get the userinfo for graph in state
  let gameHistory = useSelector((state) => state.currentGames.past.history);

  useEffect(() => {
    if (ownedCrypto) {
      saveDataToGraph();
    }
  }, [day]);

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

    dispatch(savePastGame(game));

  }

  //Handles action to perform when game is terminated
  function endGame() {

    dispatch(savePastGame({ ...game, completed: true }));
  }
  
  let percentChange = gameHistory.latestDailyPercentChange(ownedCrypto?.name);

  return (
    <div className="profile-trade addPadding">
      <div>
        <h1>Day: {day}</h1>
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
          <CryptoTransaction />
          <div className="transaction-section">
            {day < Number(game?.duration) ? (
              <button className="profile-button big" onClick={goToNextDay}>
                Next Day!
              </button>
            ) : ("")}
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
