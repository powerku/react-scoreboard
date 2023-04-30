import classes from "./Score.module.css";

function Score(props) {
  return (
    <div className={`${classes.wrapper} ${classes.team}`}>
      <h2>{props.type}</h2>
      <div className={classes.number}>{props.score}</div>
    </div>
  );
}

export default Score;
