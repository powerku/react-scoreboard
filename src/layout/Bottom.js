import Score from "../components/Score";
import classes from "./Bottom.module.css";
import ShotClock from "../components/ShotClock";
import ScorePointButton from "../components/ScorePointButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import buzzerUrl from "../sound/buzzer.mp3";

function Bottom() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  return (
    <React.Fragment>
      <div className={classes.bottom}>
        <Score type="Home" score={homeScore} setScore={setHomeScore} />
        <ShotClock />
        <Score type="Away" score={awayScore} setScore={setAwayScore} />
      </div>
    </React.Fragment>
  );
}

export default Bottom;
