import axios from "axios";
import { TOKEN } from "../app/auth";
import PortfolioHistory from "../components/utility/PortfolioHistory";
const SET_LIVE_GAME = 'SET_LIVE_GAME'
const SET_LIVE_DOLLAR = 'SET_LIVE_DOLLAR'
const SET_LIVE_CRYPTO = 'SET_LIVE_CRYPTO'

const SET_PAST_GAME = 'SET_PAST_GAME'
const SET_PAST_GAME_DAY = 'SET_PAST_GAME_DAY'
const SET_PAST_CRYPTO = 'SET_PAST_CRYPTO';
const SET_PAST_DOLLAR = 'SET_PAST_DOLLAR'
const SET_CRYPTO_WORTH = 'SET_CRYPTO_WORTH'

const setLiveGame = (game) => ({type: SET_LIVE_GAME, game})
const setLiveDollar = (dollar) => ({ type: SET_LIVE_DOLLAR, dollar})
const setLiveCrypto = (cryptoList) => ({ type: SET_LIVE_CRYPTO, cryptoList })

const setPastGame = (game) => ({type: SET_PAST_GAME, game})
const setPastGameDay = (day) => ({ type: SET_PAST_GAME_DAY, day})
const setPastCrypto = (cryptoList) => ({ type: SET_PAST_CRYPTO, cryptoList })
const setPastDollar = (dollar) => ({ type: SET_PAST_DOLLAR, dollar})
const setCryptoWorth = (crypto) => ({ type: SET_CRYPTO_WORTH, crypto})

export const loadLiveGame = () => async dispatch => {
    try {
        const token = window.localStorage.getItem(TOKEN)
        let {data: game}  = await axios.get(`api/users/liveGame`,{
            headers: {
              authorization: token,
            },
          })
          if(game){
            const gameStructure = {...game, history: new PortfolioHistory()}
            const portfolios = game.history.history.map( obj => obj.assetsList )
            
            portfolios.forEach( portfolio => gameStructure.history.addPortfolio(portfolio))
            
            dispatch(setLiveGame(gameStructure))
          }
    } catch (error) {
        console.error(error)
    }
}

export const loadPastGame = () => async dispatch => {
    try {
        const token = window.localStorage.getItem(TOKEN)
        let {data: game}  = await axios.get(`api/users/pastGame`,{
            headers: {
              authorization: token,
            },
          })
          if(game){
            const gameStructure = {...game, history: new PortfolioHistory()}
            const portfolios = game.history.history.map( obj => obj.assetsList )
            
            portfolios.forEach( portfolio => gameStructure.history.addPortfolio(portfolio))
            
            dispatch(setPastGame(gameStructure))
          }
    } catch (error) {
        console.error(error)
    }
}

export const saveLiveGame = (game) => async dispatch => {

    try {
        const token = window.localStorage.getItem(TOKEN)
        await axios.post(`/api/users/liveGame`, game ,{
            headers: {
              authorization: token,
            },
          })
        dispatch(setLiveGame(game))
    } catch (error) {
        console.error(error)
    }
}

export const savePastGame = (game) => async dispatch => {

    try {
        const token = window.localStorage.getItem(TOKEN)
        await axios.post(`/api/users/pastGame`, game ,{
            headers: {
              authorization: token,
            },
          })
        dispatch(setPastGame(game))
    } catch (error) {
        console.error(error)
    }
}

export const updateLiveCrypto = (cryptoList) => dispatch => {

    try {
        dispatch(setLiveCrypto(cryptoList))

    } catch (error) {
        console.error(error)
    }
}

export const updatePastCrypto = (cryptoList) => dispatch => {

    try {
        dispatch(setPastCrypto(cryptoList))

    } catch (error) {
        console.error(error)
    }
}

export const setLiveDollarAvailable = (dollar) => dispatch =>{

    try {
        dispatch(setLiveDollar(dollar))
    } catch (error) {
        console.error(error)
    }
}

export const setPastDollarAvailable = (dollar) => dispatch =>{

    try {
        dispatch(setPastDollar(dollar))
    } catch (error) {
        console.error(error)
    }
}

export const updatePastGameDay = (day) => dispatch =>{
    try {
        dispatch(setPastGameDay(day))
    } catch (error) {
        console.error(error)
    }
}

//This function does NOT set to store, simply returns the value
export const fetchSingleCryptosWorth = async (cryptoName,day) =>{

    try {
        let {data: cryptoPriceList} = await axios.get(`/api/cryptoHistory/${cryptoName}`)
        let crypto =  cryptoPriceList[day-1]
        return {...crypto, name: cryptoName}
    } catch (error) {
        console.error(error)
    }
    
}

export const fetchLiveSingleCryptosWorth = async (cryptoName)  =>{

    try {
        let {data: crypto} = await axios.get(`/api/cryptos/price/${cryptoName}`)
        return crypto
    } catch (error) {
        console.error(error)
    }
}

export const getLiveCryptoWorth = (cryptoName) => async dispatch =>{

    try {
        let {data: crypto} = await axios.get(`/api/cryptos/price/${cryptoName}`)
        dispatch(setCryptoWorth(crypto))
    } catch (error) {
        console.error(error)
    }
}

export const getCryptoWorth = (cryptoName,day) => async dispatch =>{

    try {
        let {data: cryptoPriceList} = await axios.get(`/api/cryptoHistory/${cryptoName}`)
        let crypto =  cryptoPriceList[day-1]
        dispatch(setCryptoWorth({...crypto, name: cryptoName}))
    } catch (error) {
        console.error(error)
    }
}

export function cryptoWorth(crypto={name:'',price:1}, action){

    switch(action.type){
        case SET_CRYPTO_WORTH:
            return action.crypto
        default:
            return crypto
    }
}

export default function currentGames(games={past:null,live:null}, action){

    switch(action.type){
        case SET_LIVE_GAME:
            return {...games, live: action.game}
        case SET_LIVE_DOLLAR:
            return {...games, live: {...games.live, dollarAvailable: action.dollar}}
        case SET_LIVE_CRYPTO:
            return {...games, live: {...games.live, ownedCryptos: action.cryptoList}}
        case SET_PAST_GAME:
            return {...games, past: action.game}
        case SET_PAST_GAME_DAY:
            return {...games, past: {...games.past, day: action.day}}
        case SET_PAST_DOLLAR:
            return {...games, past: {...games.past, dollarAvailable: action.dollar}}
        case SET_PAST_CRYPTO:
            return {...games, past: {...games.past, ownedCryptos: action.cryptoList}}
        default:
            return games;
    }
}