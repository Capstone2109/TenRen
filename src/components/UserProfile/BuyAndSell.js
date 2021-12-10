import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircleFilled } from "@ant-design/icons";
import { dollarFormat } from "./UserProfileLineChart";
import { addNewTransaction } from "../../app/transactions";
import { fetchLiveSingleCryptosWorth, fetchSingleCryptosWorth, setLiveDollarAvailable, setPastDollarAvailable, updateLiveCrypto, updatePastCrypto } from "../../app/tradegame";
import CryptoSelect from "./CryptoSelect";

/**TODO: When you go to next day, update all your coins. not just the one selected */
const BuyAndSell = ({liveMode}) => {

    const dispatch = useDispatch();

     //get game settings
    let game = useSelector((state) => liveMode ? state.currentGames.live : state.currentGames.past)

    //get crypto worth from state
    let currentCrypto = useSelector((state) => state.cryptoWorth)

    //Get how much money we have left to spend from the state
    let dollarAvailable = game.dollarAvailable//useSelector((state) => state.currentGames.past.dollarAvailable);

    //Get the list of all the crytos we own from the state
    let allOwnedCrypto = game.ownedCryptos//useSelector((state) => state.currentGames.past.ownedCryptos)

    //Filter out the crypto for the one we are currently interacting with
    let ownedCrypto = allOwnedCrypto.filter(crypto => (crypto.name === currentCrypto.name))[0] || {name: currentCrypto.name, amount: 0, dollarValue: 0, previousDollarValue: 0}

    const [cryptoToTrade, setCryptoToTrade] = useState({ name: currentCrypto.name, dollarValue: 0 })
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
        liveMode ? dispatch(setLiveDollarAvailable(dollarLeft)) :dispatch(setPastDollarAvailable(dollarLeft))

        let allOtherCryptos = allOwnedCrypto.filter(crypto => crypto.name !== ownedCrypto.name)

        let amount = ownedCrypto.amount + (cryptoToTrade.dollarValue / currentCrypto.price)
        let dollarValue = amount * currentCrypto.price
        let previousDollarValue = ownedCrypto.dollarValue
        // dispatch(updateLiveCrypto([...allOtherCryptos, { ...ownedCrypto, amount, dollarValue, previousDollarValue }]))

        liveMode ? updateCryptoValues([...allOtherCryptos, { ...ownedCrypto, amount, dollarValue, previousDollarValue }])
        :dispatch(updatePastCrypto([...allOtherCryptos, { ...ownedCrypto, amount, dollarValue, previousDollarValue }]))
        setCryptoToTrade({ ...cryptoToTrade, dollarValue: 0 })
        

    }

    //Processes and sends the new amount of crypto we have now after selling
    function handleSell() {
        if(cryptoToTrade.dollarValue===0)return
        if (cryptoToTrade.dollarValue > ownedCrypto.dollarValue) {
            setErrorMessage("Not Enough Money In This Stock!")
            return
        }
        dispatch(addNewTransaction({type:"Sold", crypto: cryptoToTrade.name, amount: cryptoToTrade.dollarValue, date: Date.now() }))
        let dollarLeft = dollarAvailable + cryptoToTrade.dollarValue
        liveMode ? dispatch(setLiveDollarAvailable(dollarLeft)) :dispatch(setPastDollarAvailable(dollarLeft))

        let allOtherCryptos = allOwnedCrypto.filter(crypto => crypto.name !== ownedCrypto.name)
        let amount = ownedCrypto.amount - (cryptoToTrade.dollarValue / currentCrypto.price)
        let dollarValue = amount * currentCrypto.price
        let previousDollarValue = ownedCrypto.dollarValue
        //dispatch(updateLiveCrypto([...allOtherCryptos,{ ...ownedCrypto, amount, dollarValue, previousDollarValue }]))

        liveMode? updateCryptoValues([...allOtherCryptos,{ ...ownedCrypto, amount, dollarValue, previousDollarValue }])
        :dispatch(updatePastCrypto([...allOtherCryptos,{ ...ownedCrypto, amount, dollarValue, previousDollarValue }]))
        
        setCryptoToTrade({ ...cryptoToTrade, dollarValue: 0 })
       
    }

    async function updateCryptoValues(adjustedCryptos){

        let currentlyOwnedCryptos = await Promise.all(adjustedCryptos.map(async (crypto) => {
          
          const newCryptoPrice = await fetchLiveSingleCryptosWorth(crypto.name)
          const newCryptoValue = {...crypto, dollarValue: crypto.amount * newCryptoPrice.price, previousDollarValue: crypto.dollarValue}
          return newCryptoValue
         }))
    
       dispatch(updateLiveCrypto(currentlyOwnedCryptos))
    
      }

    return (
        <>
            <div className="profile-trade-buttons">
                <CryptoSelect liveMode={liveMode}/>
                {errorMessage ? <CloseCircleFilled style={{ fontSize: '200%' }} /> : ''} <h2>{errorMessage}</h2>
                
                <h3>{`${currentCrypto.name}'s Price: ${dollarFormat.format(currentCrypto.price)}`}</h3>
                
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