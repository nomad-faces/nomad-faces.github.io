import React, { useState } from "react";
import "./cards.css";
import Card1 from "./Assets/Card_1.png";
import Card2 from "./Assets/Card_2.png";
import Card3 from "./Assets/Card_3.png";

function Cards() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClick = (index) => {
    setSelectedCard(index);
  };

  const closeOverlay = () => {
    setSelectedCard(null);
  };

  const cards = [Card1, Card2, Card3];

  return (
    <div className="cards-container">
      <div className="cards-row">
        {cards.map((card, index) => (
          <div className="card" key={index} onClick={() => handleClick(index)}>
            <img
              src={card}
              alt={`Card ${index + 1} front`}
              className="card-image"
            />
          </div>
        ))}
      </div>

      {selectedCard !== null && (
        <div className="overlay-card">
          <button className="close-btn" onClick={closeOverlay}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Cards;
