import classes from "./Score.module.css";
import ScorePointButton from "./ScorePointButton";
import React from "react";

function Score(props) {
    const onClick = () => {
        let name = prompt('팀 이름을 입력하세요');
        if (props.type === 'Home') {
            props.setHomeName(name || 'Home');
        } else {
            props.setAwayName(name || 'Away');
        }
    }

  return (
    <div className={`${classes.wrapper} ${classes.team}`} >
      <span onClick={onClick}>{props.name}</span>
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
