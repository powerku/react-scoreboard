import classes from "./Foul.module.css";
import FoulButton from "./FoulButton";
import React from "react";

function Foul(props) {
  return (
    <div
      className={`${classes.foul} ${
        props.type === "Home" ? classes.home : classes.away
      }`}
    >
      <span>Foul</span>
      <div className={classes.count}>{props.count}</div>
      <FoulButton
        type={props.type}
        count={props.count}
        setCount={props.setCount}
      ></FoulButton>
    </div>
  );
}

export default Foul;
