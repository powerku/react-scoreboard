import classes from "./FoulButton.module.css";

function MinuteButton(props) {
  let minute = props.minute;
  const setMinute = props.setMinute;

  function plusBtnClickHandler() {
    minute = Number(minute) + 1;
    if (minute > 99) {
      minute = 99;
    }
    minute = minute.toString().length < 2 ? "0" + minute : minute;

    setMinute(minute);
  }

  function minusBtnClickHandler() {
    minute = Number(minute) - 1;
    if (minute < 0) {
      minute = 0;
    }

    minute = minute.toString().length < 2 ? "0" + minute : minute;
    setMinute(minute);
  }

  return (
    <div className={classes.wrapper}>
      <button onClick={plusBtnClickHandler} className={classes.plus}>
        +
      </button>
      <button onClick={minusBtnClickHandler}>-</button>
    </div>
  );
}

export default MinuteButton;
