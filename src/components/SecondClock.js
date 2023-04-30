import classes from "./SecondClock.module.css";
import SecondButton from "./SecondButton";

function SecondClock(props) {
  return (
    <div>
      <div className={classes.area}>
        {props.second.toString().padStart(2, "0")}
      </div>
    </div>
  );
}

export default SecondClock;
