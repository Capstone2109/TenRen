import React from "react";

export default function Price(props) {
  const { dollarAmount, dollarGainLoss, pChange, stockTicker } = props;
  return (
    <header className="price">
      {stockTicker ? <h1>{stockTicker}</h1> : null}
      <div className="price__dollar">
        {<h1>{dollarAmount}</h1>}
        <p>
          {dollarGainLoss} ({pChange})
        </p>
      </div>
    </header>
  );
}
