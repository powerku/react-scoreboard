import classes from "./Top.module.css";
import MinuteClock from "../components/MinuteClock";
import Foul from "../components/Foul";
import SecondClock from "../components/SecondClock";
import React, { useCallback, useRef, useState } from "react";
function Top() {
  const [state, setState] = useState("stop");
  const [minute, setMinute] = useState(10);
  const [second, setSecond] = useState(0);
  const intervalRef = useRef(null);

  function resetButtonHandler() {
    stop();
    setMinute(10);
    setSecond(0);
  }

  function startButtonHandler() {
    console.log("state", state);
    if (state === "stop") {
      setState("start");
      start();
    } else {
      setState("stop");
      stop();
    }
  }
  const minusMinute = (minute) => {
    console.log(minute);
    minute = Number(minute) - 1;
    if (minute < 0) {
      minute = 0;
    }

    minute = minute.toString().length < 2 ? "0" + minute : minute;
    setMinute(minute);
  };

  function minusSecond() {
    setSecond((c) => {
      let value = Number(c) - 1;
      if (value < 0) {
        minusMinute(minute);
        value = 59;
      }
      value = value.toString().length < 2 ? "0" + value : value;
      return value;
    });
  }

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      minusSecond();
    }, 1000);
  }, [minute]);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, [minute]);

  return (
    <React.Fragment>
      <div className={classes.top}>
        <Foul></Foul>
        <MinuteClock minute={minute} setMinute={setMinute} />
        <div className={classes.center}>
          <span className={classes.colon}>:</span>
          <button onClick={startButtonHandler}>
            {state === "stop" ? "Start" : "Stop"}
          </button>
          <button onClick={resetButtonHandler}>Reset</button>
        </div>
        <SecondClock second={second} setSecond={setSecond} />
        <Foul></Foul>
      </div>
    </React.Fragment>
  );
}

export default Top;
