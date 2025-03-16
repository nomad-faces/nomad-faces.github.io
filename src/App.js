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
      <div className="scrollytelling-section">
        <Scrollytelling />
      </div>
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

        <div>
          <BubbleChart dataType={dataType} />
        </div>
      </div>
      <div className="text-after-chart">
        <p>
          Despite the rapid increase in the number of digital nomads in recent
          years, their demographic remains strikingly homogenous — the typical
          nomad being a White, mid-30s college-educated male.
          <br />
          <br />
          The lack of diversity within the digital nomad community has
          significant consequences. Wealthier nomads from advanced economies
          often have the power to shape local markets and cultural spaces to fit
          their preferences, driving up costs and displacing local identity and
          communities. Largely composed of individuals from privileged
          backgrounds, the economic benefits of remote work remain concentrated
          among those already positioned to succeed. Without greater inclusion,
          does this growing movement further reinforce global inequalities?
        </p>
      </div>

      <h1 className="bubble-chart-title">Digital Nomad Age Distribution</h1>
      <div>
        <Age />
      </div>

      <Story />
      <div>
        <h1 style={{ fontFamily: "Instrument, serif", fontWeight: "bold" }}>
          Top Destinations for Digital Nomads
        </h1>
        <TopDestinations />
      </div>
      <Story2 />
    </div>
  );
}

export default App;
