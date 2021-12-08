// export const sellPastCrypto = (crypto) => dispatch => {

//     try {

//         //Make Axios calls to DB to save info here
//         dispatch(setPastCrypto(crypto))

//     } catch (error) {
//         console.error(error)
//     }
// }

//DUMMY CRYPTO VALUE CHANGES
// export const updatePastCrypto = (crypto) => dispatch =>{
//     try {
//         dispatch(setPastCrypto(crypto))
//     } catch (error) {
//         console.log(error)
//     }
// }

// //TEST FUNCTION SETTING DOLLAR
// const SET_DOLLAR = 'SET_DOLLAR'
// const setDollar = (dollar) => ({ type: SET_DOLLAR, dollar})

// export const setDollarOwned = (dollar) => dispatch =>{

//     try {
//         dispatch(setDollar(dollar))
//     } catch (error) {
//         console.error(error)
//     }
// }
// export function dollarOwned(dollar=0,action){
//     switch(action.type){
//         case SET_DOLLAR:
//             return action.dollar
//         default:
//             return dollar
//     }
// }
//TEST FUNCTION SETTING CRYPTO WORTH
const SET_DUMMY_CRYPTO_WORTH = 'SET_CRYPTO_WORTH'
const setDummyCryptoWorth = (crypto) => ({ type: SET_DUMMY_CRYPTO_WORTH, crypto})

export const changeDummyCryptoWorth = (crypto) => dispatch =>{

    try {
        dispatch(setDummyCryptoWorth(crypto))
    } catch (error) {
        console.error(error)
    }
}

export default function dummyCryptoWorth(crypto={name:'Test Coin',pricePer:60}, action){
    switch(action.type){
        case SET_DUMMY_CRYPTO_WORTH:
            return action.crypto
        default:
            return crypto
    }
}