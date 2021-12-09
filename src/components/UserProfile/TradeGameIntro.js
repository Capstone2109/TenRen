import React from "react";
import { useDispatch } from "react-redux";
import { savePastGame} from "../../app/tradegame";
import PortfolioHistory from "../utility/PortfolioHistory";

const TradeGameIntro = () => {
  const dispatch = useDispatch();

  function handleBegin() {
    //let coin = document.getElementById("trading-crypto").value;
    let mode = document.getElementById("trading-mode").value;
    let duration = document.getElementById("trading-duration").value;

    const defaultStartingPortfolio = [
      // {
      //   name: 'Binance Coin',
      //   asset: 0,
      //   percentChange: 1,
      //   timestamp: Date.now(),
      // },
      {
        name: "Cash",
        asset: 1000,
        percentChange: 1,
        timestamp: Date.now(),
      },
    ];

    // const defaultStartingCrypto = {
    //     name: 'Binance Coin',
    //     amount: 0,
    //     dollarValue: 0,
    //     previousDollarValue: 0,
    //     mode,
    //   }

    const newGame = {
      mode,
      day: 1,
      duration,
      completed: false,
      dollarAvailable: 1000,
      ownedCryptos: [],//[defaultStartingCrypto],
      history: new PortfolioHistory(),
    };
    newGame.history.addPortfolio(defaultStartingPortfolio)

    dispatch(savePastGame(newGame));
  }

  return (
    <div className='game-intro-container'>
    <div className='game-intro'>
    <div className="option-screen">
      <h2>Select Trading Mode</h2>

      {/* <div className="option-div">
        <h2>Crypto:</h2>
        <select id="trading-crypto">
          <option value="Test Coin">Test Coin</option>
          <option value="Test Coin">Test Coin</option>
        </select>
      </div> */}

      <div className="option-div">
        <h2>Mode:</h2>
        <select id="trading-mode">
          <option value="PAST"> Past Time Simulation</option>
          <option value="LIVE" disabled>
            {" "}
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
