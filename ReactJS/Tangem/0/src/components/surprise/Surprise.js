import React, { useEffect, useState } from "react";
import { useScreenWidth } from "../screen/Screen";
import { useScrollDirection } from "../scroll/Scroll";

const SurpriseTop = ({ discount, code }) => {
  let text = "";
  let btn = "";

  const screenWidth = useScreenWidth();  
  if (screenWidth > 960) {
    const startData = 24;
    const endData = 27;

    text = (
      <p>
        <strong>Black Friday</strong>, {startData}-{endData} Nov
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        <strong>
          <span className="yellow">{discount}</span>
        </strong>
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        Use code
        <strong>
          <span className="yellow">&nbsp;{code}&nbsp;</span>
        </strong>
        at checkout
      </p>
    );
    btn = <button id="btn">Shop now</button>;
  } else if (screenWidth >= 768) {
    text = (
      <p>
        <strong>Black Friday</strong>
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        <strong>
          <span className="yellow">{discount}</span>
        </strong>
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        Use code
        <strong>
          <span className="yellow">&nbsp;{code}&nbsp;</span>
        </strong>
      </p>
    );
    btn = <button id="btn">Shop now</button>;
  } else {
    text = (
      <p>
        <strong>Black Friday</strong>,&nbsp;
        <strong>
          <span className="yellow">{discount}</span>
        </strong>
      </p>
    );
    btn = <button id="btn">❯</button>;
  }

  return (
    <div className="surprise-top">
      <figure>
        <img src={process.env.PUBLIC_URL + "/images/surprise.png"} alt="Surprise Top" />
      </figure>
      {text}
      {btn}
    </div>
  );
};

const SurpriseBottom = ({ discount, code }) => {
  const scrollDirection = useScrollDirection();
  const [id, setId] = useState("");

  useEffect(() => {
    try {
      setId(JSON.parse(window.localStorage.getItem("close")));
    } catch (error) {
      setId(window.localStorage.getItem("close"));
    }
  }, []);

  const activateBtnClose = () => {
    setId("close");
    if (!localStorage.getItem("close")) {
      window.localStorage.setItem("close", JSON.stringify("close"));
    }
  };

  const style =
    scrollDirection.scroll === "hide" && scrollDirection.count >= 1 && id !== "close"
      ? {
          animation: "animationHide 1s forwards",
          WebkitAnimation: "animationHide 1s forwards",
          OAnimation: "animationHide 1s forwards",
          MozAnimation: "animationHide 1s forwards",
          MsAnimation: "animationHide 1s forwards",
        }
      : scrollDirection.scroll === "hide" && scrollDirection.count === 0 || id === "close"
        ? { display: "none" }
        : {};

  const screenWidth = useScreenWidth();
  const btn = screenWidth < 768 ? (
    <button id="btn">Shop now</button>
  ) : (
    <button id="btn">Shop now through Monday</button>
  );

  return (
    <div className={`surprise-bottom ${scrollDirection.scroll} ${id}`} style={style}>
      <figure>
        <img src={process.env.PUBLIC_URL + "/images/surprise.png"} alt="Surprise Bottom" />
      </figure>
      <button id="btn-close" onClick={activateBtnClose}>
        ✕
      </button>
      <div id="right">
        <p id="header">
          <strong>Black Friday</strong>
        </p>
        <p id="percent">
          <strong>{discount}</strong>
        </p>
        <p id="code">
          Use code
          <strong>
            <span className="yellow">&nbsp;{code}&nbsp;</span>
          </strong>
          at checkout
        </p>
        {btn}
      </div>
    </div>
  );
};

export { SurpriseTop, SurpriseBottom };
