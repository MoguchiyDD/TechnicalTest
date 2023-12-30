import React from 'react';

export const SurpriseTop = props => {
  const {startData, endData, discount, code} = props;
  return(
    <div className="surprise-top">
      <p>
        <strong>Black Friday</strong>, {startData}-{endData} Nov
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        <strong><span className="yellow">{discount}</span></strong>
        <span className="gray">&nbsp;ꞏ&nbsp;</span>
        Use code <strong><span className="yellow">{code}</span></strong> at checkout
      </p>
      <button id="btn">Shop now</button>
      <figure>
        <img src={process.env.PUBLIC_URL + "/images/surprise.png"} alt="Surprise Top" />
      </figure>
    </div>
  )
}
export const SurpriseBottom = props => {
  const {discount, code} = props;
  const urlImage = process.env.PUBLIC_URL + "/images/surprise.png";
  console.log(urlImage);
  return(
    <div className="surprise-bottom">
      <figure>
        <img src={process.env.PUBLIC_URL + "/images/surprise.png"} alt="Surprise Bottom" />
      </figure>
      <div id="right">
        <p id="header"><strong>Black Friday</strong></p>
        <p id="percent"><strong>{discount}</strong></p>
        <p id="code">Use code <strong><span className="yellow">{code}</span></strong> at checkout</p>
        <button id="btn">Shop now through Monday</button>
      </div>
    </div>
  )
}
