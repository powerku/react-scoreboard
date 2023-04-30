import classes from "./FoulButton.module.css";
import { useEffect } from "react";

function FoulButton(props) {
  let count = props.count;
  const setCount = props.setCount;

  useEffect(() => {
    function handleKeyUp(event) {
      if (props.type === "Home") {
        if (event.key === "5") {
          plusBtnClickHandler();
        }
      } else {
        if (event.key === "6") {
          plusBtnClickHandler();
        }
      }
    }
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // 빈 배열을 두 번째 매개변수로 전달하여 컴포넌트가 마운트(mount)될 때만 이벤트가 등록되도록 합니다.

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
