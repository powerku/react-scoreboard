import classes from "./Top.module.css";
import MinuteClock from "../components/MinuteClock";
import Foul from "../components/Foul";
import SecondClock from "../components/SecondClock";
import React, { useCallback, useContext, useEffect, useState } from "react";
import MinuteButton from "../components/MinuteButton";
import SecondButton from "../components/SecondButton";
import longBuzzerUrl from "../sound/longBuzzer.mp3";
import { MuteContext, TimeContext } from "../store/Context";

function Top(props) {
  const { totalTime, setTotalTime } = useContext(TimeContext);
  const [minute, setMinute] = useState(totalTime);
  const [second, setSecond] = useState(0);
  const [homeFoul, setHomeFoul] = useState(0);
  const [awayFoul, setAwayFoul] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const longBuzzer = new Audio(longBuzzerUrl);
  const { isMute } = useContext(MuteContext);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (second <= 0) {
          if (minute <= 0) {
            setIsRunning(false);
            setBreakTime(false);
            if (!isMute) {
              longBuzzer.play();
            }
            quarterButtonHandler();

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
    setMinute(totalTime);
    setSecond(0);
  }

  function saveButtonHandler() {
    setTotalTime(minute);
  }

  function nextQuarter() {
    if (breakTime) {
      setIsRunning(false);
      setMinute(1);
      setSecond(0);
    } else {
      if (props.quarter === 5) {
        props.setQuarter(1);
      } else {
        props.setQuarter(props.quarter + 1);
      }
      resetButtonHandler();
    }
  }

  function quarterButtonHandler() {
    setBreakTime(!breakTime);
    nextQuarter();
  }

  return (
    <React.Fragment>
      <div className={classes.top}>
        <Foul type="Home" count={homeFoul} setCount={setHomeFoul}></Foul>
        <div>
          <div className={classes.timeWrapper}>
            <MinuteClock minute={minute} setMinute={setMinute} />
            <div className={classes.center}>
              <span className={classes.colon}>:</span>
            </div>
            <SecondClock second={second} setSecond={setSecond} />
          </div>
          <div className={classes.buttonWrapper}>
            <MinuteButton minute={minute} setMinute={setMinute} />
            <div>
              <button
                className="start"
                onClick={() => setIsRunning(!isRunning)}
              >
                {!isRunning ? "Start" : "Stop"}
              </button>
              <button className="start" onClick={resetButtonHandler}>
                Reset
              </button>
              <button onClick={quarterButtonHandler}>Quarter</button>
              <button className="start" onClick={saveButtonHandler}>
                Save
              </button>
            </div>
            <SecondButton second={second} setSecond={setSecond} />
          </div>
        </div>
        <Foul type="Away" count={awayFoul} setCount={setAwayFoul}></Foul>
      </div>
    </React.Fragment>
  );
}

export default Top;
