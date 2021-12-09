import { getCryptoWorth } from "../../app/tradegame"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

const CryptoSelect = () =>{

    const dispatch = useDispatch()
    let day = useSelector((state) => state.currentGames.past.day);

    useEffect(()=>{
        dispatch(getCryptoWorth("Binance Coin",day))
    },[])

    const handleChange = (evt) => {
        let cryptoName = evt.target.value
        dispatch(getCryptoWorth(cryptoName,day))
    }
    return (
        <div className="crypto-select">
            <select onChange={handleChange}>
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