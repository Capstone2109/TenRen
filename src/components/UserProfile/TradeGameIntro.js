import React from "react"
import { useDispatch } from "react-redux"
import { purchaseCrypto, saveUserPastData, setDollarOwned } from "../../app/trade";
import { setPastGame } from "../../app/tradegame"; 

const TradeGameIntro = () => {
    const dispatch = useDispatch();

    function handleBegin(){
        let coin = document.getElementById("trading-crypto").value
        let mode = document.getElementById("trading-mode").value
        let duration = document.getElementById("trading-duration").value

        const newGame = {
            mode,
            duration,
            completed: false,
        }

        dispatch(purchaseCrypto({
            name: coin,
            amount: 0,
            dollarValue: 0,
            previousDollarValue: 0,
            mode
        }))

        //Save a new History To State for this coin
        dispatch(saveUserPastData({
            history: [
                 {
                    get timestamp() {
                        return this.portfolio[0].timestamp;
                      },
                      get asset() {
                        return this.portfolio.reduce((acc, curr) => {
                          return acc + curr.asset;
                        }, 0);
                      },
                     portfolio:[
                                {
                                    name: coin,
                                    asset: 0,
                                    percentChange: 1,
                                    timestamp: Date.now()
                                },
                                {
                                    name: "Cash",
                                    asset: 1000,
                                    percentChange: 1,
                                    timestamp: Date.now()
                                }
                            ]
                    }
                ]
        }))

        dispatch(setDollarOwned(1000))
        dispatch(setPastGame(newGame))
    }

    return (
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
                    <option value="PAST"> Past Time Simulation</option>
                    <option value="LIVE" disabled> Real Time Trading</option>
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
            <button className="profile-button" onClick={handleBegin}>Begin</button>
        </div>
    )
}


export default TradeGameIntro