import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDummyCryptoWorth, purchaseCrypto, saveUserPastData, sellCrypto, setCryptoWorth, setDollarOwned, userInfo } from "../../app/trade";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import UserProfileLineChart from "./UserProfileLineChart";
import CryptoTransaction from "./CryptoTransaction";


export const dollarFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: 'USD'
})

const Trade = (props) => {

    const dispatch = useDispatch();
    //State for the Day
    const [day, setDay] = useState(1);

    const mode = "PAST";

    //DUMMY DATA, PRETEND WE HAVE SOME ALREADY AND WE HAVE 1000 DOLLARS
    useEffect(() => {
        dispatch(purchaseCrypto({
            name: "TestCoin",
            amount: 1,
            dollarValue: 60,
            previousDollarValue: 60,
            mode: 'PAST'
        }))
        dispatch(setDollarOwned(1000))
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
                                    name: "TestCoin",
                                    asset: 60,
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
    }, [])

    //get crypto worth from state
    let dummyCrypto = useSelector((state) => state.cryptoWorth)

    //Get how much money we have left to spend from the state
    let dollarAvailable = useSelector((state) => state.dollarOwned);

    //Get the list of all the crytos we own from the state
    let dummyAllOwnedCrypto = useSelector((state) => state.ownedCrypto)

    //Filter out the crypto for the one we are currently interacting with
    let dummyOwnedOfThisCrypto = dummyAllOwnedCrypto.filter(crypto => crypto.name = dummyCrypto.name)[0]
    
    //Get the userinfo for graph in state
    let dummyUserInfo = useSelector((state) => state.userInfo)
    useEffect(()=>{
        if(dummyOwnedOfThisCrypto)
            saveDataToGraph()
            
    },[day])

    //State of Crypto we are buying, or selling
    const [cryptoToBuy, setCryptoToBuy] = useState({ name: dummyCrypto.name, dollarValue: 0, mode })
    const [cryptoToSell, setCryptoToSell] = useState({ ...dummyOwnedOfThisCrypto, dollarValue: 0 })

    //Update State values of the crypto we are trying to buy
    function handleBuyValue(evt) {

        let amount = Number(evt.target.value);
        if (amount <= dollarAvailable) {

            setCryptoToBuy({
                ...cryptoToBuy,
                dollarValue: amount
            })
            evt.target.className = "green-border"
        } else {
            evt.target.className = "red-border"
        }
    }

    //Update State values of the crypto we are trying to sell
    function handleSellValue(evt) {
        let amount = Number(evt.target.value);

        if (amount <= dummyOwnedOfThisCrypto.dollarValue) {
            setCryptoToSell({
                ...cryptoToSell,
                dollarValue: amount,
            })
            evt.target.className = "green-border"
        } else {
            evt.target.className = "red-border"
        }
    }

    //Processes and sends the new amount of crypto we have now after purchasing
    function handleBuy() {
        let dollarLeft = dollarAvailable - cryptoToBuy.dollarValue
        dispatch(setDollarOwned(dollarLeft))


        let amount = dummyOwnedOfThisCrypto.amount + (cryptoToBuy.dollarValue / dummyCrypto.pricePer)
        let dollarValue = amount * dummyCrypto.pricePer
        let previousDollarValue = dummyOwnedOfThisCrypto.dollarValue


        dispatch(purchaseCrypto({ ...dummyOwnedOfThisCrypto, amount, dollarValue, previousDollarValue }))
        setCryptoToBuy({ ...cryptoToBuy, dollarValue: 0 })

    }

    //Processes and sends the new amount of crypto we have now after selling
    function handleSell() {
        let dollarLeft = dollarAvailable + cryptoToSell.dollarValue
        dispatch(setDollarOwned(dollarLeft))

        let amount = dummyOwnedOfThisCrypto.amount - (cryptoToSell.dollarValue / dummyCrypto.pricePer)
        let dollarValue = amount * dummyCrypto.pricePer
        let previousDollarValue = dummyOwnedOfThisCrypto.dollarValue
        //let newAmountOwned = dummyOwnedOfThisCrypto.dollarValue - cryptoToSell.dollarValue
        dispatch(sellCrypto({ ...dummyOwnedOfThisCrypto, amount, dollarValue, previousDollarValue }))
        setCryptoToSell({ ...cryptoToSell, dollarValue: 0 })
    }

    //Moves on to Next Day
    function goToNextDay() {

        let valueChange = ((Math.random() * 50) * (Math.random() < .5 ? 1 : -1))
        let pricePer = Math.max(1, 60 + valueChange).toFixed(2)
        dispatch(changeDummyCryptoWorth({ ...dummyCrypto, pricePer }))

        let dollarValue = dummyOwnedOfThisCrypto.amount * pricePer;
        let previousDollarValue = dummyOwnedOfThisCrypto.dollarValue
        dispatch(setCryptoWorth({ ...dummyOwnedOfThisCrypto, dollarValue, previousDollarValue }))
        setDay(day + 1)
    }

    //Save Data To Graph
    function saveDataToGraph(){
        let newUserInfo = JSON.parse(JSON.stringify(dummyUserInfo))

        let percentChange = dummyOwnedOfThisCrypto?.dollarValue / dummyOwnedOfThisCrypto?.previousDollarValue
        let info ={
            get timestamp() {
                return this.portfolio[0].timestamp;
            },
            get asset() {
                return this.portfolio.reduce((acc, curr) => {
                return acc + curr.asset;
                }, 0);
            },
            portfolio: [
                {
                    name:   dummyOwnedOfThisCrypto.name,
                    asset:  dummyOwnedOfThisCrypto.dollarValue,
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
        }
        newUserInfo.history.push(info)

        dispatch(saveUserPastData(newUserInfo))
    }

    //This value is in decimal form (<1 for loss, >1 for gain)
    let percentChange = dummyOwnedOfThisCrypto?.dollarValue / dummyOwnedOfThisCrypto?.previousDollarValue
    let percentChangeString = `${((Math.abs(percentChange - 1)) * 100).toFixed(2)} %`
    return (

        <div className="profile-trade">
            
            <div>
                <h1>Day: {day}</h1>
                <h3>Crypto: {dummyOwnedOfThisCrypto?.name}</h3>
                <h3>Invested: <span id="dollar-invested">{dollarFormat.format(dummyOwnedOfThisCrypto?.dollarValue)}</span>
                    (<span className={percentChange >= 1 ? "green-color" : "red-color"}>
                        {percentChange >= 1 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        {percentChangeString}
                    </span>) </h3>
                <h3>Price of Crypto: {dollarFormat.format(dummyCrypto.pricePer)}</h3>
                {/* <h3>Worth: {dummyOwnedOfThisCrypto?.amount}</h3> */}
            </div>
            <h3>Dollar Available: {dollarFormat.format(dollarAvailable)}</h3>
            <h2>Assest: {dollarFormat.format(dollarAvailable + dummyOwnedOfThisCrypto?.dollarValue)}</h2>
            <div className="trading-visuals">
                <div className="graph-section">
                    <UserProfileLineChart userProfileData={dummyUserInfo} />
                </div>
                <div className="tools">
                    <CryptoTransaction />
                    <div className="transaction-section">
                        <button className="profile-button big" onClick={goToNextDay}>Next Day!</button>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Trade;