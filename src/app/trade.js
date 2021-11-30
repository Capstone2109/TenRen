const SET_CRYPTO = 'SET_CRYPTO';


const setCrypto = (crypto) => ({ type: SET_CRYPTO, crypto })

export const purchaseCrypto = (crypto) => dispatch => {

    try {
            console.log("Buying",crypto)
        //Make Axios calls to DB to save info here
        dispatch(setCrypto(crypto))

    } catch (error) {
        console.error(error)
    }
}

export const sellCrypto = (crypto) => dispatch => {

    try {

        //console.log("se")
        //Make Axios calls to DB to save info here
        dispatch(setCrypto(crypto))

    } catch (error) {
        console.error(error)
    }
}

//DUMMY CRYPTO VALUE CHANGES
export const setCryptoWorth = (crypto) => dispatch =>{
    try {
        dispatch(setCrypto(crypto))
    } catch (error) {
        console.log(error)
    }
}

//TEST FUNCTION SETTING DOLLAR
const SET_DOLLAR = 'SET_DOLLAR'
const setDollar = (dollar) => ({ type: SET_DOLLAR, dollar})

export const setDollarOwned = (dollar) => dispatch =>{

    try {
        dispatch(setDollar(dollar))
    } catch (error) {
        console.error(error)
    }
}
export function dollarOwned(dollar=0,action){
    switch(action.type){
        case SET_DOLLAR:
            return action.dollar
        default:
            return dollar
    }
}
//TEST FUNCTION SETTING CRYPTO WORTH
const SET_DUMMY_CRYPTO_WORTH = 'SET_CRYPTO_WORTH'
const setDummyCryptoWorth = (crypto) => ({ type: SET_DUMMY_CRYPTO_WORTH, crypto})

export const changeDummyCryptoWorth= (crypto) => dispatch =>{

    try {
        dispatch(setDummyCryptoWorth(crypto))
    } catch (error) {
        console.error(error)
    }
}

export function dummyCryptoWorth(crypto={name:'TestCoin',pricePer:60},action){
    switch(action.type){
        case SET_DUMMY_CRYPTO_WORTH:
            return action.crypto
        default:
            return crypto
    }
}

//TEST FUNCTION SAVE PAST CRYPTO GAINS/LOSS TO STATE
const SAVE_PAST_INFO = 'SAVE_PAST_INFO';
const setUserPastInfo = (info) => ({type: SAVE_PAST_INFO, info})

export const saveUserPastData = (info) => dispatch => {

    try {
        dispatch(setUserPastInfo(info))
    } catch (error) {
        console.log(error)
    }
}

export function userInfo(defaultInfo={ history:[]},action){
    switch(action.type){
        case SAVE_PAST_INFO:
            return action.info
        default:
            return defaultInfo
    }
}
//ACTUAL REDUCER FOR CCRYPTO OWN (THIS IS NOT DUMMY DATA)
export default function tradeReducer(ownedCryptos=[], action){

    switch (action.type) {
        case SET_CRYPTO:
            let allCrypto = [...ownedCryptos.filter(crypto => crypto.name !== action.crypto.name)];
            return [...allCrypto, action.crypto]
        default:
            return ownedCryptos
    }
}