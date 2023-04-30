import Score from "../components/Score";
import classes from "./Bottom.module.css";
import ShotClock from "../components/ShotClock";

function Bottom() {
  return (
    <div className={classes.bottom}>
      <Score type="Home" />
      <ShotClock />
      <Score type="Away" />
    </div>
  );
}

export default Bottom;
