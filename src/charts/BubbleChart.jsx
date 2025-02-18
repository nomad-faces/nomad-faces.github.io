import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const BubbleChart = ({ dataType }) => {
  const [data, setData] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });
  const width = 600;
  const height = 800;

  const countryData = [
    { name: "United States", Value: 44, color: "#1f77b4" },
    { name: "United Kingdom", Value: 7, color: "#ff7f0e" },
    { name: "Canada", Value: 5, color: "#2ca02c" },
    { name: "Russia", Value: 5, color: "#d62728" },
    { name: "Germany", Value: 4, color: "#2ca02c" },
    { name: "France", Value: 3, color: "#9467bd" },
    { name: "Other", Value: 32, color: "#8c564b" },
  ];

  const ethnicityData = [
    { name: "White", Value: 59, color: "#1f77b4" },
    { name: "Asian", Value: 14, color: "#ff7f0e" },
    { name: "Latin", Value: 12, color: "#2ca02c" },
    { name: "Black", Value: 7, color: "#d62728" },
    { name: "Indian", Value: 5, color: "#9467bd" },
    { name: "Middle Eastern", Value: 3, color: "#8c564b" },
    { name: "Pacific", Value: 1, color: "#e377c2" },
  ];

  useEffect(() => {
    const rawData = dataType === "countries" ? countryData : ethnicityData;
    let bubbles = [];

    rawData.forEach((d) => {
      for (let i = 0; i < d.Value; i++) {
        const initialX = Math.random() * width * 0.5 + width * 0.25; // Randomized X within a smaller range
        const initialY = Math.random() * height * 0.5 + height * 0.25; // Randomized Y within a smaller range
        bubbles.push({ value: d.Value, name: d.name, color: d.color, x: initialX, y: initialY });
      }
    });

    setData(bubbles); // Update data whenever dataType changes
  }, [dataType]); // Re-run useEffect when dataType changes

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select("#bubble-chart");
    svg.selectAll("*").remove(); // Clear previous SVG elements

    const simulation = d3.forceSimulation(data)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force("collision", d3.forceCollide().radius(25))
      .on("tick", ticked);

    const circles = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 15)
      .attr("fill", (d) => d.color)
      .on("mouseover", (event, d) => {
        setTooltip({
          visible: true,
          content: `${d.name}: ${d.value}%`,
          x: event.pageX,
          y: event.pageY
        });
      })
      .on("mouseout", () => setTooltip({ visible: false }));

    function ticked() {
      circles
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    }

    simulation.nodes(data);
  }, [data]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          height: "100vh", // Full viewport height
        }}
      >
        <svg id="bubble-chart" width={width} height={height}></svg>
      </div>

      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "3px",
            pointerEvents: "none",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
};

export default BubbleChart;
