import Scrollytelling from "./scrollytelling.js";
import Cards from "./cards.js";
import "./App.css";
import Story from "./Story.js";
import Story2 from "./Story2.js";
import BubbleChart from "./charts/BubbleChart.jsx";
import TopDestinations from "./charts/TopDestinations.jsx";
import Age from "./charts/Age.jsx";
import React, { useState } from "react";

function App() {
  const [dataType, setDataType] = useState("countries");
  return (
    <div className="App">
      <Scrollytelling />
      <Cards />

      <div className="bubble-chart-section">
        <h1 className="bubble-chart-title">Digital Nomad Demographics</h1>

        <div className="bubble-chart-buttons">
          <button
            onClick={() => setDataType("countries")}
            className={`chart-button ${
              dataType === "countries" ? "active" : ""
            }`}
          >
            Countries
          </button>
          <button
            onClick={() => setDataType("ethnicities")}
            className={`chart-button ${
              dataType === "ethnicities" ? "active" : ""
            }`}
          >
            Ethnicities
          </button>
          <button
            onClick={() => setDataType("gender")}
            className={`chart-button ${dataType === "gender" ? "active" : ""}`}
          >
            Gender
          </button>
          <button
            onClick={() => setDataType("education")}
            className={`chart-button ${
              dataType === "education" ? "active" : ""
            }`}
          >
            Education
          </button>
        </div>

        <div className="bubble-chart-container">
          <BubbleChart dataType={dataType} />
        </div>
      </div>

      <h1 className="bubble-chart-title">Digital Nomad Age Distribution</h1>
      <div>
        <Age />
      </div>

      <Story />
      <div>
        <h1>Top Destinations for Digital Nomads</h1>
        <TopDestinations />
      </div>
      <Story2 />
    </div>
  );
}

export default App;
