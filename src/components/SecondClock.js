import classes from "./SecondClock.module.css";
import SecondButton from "./SecondButton";

function SecondClock(props) {
  const value =
    props.second.toString().length < 2 ? "0" + props.second : props.second;

  return (
    <div>
      <div className={classes.area}>{value}</div>
      <SecondButton second={props.second} setSecond={props.setSecond} />
    </div>
  );
}

export default SecondClock;
