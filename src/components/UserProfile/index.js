import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PastTrading from "./PastTrading";
import TradeGameIntro from "./TradeGameIntro";

const UserProfile = () =>{

    const games = useSelector(state => state.tradeGames)
    const [componentToShow,setComponentToShow] = useState(<TradeGameIntro />)

    useEffect(()=>{

        if(games?.past){
            setComponentToShow(<PastTrading />)
        }else{
            setComponentToShow(<TradeGameIntro />)
        }

    },[games])

    return(
        <div>
            {componentToShow}
        </div>
    )
}

export default UserProfile;