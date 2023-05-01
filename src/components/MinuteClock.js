import classes from "./MinuteClock.module.css";
import MinuteButton from "./MinuteButton";

function MinuteClock(props) {
  return (
    <div className={classes.area}>
      {props.minute.toString().padStart(2, "0")}
    </div>
  );
}

export default MinuteClock;
