import { getCryptoWorth, getLiveCryptoWorth } from "../../app/tradegame"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

const CryptoSelect = ({liveMode}) =>{

    const dispatch = useDispatch()
    let day = useSelector((state) => !liveMode ? state.currentGames.past.day:undefined);

    useEffect(()=>{
        liveMode ? dispatch(getLiveCryptoWorth("Binance Coin")) : dispatch(getCryptoWorth("Binance Coin",day))
    },[])

    const updateCryptoValue = (evt) => {
        let cryptoName = evt.target.value

        liveMode ? dispatch(getLiveCryptoWorth(cryptoName)):
        dispatch(getCryptoWorth(cryptoName,day))
    }
    return (
        <div className="crypto-select">
            <select id="crypto-select-option" onChange={updateCryptoValue}>
                <option value="Binance Coin">Binance Coin</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Cardano">Cardano</option>
                <option value="Dogecoin">Dogecoin</option>
                <option value="Ethereum">Ethereum</option>
                <option value="HEX">HEX</option>
                <option value="Polkadot">Polkadot</option>
                <option value="Solana">Solana</option>
                <option value="Terra">Terra</option>
                <option value="Thether USD">Thether USD</option>
                <option value="USDC">USDC</option>
                <option value="XRP">XRP</option>
            </select>
        </div>
    )
}

export default CryptoSelect