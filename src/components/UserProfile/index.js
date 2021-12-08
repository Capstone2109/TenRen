import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PastTrading from "./PastTrading";
import TradeGameIntro from "./TradeGameIntro";

const UserProfile = () =>{

    const pastGame = useSelector(state => state.currentGames.past)
    //const liveGame = useSelector(state => state.currentGames.live)
    const [componentToShow,setComponentToShow] = useState(<TradeGameIntro />)

    
    useEffect(()=>{
        console.log("Past Game is",pastGame)
        if(pastGame?.completed === false){
            setComponentToShow(<PastTrading />)
        }else{
            setComponentToShow(<TradeGameIntro />)
        }

    },[pastGame])

    return(
        <div>
            {componentToShow}
        </div>
    )
}

export default UserProfile;