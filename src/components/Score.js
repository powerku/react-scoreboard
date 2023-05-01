import classes from "./Score.module.css";
import ScorePointButton from "./ScorePointButton";
import React from "react";

function Score(props) {
  return (
    <div className={`${classes.wrapper} ${classes.team}`}>
      <span>{props.type}</span>
      <div className={classes.number}>
        {props.score.toString().padStart(2, "0")}
      </div>
      <ScorePointButton
        type={props.type}
        score={props.score}
        setScore={props.setScore}
      />
    </div>
  );
}

export default Score;
