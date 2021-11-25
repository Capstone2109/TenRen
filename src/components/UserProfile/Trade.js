import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDummyCryptoWorth, purchaseCrypto, sellCrypto, setCryptoWorth, setDollarOwned } from "../../app/trade";


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
    }, [])

    //get crypto worth from set
    let dummyCrypto = useSelector((state) => state.cryptoWorth)

    //Get how much money we have left to spend from the state
    let dollarAvailable = useSelector((state) => state.dollarOwned);

    //Get the list of all the crytos we own from the state
    let dummyAllOwnedCrypto = useSelector((state) => state.ownedCrypto)

    //Filter out the crypto for the one we are currently interacting with
    let dummyOwnedOfThisCrypto = dummyAllOwnedCrypto.filter(crypto => crypto.name = dummyCrypto.name)[0]

    

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
        let previousDollarWorth = dummyOwnedOfThisCrypto.dollarValue

        dispatch(purchaseCrypto({ ...dummyOwnedOfThisCrypto, amount, dollarValue, previousDollarWorth}))
        setCryptoToBuy({ ...cryptoToBuy, dollarValue: 0 })

    }

    //Processes and sends the new amount of crypto we have now after selling
    function handleSell() {
        let dollarLeft = dollarAvailable + cryptoToSell.dollarValue
        dispatch(setDollarOwned(dollarLeft))

        let newAmountOwned = dummyOwnedOfThisCrypto.dollarValue - cryptoToSell.dollarValue
        dispatch(sellCrypto({ ...dummyOwnedOfThisCrypto, dollarValue: newAmountOwned }))
        setCryptoToSell({ ...cryptoToSell, dollarValue: 0 })
    }

    //Moves on to Next Day
    function goToNextDay(){

        let valueChange = ( (Math.random()*50) * (Math.random() <.5?1:-1))
        console.log("Change",valueChange)
        let pricePer = Math.max(1, 60 + valueChange).toFixed(2)
        dispatch(changeDummyCryptoWorth({...dummyCrypto, pricePer}))

        let dollarValue = dummyOwnedOfThisCrypto.amount * pricePer;
        let previousDollarWorth = dummyOwnedOfThisCrypto.dollarValue
        dispatch(setCryptoWorth({...dummyOwnedOfThisCrypto, dollarValue, previousDollarWorth}))
        setDay(day+1)
    }
    return (
        <div>
            <div>
                <h1>Day: {day}</h1>
                <h3>Crypto: {dummyOwnedOfThisCrypto?.name}</h3>
                <h3>Owned: {`$${dummyOwnedOfThisCrypto?.dollarValue.toFixed(2)} (${(( (dummyOwnedOfThisCrypto?.dollarValue / dummyOwnedOfThisCrypto?.previousDollarValue)-1)*100).toFixed(2)} %)`}</h3>
                <h3>Price of Crypto: {`$${dummyCrypto.pricePer}`}</h3>
                {/* <h3>Worth: {dummyOwnedOfThisCrypto?.amount}</h3> */}
            </div>
            <h2>Dollar Available: {dollarAvailable}</h2>
            $<input type="text" name="buyAmount" value={cryptoToBuy?.dollarValue} onChange={handleBuyValue} />
            <button onClick={handleBuy}>Buy</button>
            <hr />
            $<input type="text" name="sellAmount" value={cryptoToSell?.dollarValue} onChange={handleSellValue} />
            <button onClick={handleSell}>Sell</button>
            <button onClick={goToNextDay}>Next Day!</button>
        </div>
    )
}

export default Trade;