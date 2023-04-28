import classes from "./FoulButton.module.css";

function SecondButton(props) {
  let second = props.second;
  const setSecond = props.setSecond;

  function plusBtnClickHandler() {
    second = Number(second) + 1;
    if (second > 60) {
      second = 0;
    }
    second = second.toString().length < 2 ? "0" + second : second;

    setSecond(second);
  }

  function minusBtnClickHandler() {
    second = Number(second) - 1;
    if (second < 0) {
      second = 0;
    }

    second = second.toString().length < 2 ? "0" + second : second;
    setSecond(second);
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

export default SecondButton;
