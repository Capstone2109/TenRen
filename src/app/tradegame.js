const SET_PAST_GAME = 'SET_PAST_GAME'

const _setPastGame = (game) => ({type: SET_PAST_GAME, game})


export const setPastGame = (game) => dispatch => {

    try {
        dispatch(_setPastGame(game))
    } catch (error) {
        console.log(error)
    }
}

export default function tradeGames(games={past:null,live:null}, action){

    switch(action.type){

        case SET_PAST_GAME:
            return {...games, past: action.game}
        default:
            return games;
    }
}