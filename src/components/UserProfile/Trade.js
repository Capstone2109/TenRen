import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDummyCryptoWorth, purchaseCrypto, saveUserPastData, sellCrypto, setCryptoWorth, setDollarOwned, userInfo } from "../../app/trade";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import UserProfileLineChart from "./UserProfileLineChart";

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

    //get crypto worth from set
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
            
    },[dummyOwnedOfThisCrypto])

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
        console.log("Reg Info",dummyUserInfo)
        let newUserInfo = JSON.parse(JSON.stringify(dummyUserInfo))
        console.log("Copied Info", newUserInfo)
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
        console.log("Info",newUserInfo)
        newUserInfo.history.push(info)

        dispatch(saveUserPastData(newUserInfo))
    }

    //This value is in decimal form (<1 for loss, >1 for gain)
    let percentChange = dummyOwnedOfThisCrypto?.dollarValue / dummyOwnedOfThisCrypto?.previousDollarValue
    let percentChangeString = `${((Math.abs(percentChange - 1)) * 100).toFixed(2)} %`
    let dollarFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: 'USD'
    })
    return (

        <div className="profile-trade">
            
            <div>
                <h1>Day: {day}</h1>
                <h3>Crypto: {dummyOwnedOfThisCrypto?.name}</h3>
                <h3>Owned: {dollarFormat.format(dummyOwnedOfThisCrypto?.dollarValue)}
                    (<span className={percentChange >= 1 ? "green-color" : "red-color"}>
                        {percentChange >= 1 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        {percentChangeString}
                    </span>) </h3>
                <h3>Price of Crypto: {dollarFormat.format(dummyCrypto.pricePer)}</h3>
                {/* <h3>Worth: {dummyOwnedOfThisCrypto?.amount}</h3> */}
            </div>
            <h2>Dollar Available: {dollarFormat.format(dollarAvailable)}</h2>
            <UserProfileLineChart userProfileData={dummyUserInfo} />
            <div className="profile-trade-buttons">
                $<input className="profile-input" type="text" name="buyAmount" value={cryptoToBuy?.dollarValue} onChange={handleBuyValue} />
                <button className="profile-button" onClick={handleBuy}>Buy</button>
                <hr />
                $<input className="profile-input" type="text" name="sellAmount" value={cryptoToSell?.dollarValue} onChange={handleSellValue} />
                <button className="profile-button" onClick={handleSell}>Sell</button>
                <button className="profile-button" onClick={goToNextDay}>Next Day!</button>
            </div>
        </div>
    )
}

export default Trade;