import classes from "./ShotClock.module.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import buzzerUrl from "../sound/buzzer.mp3";

function ShotClock(props) {
  const [state, setState] = useState("stop");
  const [shot, setShot] = useState(24);
  const intervalRef = useRef(null);
  const buzzer = new Audio(buzzerUrl);
  function plusShot() {
    let value = Number(shot) + 1;
    value = value.toString().length < 2 ? "0" + value : value;

    setShot(value);
  }

  const handleKeyUp = useCallback(
    (event) => {
      // do stuff with stateVariable and event
      console.log(event);
    },
    [state]
  );

  useEffect(() => {
    const shortcut = (event) => {
      if (event.code === "KeyA") {
        // 공격 시간 시작/중지
        event.preventDefault();
        startHandler();
      }
      if (event.code === "KeyS") {
        // 공격 시간 리셋
        event.preventDefault();
        reset();
      }

      if (event.code === "KeyD") {
        // 공격 시간 14초
        event.preventDefault();
        reset14sec();
      }
    };
    document.addEventListener("keyup", shortcut);
    return () => {
      document.removeEventListener("keyup", shortcut);
    };
  }, [handleKeyUp]);

  function minusShot() {
    setShot((c) => {
      let value = Number(c) - 1;
      if (value === 0) {
        buzzer.play().then(() => {
          stop();
        });
        setState("stop");
      }
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
    setState("stop");
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
        <button className={classes.startButton} onClick={startHandler}>
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
