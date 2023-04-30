import Score from "../components/Score";
import classes from "./Bottom.module.css";
import ShotClock from "../components/ShotClock";
import ScorePointButton from "../components/ScorePointButton";
import React, { useCallback, useRef, useState } from "react";

function Bottom() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
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
    <React.Fragment>
      <div className={classes.bottom}>
        <Score type="Home" score={homeScore} />
        <ShotClock shot={shot} />
        <Score type="Away" score={awayScore} />
      </div>
      <div className={classes.container}>
        <ScorePointButton score={homeScore} setScore={setHomeScore} />
        <div className={classes.buttonGroup}>
          <button onClick={startHandler}>
            {state === "stop" ? "Start" : "Stop"}
          </button>
          <button onClick={plusShot}>+</button>
          <button onClick={minusShot}>-</button>
          <button onClick={reset}>Reset</button>
          <button onClick={reset14sec}>14</button>
        </div>
        <ScorePointButton score={awayScore} setScore={setAwayScore} />
      </div>
    </React.Fragment>
  );
}

export default Bottom;
