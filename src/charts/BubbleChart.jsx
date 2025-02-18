import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const BubbleChart = ({ dataType }) => {
  const [data, setData] = useState([]);

  const width = 800;
  const height = 600;
  const gridSize = 10;
  const cellSize = 50;
  const radius = 15;

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
    { name: "Asian", Value: 13, color: "#ff7f0e" },
    { name: "Latin", Value: 12, color: "#2ca02c" },
    { name: "Black", Value: 7, color: "#d62728" },
    { name: "Indian", Value: 5, color: "#9467bd" },
    { name: "Middle Eastern", Value: 3, color: "#8c564b" },
    { name: "Pacific", Value: 1, color: "#e377c2" },
  ];

  useEffect(() => {
    const rawData = dataType === "countries" ? countryData : ethnicityData;
    let bubbles = [];

    let index = 0;
    rawData.forEach(d => {
      for (let i = 0; i < d.Value; i++) {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        bubbles.push({
          value: d.Value,
          name: d.name,
          color: d.color,
          x: col * cellSize + 50,
          y: row * cellSize + 50,
        });
        index++;
      }
    });

    setData(bubbles);
  }, [dataType]);

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select("#bubble-chart");
    svg.selectAll("*").remove(); // Clear previous drawings

    // Draw Bubbles
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", radius)
      .attr("fill", d => d.color)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    // Draw Legend
    const legendData = dataType === "countries" ? countryData : ethnicityData;
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 200}, 50)`); // Position on the right side

    legend.selectAll("circle")
      .data(legendData)
      .enter()
      .append("circle")
      .attr("cx", 0)
      .attr("cy", (d, i) => i * 30)
      .attr("r", 10)
      .attr("fill", d => d.color);

    legend.selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", (d, i) => i * 30 + 5)
      .text(d => d.name)
      .attr("font-size", "14px")
      .attr("fill", "#333");
  }, [data]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <svg id="bubble-chart" width={width} height={height}></svg>
    </div>
  );
};

export default BubbleChart;
