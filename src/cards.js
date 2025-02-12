import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import ReactCardFlip from "react-card-flip";
import "./cards.css";

function Cards() {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="cards-container">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <div className="card" onClick={handleClick}>
          <h2>Card 1</h2>
        </div>
        <div className="card-back" onClick={handleClick}>
          <h2>Card back</h2>
        </div>
      </ReactCardFlip>
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <div className="card" onClick={handleClick}>
          <h2>Card 1</h2>
        </div>
        <div className="card-back" onClick={handleClick}>
          <h2>Card back</h2>
        </div>
      </ReactCardFlip>
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <div className="card" onClick={handleClick}>
          <h2>Card 1</h2>
        </div>
        <div className="card-back" onClick={handleClick}>
          <h2>Card back</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Cards;
