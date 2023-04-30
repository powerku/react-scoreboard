import classes from "./MinuteClock.module.css";
import MinuteButton from "./MinuteButton";

function MinuteClock(props) {
  return (
    <div>
      <div className={classes.area}>{props.minute}</div>
    </div>
  );
}

export default MinuteClock;
