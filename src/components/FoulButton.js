import classes from "./FoulButton.module.css";

function FoulButton(props) {
  let count = props.count;
  const setCount = props.setCount;

  function plusBtnClickHandler() {
    count = count + 1;
    if (count > 9) {
      count = 0;
    }
    setCount(count);
  }

  function minusBtnClickHandler() {
    count = count - 1;
    if (count < 0) {
      count = 0;
    }
    setCount(count);
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

export default FoulButton;
