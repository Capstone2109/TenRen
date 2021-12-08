import React from "react";
import { useDispatch } from "react-redux";
import { savePastGame } from "../../app/tradegame";
import PortfolioHistory from "../utility/PortfolioHistory";

const TradeGameIntro = ({handleMode}) => {
  const dispatch = useDispatch();

  function handleBegin() {
    let coin = document.getElementById("trading-crypto").value;
    let mode = document.getElementById("trading-mode").value;
    let duration = document.getElementById("trading-duration").value;

    const defaultStartingPortfolio = [
      {
        name: coin,
        asset: 0,
        percentChange: 1,
        timestamp: Date.now(),
      },
      {
        name: "Cash",
        asset: 1000,
        percentChange: 1,
        timestamp: Date.now(),
      },
    ];

    const defaultStartingCrypto = {
      name: coin,
      amount: 0,
      dollarValue: 0,
      previousDollarValue: 0,
      mode,
    };

    const newGame = {
      mode,
      day: 1,
      duration,
      completed: false,
      dollarAvailable: 1000,
      ownedCryptos: [defaultStartingCrypto],
      history: new PortfolioHistory(),
    };
    newGame.history.addPortfolio(defaultStartingPortfolio);

    //Save a new History To State for this coin

    //console.log("New Game History",newGame.history)

    // dispatch(saveUserPastData({
    //     history: [
    //          {
    //             get timestamp() {
    //                 return this.portfolio[0].timestamp;
    //               },
    //               get asset() {
    //                 return this.portfolio.reduce((acc, curr) => {
    //                   return acc + curr.asset;
    //                 }, 0);
    //               },
    //              portfolio:[
    //                         {
    //                             name: coin,
    //                             asset: 0,
    //                             percentChange: 1,
    //                             timestamp: Date.now()
    //                         },
    //                         {
    //                             name: "Cash",
    //                             asset: 1000,
    //                             percentChange: 1,
    //                             timestamp: Date.now()
    //                         }
    //                     ]
    //             }
    //         ]
    // }))

    handleMode(mode);
    dispatch(savePastGame(newGame));
  }

  return (
    <div className="game-intro-container">
      <div className="game-intro">
        <div className="option-screen">
          <h2>Select Trading Mode</h2>

          <div className="option-div">
            <h2>Crypto:</h2>
            <select id="trading-crypto">
              <option value="Test Coin">Test Coin</option>
            </select>
          </div>

          <div className="option-div">
            <h2>Mode:</h2>
            <select id="trading-mode">
              <option value=""> Select Option...</option>
              <option value={true}> Past Time Simulation</option>
              <option value={false}>
                Real Time Trading
              </option>
            </select>
          </div>

          <div className="option-div">
            <h2>Duration:</h2>
            <select id="trading-duration">
              <option value={7}>1 Week</option>
              <option value={14}>2 Week</option>
              <option value={21}>3 Week</option>
              <option value={30}>1 Month</option>
            </select>
          </div>
          <button className="profile-button" onClick={handleBegin}>
            Begin
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeGameIntro;
