const SET_PAST_GAME = 'SET_PAST_GAME'
const SET_PAST_GAME_DAY = 'SET_PAST_GAME_DAY'
const SET_PAST_CRYPTO = 'SET_PAST_CRYPTO';
const SET_PAST_DOLLAR = 'SET_PAST_DOLLAR'

const setPastGame = (game) => ({type: SET_PAST_GAME, game})
const setPastGameDay = (day) => ({ type: SET_PAST_GAME_DAY, day})
const setPastCrypto = (crypto) => ({ type: SET_PAST_CRYPTO, crypto })
const setPastDollar = (dollar) => ({ type: SET_PAST_DOLLAR, dollar})

export const savePastGame = (game) => dispatch => {

    try {
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
            let allCrypto = [...games.past.ownedCryptos.filter(crypto => crypto.name !== action.crypto.name)];
            return {...games, past: {...games.past, ownedCryptos: [...allCrypto, action.crypto]}}
        default:
            return games;
    }
}