import classes from "./ShotClock.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import buzzerUrl from "../sound/buzzer.mp3";
import { MuteContext, TimeContext } from "../store/Context";

const buzzer = new Audio(buzzerUrl);
const quarters = [1, 2, 3, 4, 5];

function ShotClock({
  quarter: currentQuarter,
  homeScore,
  awayScore,
  homeName,
  awayName,
  setHomeScore,
  setAwayScore,
  setHomeName,
  setAwayName,
}) {
  const { shotTime } = useContext(TimeContext);
  const [currentShotTime, setCurrentShotTime] = useState(shotTime * 1000);
  const [startTime, setStartTime] = useState(null);
  const [state, setState] = useState("stop");

  const intervalRef = useRef(null);
  const { isMute } = useContext(MuteContext);

  useEffect(() => {
    clearInterval(intervalRef.current);

    if (state === "stop") {
      return;
    }

    if (startTime === null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      const shotTime = currentShotTime - (new Date() - startTime);
      setCurrentShotTime(shotTime);

      if (shotTime <= 0) {
        clearInterval(intervalRef.current);
        setState("stop");
        if (!isMute) {
          buzzer.play();
        }
      }
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [state, startTime]);

  useEffect(() => {
    document.addEventListener("keyup", handleShortcutKey);
    return () => {
      document.removeEventListener("keyup", handleShortcutKey);
    };
  }, [state, currentShotTime]);

  const start = () => {
    if (currentShotTime > 0) {
      const currentDate = new Date();
      setStartTime(currentDate);
      setState("start");
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setState("stop");
  };

  const reset = () => {
    setCurrentShotTime(shotTime * 1000);
    setState("stop");
  };

  const reset14sec = () => {
    setCurrentShotTime(14 * 1000);
    setState("stop");
  };

  const handleChangeScore = () => {
    setHomeScore(awayScore);
    setAwayScore(homeScore);
    setHomeName(awayName);
    setAwayName(homeName);
  };

  const handleShortcutKey = (event) => {
    event.preventDefault();

    switch (event.code) {
      case "KeyA":
        if (state === "start") {
          stop();
        } else {
          start();
        }
        break;
      case "KeyS":
        reset();
        break;
      case "KeyD":
        reset14sec();
        break;
      default:
    }
  };

  const formatedCurrentShotTime = () => {
    const second = Math.floor((currentShotTime % (60 * 1000)) / 1000);
    const milliSecond = Math.floor((currentShotTime % 1000) / 100);

    if (currentShotTime < 0) return "00";

    if (second < 5) {
      return `${second}.${milliSecond}`;
    }

    return second > 10 ? String(second) : String(second).padStart(2, "0");
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.QuarterRadioContainer}>
        {quarters.map((quarter) => (
          <label key={quarter} className={classes.QuarterRadioLabel}>
            {quarter}
            <input
              type="radio"
              value={currentQuarter}
              className={classes.QuarterRadioInput}
              checked={quarter === currentQuarter}
              readOnly={true}
            />
          </label>
        ))}
      </div>
      <div className={classes.shot}>{formatedCurrentShotTime()}</div>
      <div className={classes.buttonGroup}>
        {state === "start" ? (
          <button className="start" onClick={() => stop()}>
            Stop
          </button>
        ) : (
          <button className="start" onClick={() => start()}>
            Start
          </button>
        )}
        <button onClick={() => setCurrentShotTime((prev) => prev + 1000)}>
          +
        </button>
        <button onClick={() => setCurrentShotTime((prev) => prev - 1000)}>
          -
        </button>
        <button className="start" onClick={() => reset()}>
          Reset
        </button>
        <button onClick={() => reset14sec()}>14</button>
        <button onClick={handleChangeScore}>↔️</button>
      </div>
    </div>
  );
}

export default ShotClock;
