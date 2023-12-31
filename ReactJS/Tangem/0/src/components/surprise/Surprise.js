/*
Developer & Owner: МогучийДД (MoguchiyDD)
LICENSE: MIT License which is located in the text file LICENSE

Goal: Determine SCREEN Size
Result: Accurate SCREEN Size

Past Modification: Editing The «SurpriseBottom» CONSTANT (SCROLL)
Last Modification: Editing The «SurpriseBottom» CONSTANT (LOGIC)
Modification Date: 2024.01.02, 03:08 AM

Create Data: 2023.12.29, 02:37 PM
*/


import React, { useEffect, useState } from "react";
import { useScreenWidth } from "../screen/Screen";
import { useScrollDirection } from "../scroll/Scroll";


/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description The SURPRISE from Above
 * @param {*} props DATA
 * @returns JSX
 */
export const SurpriseTop = props => {
  const {discount, code} = props;

  // Screen Width
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
        <strong><span className="yellow">{discount}</span></strong>
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        Use code <strong><span className="yellow">{code}</span></strong> at checkout
      </p>
    );
    btn = <button id="btn">Shop now</button>;
  } else if ((screenWidth >= 768) && (screenWidth <= 960)) {
    text = (
      <p>
        <strong>Black Friday</strong>
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        <strong><span className="yellow">{discount}</span></strong>
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        Use code <strong><span className="yellow">{code}</span></strong>
      </p>
    );
    btn = <button id="btn">Shop now</button>;
  } else {
    text = (
      <p>
        <strong>Black Friday</strong>,&nbsp;
        <strong><span className="yellow">{discount}</span></strong>
      </p>
    );
    btn = <button id="btn">❯</button>;
  }

  // JSX
  return (
    <div className="surprise-top">
      <figure>
        <img src={process.env.PUBLIC_URL + "/images/surprise.png"} alt="Surprise Top" />
      </figure>
      {text}
      {btn}
    </div>
  )
}


/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description The SURPRISE from Below
 * @param {*} props DATA
 * @returns JSX
 */
export const SurpriseBottom = props => {
  const {discount, code} = props;
  const scrollDirection = useScrollDirection();  // Scroll && Count
  const countScroll = scrollDirection.count;  // Scroll
  const scroll = scrollDirection.scroll;  // Number of SCROLL Starts

  // BLOCK show || hide
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

  // Style for BLOCK hide
  let style = { "": "" };
  if (((scroll === "hide") && (countScroll >= 1)) && (id !== "close")) {
    style = {
      animation: "animationHide 1s forwards",
      WebkitAnimation: "animationHide 1s forwards",
      OAnimation: "animationHide 1s forwards",
      MozAnimation: "animationHide 1s forwards",
      MsAnimation: "animationHide 1s forwards"
    }
  } else if (((scroll === "hide") && (countScroll === 0)) || (id === "close")) {
    style = { display: "none" }
  } else {
    style = { "": "" };
  }

  // Screen Width
  let btn = "";

  const screenWidth = useScreenWidth();
  if (screenWidth < 768) {
    btn = <button id="btn">Shop now</button>;
  } else {
    btn = <button id="btn">Shop now through Monday</button>;
  }

  // JSX
  return(
    <div className={"surprise-bottom " + scroll + " " + id} style={style}>
      <figure>
        <img src={process.env.PUBLIC_URL + "/images/surprise.png"} alt="Surprise Bottom" />
      </figure>
      <button id="btn-close" onClick={activateBtnClose}>✕</button>
      <div id="right">
        <p id="header"><strong>Black Friday</strong></p>
        <p id="percent"><strong>{discount}</strong></p>
        <p id="code">Use code <strong><span className="yellow">{code}</span></strong> at checkout</p>
        {btn}
      </div>
    </div>
  )
}
