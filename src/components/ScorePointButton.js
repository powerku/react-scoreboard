import classes from "./ScorePointButton.module.css";
import { useCallback, useEffect } from "react";
function ScorePointButton(props) {
  let score = props.score;
  const setScore = props.setScore;
  const handleKeyUp = useCallback(
    (event) => {
      // do stuff with stateVariable and event
      console.log(event);
    },
    [score]
  );

  useEffect(() => {
    const shortcut = (event) => {
      const key = event.key.toUpperCase();
      if (props.type === "Home") {
        if (event.key === "1") {
          event.preventDefault();
          plus1point();
        }
        if (event.key === "2") {
          event.preventDefault();
          plus2point();
        }
        if (event.key === "3") {
          event.preventDefault();
          plus3point();
        }
        if (event.key === "4") {
          event.preventDefault();
          minus1point();
        }
      } else {
        if (event.key === "7") {
          event.preventDefault();
          plus1point();
        }
        if (event.key === "8") {
          event.preventDefault();
          plus2point();
        }
        if (event.key === "9") {
          event.preventDefault();
          plus3point();
        }
        if (event.key === "0") {
          event.preventDefault();
          minus1point();
        }
      }
    };
    document.addEventListener("keyup", shortcut);
    return () => {
      document.removeEventListener("keyup", shortcut);
    };
  }, [handleKeyUp]);

  function minus1point() {
    score = score - 1;
    if (score < 0) {
      score = 0;
    }
    score = score.toString().length < 2 ? "0" + score : score;

    setScore(score);
  }

  function plus1point() {
    score = Number(score) + 1;
    if (score > 99) {
      score = 0;
    }
    score = score.toString().length < 2 ? "0" + score : score;

    setScore(score);
  }
  function plus2point() {
    score = Number(score) + 2;
    if (score > 99) {
      score = 0;
    }
    score = score.toString().length < 2 ? "0" + score : score;

    setScore(score);
  }

  function plus3point() {
    score = Number(score) + 3;
    if (score > 99) {
      score = 0;
    }
    score = score.toString().length < 2 ? "0" + score : score;

    setScore(score);
  }

  return (
    <div className={classes.wrapper}>
      <button onClick={minus1point}>-1p</button>
      <button onClick={plus1point}>1p</button>
      <button onClick={plus2point}>2p</button>
      <button onClick={plus3point}>3p</button>
    </div>
  );
}

export default ScorePointButton;
