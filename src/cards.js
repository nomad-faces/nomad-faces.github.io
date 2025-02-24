import React, { useState } from "react";
import "./cards.css";

function Cards() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClick = (index) => {
    setSelectedCard(index);
  };

  const closePopup = () => {
    setSelectedCard(null);
  };

  let overlayContent;
  if (selectedCard === 0) {
    overlayContent = (
      <>
        <h2>Nomad #1 Details</h2>
        <p>This is the unique content for Nomad #1. Lorem ipsum dolor sit amet.</p>
      </>
    );
  } else if (selectedCard === 1) {
    overlayContent = (
      <>
        <h2>Nomad #2 Details</h2>
        <p>This is the unique content for Nomad #2. Consectetur adipiscing elit.</p>
      </>
    );
  } else if (selectedCard === 2) {
    overlayContent = (
      <>
        <h2>Nomad #3 Details</h2>
        <p>This is the unique content for Nomad #3. Sed do eiusmod tempor incididunt.</p>
      </>
    );
  }

  return (
    <div className={`cards-container ${selectedCard !== null ? "popup-active" : ""}`}>
      <div className="cards-row">
        <div className="card" onClick={() => handleClick(0)}>
          <h2>Nomad #1</h2>
        </div>
        <div className="card" onClick={() => handleClick(1)}>
          <h2>Nomad #2</h2>
        </div>
        <div className="card" onClick={() => handleClick(2)}>
          <h2>Nomad #3</h2>
        </div>
      </div>

      {selectedCard !== null && (
        <div className="overlay-card">
          <button className="close-btn" onClick={closePopup}>Close</button>
          {overlayContent}
        </div>
      )}
    </div>
  );
}

export default Cards;
