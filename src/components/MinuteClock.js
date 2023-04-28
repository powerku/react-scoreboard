import classes from "./MinuteClock.module.css";
import MinuteButton from "./MinuteButton";

function MinuteClock(props) {
    return (
        <div>
            <div className={classes.area}>{props.minute}</div>
            <MinuteButton minute={props.minute} setMinute={props.setMinute}/>
        </div>
    );
}

export default MinuteClock;
