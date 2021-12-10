import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PastTrading from "./PastTrading";
import TradeGameIntro from "./TradeGameIntro";

const UserProfile = ({handleMode}) => {

  const [liveMode, setLiveMode] = useState(false)
  
  const pastGame = useSelector((state) => state.currentGames.past);
  const liveGame = useSelector(state => state.currentGames.live)
  const [componentToShow, setComponentToShow] = useState(<TradeGameIntro />);

  useEffect(() => {
    if (liveGame?.completed === false && liveMode) {
      setComponentToShow(<PastTrading liveMode={true}/>);
    }else if(pastGame?.completed === false && !liveMode){
      setComponentToShow(<PastTrading liveMode={false}/>);
    } else {
      setComponentToShow(<TradeGameIntro handleMode={handleMode} />);
    }
  }, [pastGame, liveGame, liveMode]);

    const handleModeSwitch =(evt) =>{
      setLiveMode(evt.target.checked)
    }

  return <div>
    <label className="mode-switch">

      
      <input type="checkbox" onChange={handleModeSwitch}/>
      <span class="slider round"></span>
      <h2>Live Mode</h2>
    </label>
    {componentToShow}
    </div>;
};

export default UserProfile;
