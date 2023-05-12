import Layout from "./layout/Layout";
import Top from "./layout/Top";
import Bottom from "./layout/Bottom";
import classes from "./App.css";
import SoundButton from "./layout/SoundButton";
import Tooltip from "./layout/Tooltip";
import KakaoAdfit from "./components/KakaoAdfit";
import React, { useState } from "react";
import { MuteContext } from "./store/Context";

function App() {
  const [isMute, setIsMute] = useState(false);

  const toggleIsMute = () => {
    setIsMute((prevIsMute) => !prevIsMute);
  };

  return (
    <MuteContext.Provider value={isMute}>
      <Layout>
        <KakaoAdfit></KakaoAdfit>
        <Top></Top>
        <Bottom></Bottom>
        <SoundButton toggleIsMute={toggleIsMute}></SoundButton>
        <Tooltip></Tooltip>
      </Layout>
    </MuteContext.Provider>
  );
}

export default App;
