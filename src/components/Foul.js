import classes from "./Foul.module.css";

function Foul(props) {
  return (
    <div className={classes.foul}>
      <h2>Foul</h2>
      <div className={classes.count}>{props.count}</div>
    </div>
  );
}

export default Foul;
