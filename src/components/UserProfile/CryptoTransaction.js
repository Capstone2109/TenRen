import React, { useEffect, useState } from "react";
import BuyAndSell from "./BuyAndSell";
import Transactions from "./Transactions";

const SHOW_BUY_SELL = 'SHOW_BUY_SELL';
const SHOW_TRANSACTIONS = 'SHOW_TRANSACTIONS'

const CryptoTransaction = ({liveMode}) => {

    const [componentToShow, setComponentToShow] = useState();

    useEffect(() => {
        setComponentToShow(<BuyAndSell liveMode={liveMode} />)
    }, [])

    const handleTabSelect = (evt) => {
        document.querySelectorAll('.transaction-types > button').forEach(e => e.classList.remove("selected"))
        evt.target.classList.add("selected");
        switch (evt.target.name) {
            case SHOW_BUY_SELL:
                setComponentToShow(<BuyAndSell liveMode={liveMode} />)
                break;
            case SHOW_TRANSACTIONS:
                setComponentToShow(<Transactions />)
                break;
            default:
                setComponentToShow(<BuyAndSell liveMode={liveMode}/>)
        }
    }
    return (
            <div className="transaction-section">
                <div className="transaction-types">
                    <button className="selected" onClick={handleTabSelect} name={SHOW_BUY_SELL}>Trade</button>
                    <button onClick={handleTabSelect} name={SHOW_TRANSACTIONS}>Transactions</button>
                </div>

                {componentToShow}

            </div>
            
    )
}

export default CryptoTransaction;