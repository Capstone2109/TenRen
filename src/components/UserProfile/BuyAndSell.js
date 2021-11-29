import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDummyCryptoWorth, purchaseCrypto, saveUserPastData, sellCrypto, setCryptoWorth, setDollarOwned, userInfo } from "../../app/trade";
import { CloseCircleFilled } from "@ant-design/icons";
import { dollarFormat } from "./Trade";
import { addNewTransaction } from "../../app/transactions";

const BuyAndSell = (props) => {

    const dispatch = useDispatch();



    //get crypto worth from state
    let dummyCrypto = useSelector((state) => state.cryptoWorth)

    //Get how much money we have left to spend from the state
    let dollarAvailable = useSelector((state) => state.dollarOwned);

    //Get the list of all the crytos we own from the state
    let dummyAllOwnedCrypto = useSelector((state) => state.ownedCrypto)

    //Filter out the crypto for the one we are currently interacting with
    let dummyOwnedOfThisCrypto = dummyAllOwnedCrypto.filter(crypto => crypto.name = dummyCrypto.name)[0]

    const [cryptoToTrade, setCryptoToTrade] = useState({ name: dummyCrypto.name, dollarValue: 0 })
    const [errorMessage, setErrorMessage] = useState("")

    function handleCryptoValue(evt) {

        let amount = Number(evt.target.value);
        amount = isNaN(amount) ? 0 : amount;

        setCryptoToTrade({
            ...cryptoToTrade,
            dollarValue: amount
        })
        setErrorMessage("")
    }

    //Processes and sends the new amount of crypto we have now after purchasing
    function handleBuy() {
        if(cryptoToTrade.dollarValue===0)return
        if (dollarAvailable < cryptoToTrade.dollarValue) {
            setErrorMessage("Not Enough Money!")
            return
        }
        
        dispatch(addNewTransaction({type:"Purchased", crypto: cryptoToTrade.name, amount: cryptoToTrade.dollarValue, date: Date.now() }))
        let dollarLeft = dollarAvailable - cryptoToTrade.dollarValue
        dispatch(setDollarOwned(dollarLeft))

        let amount = dummyOwnedOfThisCrypto.amount + (cryptoToTrade.dollarValue / dummyCrypto.pricePer)
        let dollarValue = amount * dummyCrypto.pricePer
        let previousDollarValue = dummyOwnedOfThisCrypto.dollarValue


        dispatch(purchaseCrypto({ ...dummyOwnedOfThisCrypto, amount, dollarValue, previousDollarValue }))
        setCryptoToTrade({ ...cryptoToTrade, dollarValue: 0 })

        document.getElementById("dollar-invested").classList.add("dollar-increase")
        setTimeout(() => {
            document.getElementById("dollar-invested").classList.remove("dollar-increase")
        }, 3000);

        
    }

    //Processes and sends the new amount of crypto we have now after selling
    function handleSell() {
        if(cryptoToTrade.dollarValue===0)return
        if (cryptoToTrade.dollarValue > dummyOwnedOfThisCrypto.dollarValue) {
            setErrorMessage("Not Enough Money In This Stock!")
            return
        }
        let dollarLeft = dollarAvailable + cryptoToTrade.dollarValue
        dispatch(setDollarOwned(dollarLeft))

        let amount = dummyOwnedOfThisCrypto.amount - (cryptoToTrade.dollarValue / dummyCrypto.pricePer)
        let dollarValue = amount * dummyCrypto.pricePer
        let previousDollarValue = dummyOwnedOfThisCrypto.dollarValue

        dispatch(sellCrypto({ ...dummyOwnedOfThisCrypto, amount, dollarValue, previousDollarValue }))
        setCryptoToTrade({ ...cryptoToTrade, dollarValue: 0 })
    }

    return (
        <>
            <div className="profile-trade-buttons">
                {errorMessage ? <CloseCircleFilled style={{ fontSize: '200%' }} /> : ''} <h2>{errorMessage}</h2>
                
                <h3>{`${dummyCrypto.name}'s Price: ${dollarFormat.format(dummyCrypto.pricePer)}`}</h3>
                
                <input className="profile-input" type="text" name="buyAmount" value={cryptoToTrade?.dollarValue} onChange={handleCryptoValue} />
                <button className="profile-button" onClick={handleBuy}>Buy</button>
                <button className="profile-button" onClick={handleSell}>Sell</button>
                
            </div>
                <hr/>
                <p id="available-cash-small">{dollarFormat.format(dollarAvailable)+ ' available!'}</p>
            </>
    )
}

export default BuyAndSell