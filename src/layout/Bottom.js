import Score from "../components/Score";
import classes from "./Bottom.module.css";
import ShotClock from "../components/ShotClock";
import ScorePointButton from "../components/ScorePointButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import buzzerUrl from "../sound/buzzer.mp3";

function Bottom() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
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
      if (event.key === " " || event.key === "Spacebar" || event.key === "32") {
        event.preventDefault();
        startHandler();
      }
      if (event.key === "Alt") {
        event.preventDefault();
        reset();
      }

      if (event.key === "z" || event.key === "Z") {
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
    <React.Fragment>
      <div className={classes.bottom}>
        <Score type="Home" score={homeScore} />
        <ShotClock shot={shot} />
        <Score type="Away" score={awayScore} />
      </div>
      <div className={classes.container}>
        <ScorePointButton
          type="Home"
          score={homeScore}
          setScore={setHomeScore}
        />
        <div className={classes.buttonGroup}>
          <button className={classes.startButton} onClick={startHandler}>
            {state === "stop" ? "Start" : "Stop"}
          </button>
          <button onClick={plusShot}>+</button>
          <button onClick={minusShot}>-</button>
          <button onClick={reset}>Reset</button>
          <button onClick={reset14sec}>14</button>
        </div>
        <ScorePointButton
          type="Away"
          score={awayScore}
          setScore={setAwayScore}
        />
      </div>
    </React.Fragment>
  );
}

export default Bottom;
