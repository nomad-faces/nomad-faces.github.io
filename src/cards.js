import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./cards.css";

function Cards() {
  const [flipStates, setFlipStates] = useState([false, false, false]);

  const handleClick = (index) => {
    setFlipStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="cards-container">
      <ReactCardFlip flipDirection="horizontal" isFlipped={flipStates[0]}>
        <div className="card" onClick={() => handleClick(0)}>
          <h2>Nomad #1</h2>
        </div>
        <div className="card-back" onClick={() => handleClick(0)}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.</p>
        </div>
      </ReactCardFlip>
      <ReactCardFlip flipDirection="horizontal" isFlipped={flipStates[1]}>
        <div className="card" onClick={() => handleClick(1)}>
          <h2>Nomad #2</h2>
        </div>
        <div className="card-back" onClick={() => handleClick(1)}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.</p>
        </div>
      </ReactCardFlip>
      <ReactCardFlip flipDirection="horizontal" isFlipped={flipStates[2]}>
        <div className="card" onClick={() => handleClick(2)}>
          <h2>Nomad #3</h2>
        </div>
        <div className="card-back" onClick={() => handleClick(2)}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.</p>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Cards;
