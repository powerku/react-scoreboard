import classes from "./ShotClock.module.css";
import { useCallback, useRef, useState } from "react";

function ShotClock() {
  const [state, setState] = useState("stop");
  const [shot, setShot] = useState(24);
  const intervalRef = useRef(null);

  function plusShot() {
    let value = Number(shot) + 1;
    value = value.toString().length < 2 ? "0" + value : value;

    setShot(value);
  }

  function minusShot() {
    setShot((c) => {
      let value = Number(c) - 1;
      if (value < 0) {
        value = 0;
      }
      value = value.toString().length < 2 ? "0" + value : value;
      return value;
    });
  }

  function reset() {
    stop();
    setShot(24);
  }

  function reset14sec() {
    stop();
    setShot(14);
  }

  function startHandler() {
    if (state === "stop") {
      setState("start");
      start();
    } else {
      setState("stop");
      stop();
    }
  }

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      minusShot();
    }, 1000);
  }, [shot]);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, [shot]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.shot}>{shot}</div>
      <div className={classes.buttonGroup}>
        <button onClick={startHandler}>
          {state === "stop" ? "Start" : "Stop"}
        </button>
        <button onClick={plusShot}>+</button>
        <button onClick={minusShot}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={reset14sec}>14</button>
      </div>
    </div>
  );
}

export default ShotClock;
