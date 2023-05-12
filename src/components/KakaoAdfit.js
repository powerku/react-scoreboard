import { useEffect, useRef } from "react";
import classes from "./KakaoAdfit.module.css";

function KakaoAdfit() {
  const addfit = useRef();

  useEffect(() => {
    const ins = document.createElement("ins");
    const scr = document.createElement("script");

    ins.className = "kakao_ad_area";
    ins.style = "display:none;";
    scr.async = "true";
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute("data-ad-width", "728");
    ins.setAttribute("data-ad-height", "90");
    ins.setAttribute("data-ad-unit", "DAN-BwxRzXgR2EuPM2Sc");

    const windowSize = window.innerWidth;
    if (windowSize > 1024) {
      addfit.current.appendChild(ins);
      addfit.current.appendChild(scr);
    }
  }, []);
  return <div ref={addfit} className={classes.adfit}></div>;
}

export default KakaoAdfit;
