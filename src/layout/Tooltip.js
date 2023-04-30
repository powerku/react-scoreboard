import classes from "./Tooltip.module.css";
import { useState } from "react";

function Tooltip() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleTooltip = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={classes.tooltipWrapper} onClick={toggleTooltip}>
      {isOpen && (
        <div className={classes.info}>
          <h3>Short cut</h3>
          <ul>
            <li>
              <span className={classes.key}>SpaceBar</span>: Time Start/Pause
            </li>
            <li>
              <span className={classes.key}>A/S/D</span>: 24sec Start / Reset /
              14sec
            </li>
            <li>
              <span className={classes.key}>1/2/3/4</span>: Home Score
              1p/2p/3p/-1p
            </li>
            <li>
              <span className={classes.key}>7/8/9/0</span>: Away Score
              1p/2p/3p/-1p
            </li>
            <li>
              <span className={classes.key}>5</span>: Home Poul
            </li>
            <li>
              <span className={classes.key}>6</span>: Away Poul
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
