const ADD_TRANSACTION = 'ADD_TRANSACTION';

const addTransaction = (transaction) => ({type: ADD_TRANSACTION, transaction})


export const addNewTransaction = (transaction) => dispatch =>{

    try {
        dispatch(addTransaction(transaction))
    } catch (error) {
        console.error(error)
    }
}

export default function recentTransactions(transactions=[],action){

    switch(action.type){
        case ADD_TRANSACTION:
            return [action.transaction, ...transactions]
        default:
            return transactions;
    }
}