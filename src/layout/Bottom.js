import Score from "../components/Score";
import classes from "./Bottom.module.css";
import ShotClock from "../components/ShotClock";
import React, { useState } from "react";

function Bottom(props) {
    const [homeName, setHomeName] = useState("Home");
    const [awayName, setAwayName] = useState("Away");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  return (
    <React.Fragment>
      <div className={classes.bottom}>
        <Score type="home" name={homeName} setHomeName={setHomeName} score={homeScore} setScore={setHomeScore} />
        <ShotClock quarter={props.quarter} homeScore={homeScore} setHomeScore={setHomeScore} awayScore={awayScore} setAwayScore={setAwayScore}
        homeName={homeName} awayName={awayName} setHomeName={setHomeName} setAwayName={setAwayName}
        />
        <Score type="away" name={awayName} setAwayName={setAwayName} score={awayScore} setScore={setAwayScore} />
      </div>
    </React.Fragment>
  );
}

export default Bottom;
