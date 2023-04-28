import classes from "./ScorePointButton.module.css";
function ScorePointButton(props) {
  let score = props.score;
  const setScore = props.setScore;
  function minus1point() {
    score = score - 1;
    if (score < 0) {
      score = 0;
    }
    score = score.toString().length < 2 ? "0" + score : score;

    setScore(score);
  }

  function plus1point() {
    score = Number(score) + 1;
    if (score > 99) {
      score = 0;
    }
    score = score.toString().length < 2 ? "0" + score : score;

    setScore(score);
  }
  function plus2point() {
    score = Number(score) + 2;
    if (score > 99) {
      score = 0;
    }
    score = score.toString().length < 2 ? "0" + score : score;

    setScore(score);
  }

  function plus3point() {
    score = Number(score) + 3;
    if (score > 99) {
      score = 0;
    }
    score = score.toString().length < 2 ? "0" + score : score;

    setScore(score);
  }

  return (
    <div className={classes.wrapper}>
      <button onClick={minus1point}>-1p</button>
      <button onClick={plus1point}>1p</button>
      <button onClick={plus2point}>2p</button>
      <button onClick={plus3point}>3p</button>
    </div>
  );
}

export default ScorePointButton;
