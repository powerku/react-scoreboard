import classes from "./Top.module.css";
import MinuteClock from "../components/MinuteClock";
import Foul from "../components/Foul";
import SecondClock from "../components/SecondClock";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FoulButton from "../components/FoulButton";
import MinuteButton from "../components/MinuteButton";
import SecondButton from "../components/SecondButton";
import buzzerUrl from "../sound/buzzer.mp3";

function Top() {
  // const [state, setState] = useState("stop");
  const [minute, setMinute] = useState(10);
  const [second, setSecond] = useState(0);
  const [homeFoul, setHomeFoul] = useState(0);
  const [awayFoul, setAwayFoul] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const buzzer = new Audio(buzzerUrl);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        console.log("second", second);
        console.log("minute", minute);

        if (second === 0) {
          if (Number(minute) === 0) {
            setIsRunning(false);
            buzzer.play();
            clearInterval(intervalId);
          } else {
            setMinute((minutes) => minutes - 1);
            setSecond(59);
          }
        } else {
          setSecond((seconds) => seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [second, minute, isRunning]);

  const handleKeyUp = useCallback(
    (event) => {
      // do stuff with stateVariable and event
      console.log(event);
    },
    [second, minute, isRunning]
  );

  useEffect(() => {
    const shortcut = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsRunning(!isRunning);
      }

      if (event.key === "Shift") {
        event.preventDefault();
        resetButtonHandler();
      }
    };

    document.addEventListener("keyup", shortcut);
    return () => {
      document.removeEventListener("keyup", shortcut);
    };
  }, [handleKeyUp]);

  function resetButtonHandler() {
    setIsRunning(false);
    setMinute(10);
    setSecond(0);
  }

  return (
    <React.Fragment>
      <div className={classes.top}>
        <Foul count={homeFoul}></Foul>
        <MinuteClock minute={minute} setMinute={setMinute} />
        <div className={classes.center}>
          <span className={classes.colon}>:</span>
        </div>
        <SecondClock second={second} setSecond={setSecond} />
        <Foul count={awayFoul}></Foul>
      </div>
      <div className={classes.container}>
        <FoulButton count={homeFoul} setCount={setHomeFoul}></FoulButton>
        <MinuteButton minute={minute} setMinute={setMinute} />
        <div className={classes.buttonWrapper}>
          <button
            className={classes.startBtn}
            onClick={() => setIsRunning(!isRunning)}
          >
            {!isRunning ? "Start" : "Stop"}
          </button>
          <button className={classes.startBtn} onClick={resetButtonHandler}>
            Reset
          </button>
        </div>
        <SecondButton second={second} setSecond={setSecond} />
        <FoulButton count={awayFoul} setCount={setAwayFoul}></FoulButton>
      </div>
    </React.Fragment>
  );
}

export default Top;
