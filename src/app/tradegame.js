import axios from "axios";
import { TOKEN } from "../app/auth";
import PortfolioHistory from "../components/utility/PortfolioHistory";

const SET_PAST_GAME = 'SET_PAST_GAME'
const SET_PAST_GAME_DAY = 'SET_PAST_GAME_DAY'
const SET_PAST_CRYPTO = 'SET_PAST_CRYPTO';
const SET_PAST_DOLLAR = 'SET_PAST_DOLLAR'
const SET_CRYPTO_WORTH = 'SET_CRYPTO_WORTH'


const setPastGame = (game) => ({type: SET_PAST_GAME, game})
const setPastGameDay = (day) => ({ type: SET_PAST_GAME_DAY, day})
const setPastCrypto = (crypto) => ({ type: SET_PAST_CRYPTO, crypto })
const setPastDollar = (dollar) => ({ type: SET_PAST_DOLLAR, dollar})
const setCryptoWorth = (crypto) => ({ type: SET_CRYPTO_WORTH, crypto})


export const loadPastGame = () => async dispatch => {
    try {
        console.log("Loading past game...")
        const token = window.localStorage.getItem(TOKEN)
        let {data: game}  = await axios.get(`api/users/pastGame`,{
            headers: {
              authorization: token,
            },
          })
          
          const gameStructure = {...game, history: new PortfolioHistory()}
          const portfolios = game.history.history.map( obj => obj.assetsList )
          
          portfolios.forEach( portfolio => gameStructure.history.addPortfolio(portfolio))
          
          //gameStructure.history.addPortfolio()
          //console.log("past game is", game)
          //console.log("game structure is",gameStructure)
        dispatch(setPastGame(gameStructure))
    } catch (error) {
        console.log(error)
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
        console.log(error)
    }
}

export const updatePastCrypto = (crypto) => dispatch => {

    try {
        //Make Axios calls to DB to save info here
        dispatch(setPastCrypto(crypto))

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

export const getCryptoWorth = (cryptoName,day) => async dispatch =>{

    try {
        let {data: cryptoPriceList} = await axios.get(`/api/cryptoHistory/${cryptoName}`)
        //console.log("Crypto from server", cryptoPriceList)
        //let parsedCrypto = JSON.parse(crypto)
        // //cryptoPriceList = JSON.parse(cryptoPriceList)
        // console.log("Type of cryptoPriceList is", typeof cryptoPriceList)
        // console.log("CryptoPriceList is", cryptoPriceList)
        // console.log("Day is", day)
        let crypto =  cryptoPriceList[day-1]
        //console.log("Crypto is", crypto)
        

        //console.log("Setting crypto as",{...crypto, name: cryptoName})

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

        case SET_PAST_GAME:
            return {...games, past: action.game}
        case SET_PAST_GAME_DAY:
            console.log("Day is being updated to", action.day)
            return {...games, past: {...games.past, day: action.day}}
        case SET_PAST_DOLLAR:
            return {...games, past: {...games.past, dollarAvailable: action.dollar}}
        case SET_PAST_CRYPTO:
            console.log("setting crypto", action.crypto)
            let allCrypto = [...games.past.ownedCryptos.filter(crypto => crypto.name !== action.crypto.name)];
            console.log("allCrypto filtered is", allCrypto)
            console.log("new crypto list is",[...allCrypto, action.crypto])
            return {...games, past: {...games.past, ownedCryptos: [...allCrypto, action.crypto]}}
        default:
            return games;
    }
}