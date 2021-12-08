import React from "react";
import { useSelector } from "react-redux";
import { dollarFormat } from "./UserProfileLineChart";

const Transactions = () =>{

    const transactionList = useSelector((state)=> state.recentTransactions)

    return(
        <div className="transaction-list">
            {transactionList.map( (transaction,index) => (
               
                <div key={index}> 
                    <div className="timestamp">{new Date(transaction.date).toLocaleString()}</div>
                    {`${transaction.type} ${dollarFormat.format( transaction.amount )} in ${transaction.crypto}`}
                </div>
            ))}

            {!transactionList.length?<div>
                No Transaction History
            </div>:''}
        </div>
    )
}

export default Transactions