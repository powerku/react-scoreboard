import classes from "./Top.module.css";
import Foul from "../components/Foul";
import React, { useContext, useEffect, useRef, useState } from "react";
import longBuzzerUrl from "../sound/longBuzzer.mp3";
import { MuteContext, TimeContext } from "../store/Context";

const longBuzzer = new Audio(longBuzzerUrl);

function Top(props) {
  const { totalTime, setTotalTime } = useContext(TimeContext);
  const [currentTime, setCurrentTime] = useState(totalTime * 60 * 1000);
  const [startTime, setStartTime] = useState(null);
  const [homeFoul, setHomeFoul] = useState(0);
  const [awayFoul, setAwayFoul] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(false);

  const intervalRef = useRef(null);
  const { isMute } = useContext(MuteContext);

  useEffect(() => {
    clearInterval(intervalRef.current);

    if (!isRunning) {
      return;
    }
    if (startTime === null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      const time = currentTime - (new Date() - startTime);
      setCurrentTime(time);

      if (time <= 0) {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        goNextQuarter();
        if (!isMute) {
          longBuzzer.play();
        }
      }
    }, 100);
  }, [isRunning, startTime]);

  useEffect(() => {
    document.addEventListener("keyup", handleShortcutKey);
    return () => {
      document.removeEventListener("keyup", handleShortcutKey);
    };
  }, [isRunning, currentTime]);

  const start = () => {
    if (currentTime > 0) {
      const currentDate = new Date();
      setStartTime(currentDate);
      setIsRunning(true);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  function reset() {
    setIsRunning(false);
    setCurrentTime(totalTime * 60 * 1000);
  }

  function goNextQuarter() {
    if (!breakTime) {
      setIsRunning(false);
      setCurrentTime(60 * 1000);
    } else {
      if (props.quarter === 5) {
        props.setQuarter(1);
      } else {
        props.setQuarter(props.quarter + 1);
      }
      reset();
    }

    setBreakTime((prev) => !prev);
  }

  const handleShortcutKey = (event) => {
    event.preventDefault();

    switch (event.code) {
      case "Space":
        isRunning ? stop() : start();
        break;
      case "ShiftLeft":
        reset();
        break;
      default:
    }
  };

  const formatedTime = () => {
    const minutes = Math.floor(currentTime / (60 * 1000));
    const seconds = Math.floor((currentTime % (60 * 1000)) / 1000);
    const milliSecond = Math.floor((currentTime % 1000) / 100);

    if (currentTime < 0) return "00:00";

    if (currentTime < 60 * 1000) {
      return `${seconds}.${milliSecond}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <React.Fragment>
      <div className={classes.top}>
        <Foul type="Home" count={homeFoul} setCount={setHomeFoul}></Foul>
        <div>
          <div className={classes.timeWrapper}>{formatedTime()}</div>
          <div className={classes.buttonWrapper}>
            <div>
              <button
                onClick={() =>
                  currentTime > 60 * 1000
                    ? setCurrentTime((prev) => prev + 60 * 1000)
                    : setCurrentTime((prev) => prev + 1000)
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  currentTime > 60 * 1000
                    ? setCurrentTime((prev) => prev - 60 * 1000)
                    : setCurrentTime((prev) => prev - 1000)
                }
              >
                -
              </button>
            </div>
            <div>
              {isRunning ? (
                <button className="start" onClick={() => stop()}>
                  Stop
                </button>
              ) : (
                <button className="start" onClick={() => start()}>
                  Start
                </button>
              )}
              <button className="start" onClick={reset}>
                Reset
              </button>
              <button onClick={() => goNextQuarter()}>Quarter</button>
              <button
                className="start"
                onClick={() =>
                  setTotalTime(Math.floor(currentTime / (60 * 1000)))
                }
              >
                Save
              </button>
            </div>
            <div>
              <button
                onClick={() =>
                  currentTime > 60 * 1000
                    ? setCurrentTime((prev) => prev + 1000)
                    : setCurrentTime((prev) => prev + 100)
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  currentTime > 60 * 1000
                    ? setCurrentTime((prev) => prev - 1000)
                    : setCurrentTime((prev) => prev - 100)
                }
              >
                -
              </button>
            </div>
          </div>
        </div>
        <Foul type="Away" count={awayFoul} setCount={setAwayFoul}></Foul>
      </div>
    </React.Fragment>
  );
}

export default Top;
