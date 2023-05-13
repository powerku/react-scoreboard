import Layout from "./layout/Layout";
import Top from "./layout/Top";
import Bottom from "./layout/Bottom";
import classes from "./App.css";
import SoundButton from "./layout/SoundButton";
import Tooltip from "./layout/Tooltip";
import KakaoAdfit from "./components/KakaoAdfit";
import React, { useState } from "react";
import { MuteContext } from "./store/Context";
import { TimeContext } from "./store/Context";

function App() {
  const [isMute, setIsMute] = useState(false);
  const [totalTime, setTotalTime] = useState(10);
  const [shotTime, setShotTime] = useState(24);
  const [quarter, setQuarter] = useState(1);
  const toggleIsMute = () => {
    setIsMute((prevIsMute) => !prevIsMute);
  };

  return (
    <MuteContext.Provider value={{ isMute, toggleIsMute }}>
      <TimeContext.Provider
        value={{ totalTime, setTotalTime, shotTime, setShotTime }}
      >
        <Layout>
          <KakaoAdfit></KakaoAdfit>
          <Top quarter={quarter} setQuarter={setQuarter}></Top>
          <Bottom quarter={quarter}></Bottom>
          <SoundButton></SoundButton>
          <Tooltip></Tooltip>
        </Layout>
      </TimeContext.Provider>
    </MuteContext.Provider>
  );
}

export default App;
