import classes from "./FoulButton.module.css";

function MinuteButton(props) {
  let minute = props.minute;
  const setMinute = props.setMinute;

  function plusBtnClickHandler() {
    minute = Number(minute) + 1;
    if (minute > 99) {
      minute = 99;
    }

    setMinute(minute);
  }

  function minusBtnClickHandler() {
    minute = Number(minute) - 1;
    if (minute < 0) {
      minute = 0;
    }

    setMinute(minute);
  }

  return (
    <div className={classes.wrapper}>
      <button onClick={plusBtnClickHandler}>+</button>
      <button onClick={minusBtnClickHandler}>-</button>
    </div>
  );
}

export default MinuteButton;
