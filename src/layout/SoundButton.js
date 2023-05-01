import classes from "./SoundButton.module.css";
import buzzerUrl from "../sound/buzzer.mp3";
import soundUrl from "../sound/nba_sound.mp3";
import { useEffect, useRef, useState } from "react";

function SoundButton() {
  const buzzerRef = useRef(new Audio(buzzerUrl));
  const soundRef = useRef(new Audio(soundUrl));
  const [isBuzzerPlaying, setIsBuzzerPlaying] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  function handleBuzzerButtonClick() {
    const buzzer = buzzerRef.current;
    if (isBuzzerPlaying) {
      setIsBuzzerPlaying(false);
      buzzer.pause();
      buzzer.currentTime = 0; // 소리의 재생 위치를 처음으로 되돌립니다.
    } else {
      setIsBuzzerPlaying(true);
      buzzer.play();
    }
  }

  function handleSoundButtonClick() {
    const sound = soundRef.current;
    if (isSoundPlaying) {
      setIsSoundPlaying(false);
      sound.pause();
      sound.currentTime = 0; // 소리의 재생 위치를 처음으로 되돌립니다.
    } else {
      setIsSoundPlaying(true);
      sound.play();
    }
  }
  useEffect(() => {
    function handleKeyUp(event) {
      if (event.key === "Escape") {
        handleBuzzerButtonClick();
      }
    }
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // 빈 배열을 두 번째 매개변수로 전달하여 컴포넌트가 마운트(mount)될 때만 이벤트가 등록되도록 합니다.

  return (
    <div className={classes.soundButtonGroup}>
      <button className={classes.soundButton} onClick={handleBuzzerButtonClick}>
        Buzzer
      </button>
      <button onClick={handleSoundButtonClick}>Sound1</button>
    </div>
  );
}

export default SoundButton;