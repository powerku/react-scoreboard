import classes from "./ShotClock.module.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import buzzerUrl from "../sound/buzzer.mp3";
import { MuteContext, TimeContext } from "../store/Context";

function ShotClock(props) {
  const { shotTime, setShotTime } = useContext(TimeContext);
  const { isMute } = useContext(MuteContext);
  const [state, setState] = useState("stop");
  const [shot, setShot] = useState(shotTime);
  const intervalRef = useRef(null);
  const buzzer = new Audio(buzzerUrl);
  const quarter = [1, 2, 3, 4, 5];
  const selectedQuarter = props.quarter;
  function plusShot() {
    let value = Number(shot) + 1;
    value = value.toString().length < 2 ? "0" + value : value;

    setShot(value);
  }

  const handleKeyUp = useCallback(
    (event) => {
      // do stuff with stateVariable and event
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
  }, [handleKeyUp, shotTime]);

  function minusShot() {
    setShot((c) => {
      let value = Number(c) - 1;
      if (value === 0) {
        if (!isMute) {
          buzzer.play();
        }
        stop();

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
    setShot(shotTime);
    setState("stop");
  }

  function reset14sec() {
    stop();
    setShot(14);
  }

  function startHandler() {
    if (state === "stop" && shot > 0) {
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

  const changeScore = () => {
    const homeScore = props.homeScore;
    const awayScore = props.awayScore;
    const homeName = props.homeName;
    const awayName = props.awayName;

    props.setHomeScore(awayScore);
    props.setAwayScore(homeScore);
    props.setHomeName(awayName);
    props.setAwayName(homeName);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.QuarterRadioContainer}>
        {quarter.map((q) => (
          <label key={q} className={classes.QuarterRadioLabel}>
            {q}
            <input
              type="radio"
              value={q}
              className={classes.QuarterRadioInput}
              checked={selectedQuarter === q}
              readOnly={true}
            />
          </label>
        ))}
      </div>
      <div className={classes.shot}>{shot}</div>
      <div className={classes.buttonGroup}>
        <button className="start" onClick={startHandler}>
          {state === "stop" ? "Start" : "Stop"}
        </button>
        <button onClick={plusShot}>+</button>
        <button onClick={minusShot}>-</button>
        <button className="start" onClick={reset}>
          Reset
        </button>
        <button onClick={reset14sec}>14</button>
        <button onClick={changeScore}>↔️</button>
      </div>
    </div>
  );
}

export default ShotClock;
