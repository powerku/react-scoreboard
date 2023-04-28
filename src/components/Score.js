import classes from "./Score.module.css";
import ScorePointButton from "./ScorePointButton";
import { useState } from "react";
function Score() {
  const [score, setScore] = useState(0);

  return (
    <div className={classes.wrapper}>
      <div className={classes.number}>{score}</div>
      <ScorePointButton score={score} setScore={setScore} />
    </div>
  );
}

export default Score;
