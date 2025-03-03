import Scrollytelling from "./scrollytelling.js";
import Cards from "./cards.js";
import './App.css';
import Story from './Story.js';
import BubbleChart from "./charts/BubbleChart.jsx";
import TopDestinations from "./charts/TopDestinations.jsx";
import React, { useState } from "react";



function App() {
  const [dataType, setDataType] = useState("countries"); 
  return (
    <div className="App">
      <Scrollytelling />
      <Cards />
      <h1>Bubble Chart Visualization</h1>
      <button onClick={() => setDataType("countries")}>Show Countries</button>
      <button onClick={() => setDataType("ethnicities")}>Show Ethnicities</button>
      <button onClick={() => setDataType("gender")}>Show Gender</button>
      <button onClick={() => setDataType("education")}>Show Education</button>

      <div
        style={{
          backgroundColor: "white", // Set background color to white
          borderRadius: "10px",       // Optional: Add rounded corners
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0)", // Optional: Add a subtle shadow
          margin: "20px auto",       // Center the container on the page with some margin
          width: "80%",              // Optional: Set the container width (adjust as needed)
          maxWidth: "900px",         // Optional: Set a max width
        }}
      >
        <BubbleChart dataType={dataType} />
      </div>
      <Story /> 
      <div>
      <h1>Top Cities for Digital Nomads</h1>
      <TopDestinations />
    </div>
    
    </div>
  )
}

export default App;
