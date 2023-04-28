import classes from "./Foul.module.css";
import FoulButton from "./FoulButton";
import { useState } from "react";
function Foul(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className={classes.count}>{count}</div>
      <FoulButton count={count} setCount={setCount}></FoulButton>
    </div>
  );
}

export default Foul;
