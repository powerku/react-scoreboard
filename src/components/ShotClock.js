import classes from "./ShotClock.module.css";

function ShotClock(props) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.shot}>{props.shot}</div>
    </div>
  );
}

export default ShotClock;
