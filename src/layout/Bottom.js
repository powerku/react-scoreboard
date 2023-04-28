import Score from "../components/Score";
import classes from "./Bottom.module.css";
import ShotClock from "../components/ShotClock";

function Bottom() {
  return (
    <div className={classes.bottom}>
      <Score />
      <ShotClock />
      <Score />
    </div>
  );
}

export default Bottom;
