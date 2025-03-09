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
    {
      name: "United States",
      Value: 44,
      color: "#4a4a4a",
      group: "United States",
    },
    { name: "United Kingdom", Value: 7, color: "#a3a3a3", group: "Other" },
    { name: "Canada", Value: 5, color: "#a3a3a3", group: "Other" },
    { name: "Russia", Value: 5, color: "#a3a3a3", group: "Other" },
    { name: "Germany", Value: 4, color: "#a3a3a3", group: "Other" },
    { name: "France", Value: 3, color: "#a3a3a3", group: "Other" },
    { name: "Other", Value: 32, color: "#a3a3a3", group: "Other" },
  ];

  const ethnicityData = [
    { name: "White", Value: 59, color: "#4a4a4a", group: "White" },
    { name: "Asian", Value: 13, color: "#a3a3a3", group: "Other" },
    { name: "Latin", Value: 12, color: "#a3a3a3", group: "Other" },
    { name: "Black", Value: 7, color: "#a3a3a3", group: "Other" },
    { name: "Indian", Value: 5, color: "#a3a3a3", group: "Other" },
    { name: "Middle Eastern", Value: 3, color: "#a3a3a3", group: "Other" },
    { name: "Pacific", Value: 1, color: "#a3a3a3", group: "Other" },
  ];

  const genderData = [
    { name: "Men", Value: 83, color: "#4a4a4a", group: "Men" },
    { name: "Women", Value: 17, color: "#a3a3a3", group: "Other" },
  ];

  const educationData = [
    {
      name: "Bachelor's",
      Value: 53,
      color: "#4a4a4a",
      group: "College and Above",
    },
    {
      name: "Master's",
      Value: 34,
      color: "#4a4a4a",
      group: "College and Above",
    },
    { name: "PhD", Value: 3, color: "#4a4a4a", group: "College and Above" },
    ,
    { name: "High School", Value: 10, color: "#a3a3a3", group: "High School" },
  ];

  const getTooltipContent = (d) => {
    let groupData;
    let rawData;

    if (dataType === "countries") {
      rawData = countryData;
    } else if (dataType === "ethnicities") {
      rawData = ethnicityData;
    } else if (dataType === "gender") {
      rawData = genderData;
    } else if (dataType === "education") {
      rawData = educationData;
    }

    groupData = rawData.filter((item) => item.color === d.color);

    return groupData.map((item) => `${item.name}: ${item.Value}%`).join("\n");
  };

  const getTakeawayMessage = (type) => {
    switch (type) {
      case "countries":
        return "Almost half the nomads are from the United States.";
      case "ethnicities":
        return "3 out of 5 nomads are White.";
      case "gender":
        return "Digital nomads are predominantly men, at over 80%.";
      case "education":
        return "9 out of 10 digital nomads have a college degree or higher.";
      default:
        return "";
    }
  };

  useEffect(() => {
    let rawData;
    if (dataType === "countries") {
      rawData = countryData;
    } else if (dataType === "ethnicities") {
      rawData = ethnicityData;
    } else if (dataType === "gender") {
      rawData = genderData;
    } else if (dataType === "education") {
      rawData = educationData;
    }

    let bubbles = [];

    let index = 0;
    rawData.forEach((d) => {
      for (let i = 0; i < d.Value; i++) {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        bubbles.push({
          value: d.Value,
          name: d.name,
          color: d.color,
          group: d.group,
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

    // Create tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "10px")
      .style("font-size", "12px")
      .style("white-space", "pre-line");

    const circles = svg.selectAll("circle").data(data, (d) => d.x + "-" + d.y);

    // EXIT: Fade out old bubbles
    circles
      .exit()
      .transition()
      .duration(500)
      .attr("r", 0)
      .style("opacity", 0)
      .remove();

    // UPDATE: Move existing bubbles
    circles
      .transition()
      .duration(500)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", (d) => d.color);

    // ENTER: Fade in new bubbles with tooltip behavior
    const newCircles = circles
      .enter()
      .append("circle")
      .attr("r", 0)
      .attr("fill", (d) => d.color)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .style("opacity", 0)
      .on("mouseover", function (event, d) {
        tooltip.style("visibility", "visible").html(getTooltipContent(d));
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });

    newCircles
      .transition()
      .duration(1000)
      .attr("r", radius)
      .style("opacity", 1);

    // Draw Legend
    const legendData = (() => {
      if (dataType === "countries") {
        return [
          { name: "United States", color: "#4a4a4a" },
          { name: "Other", color: "#a3a3a3" },
        ];
      } else if (dataType === "ethnicities") {
        return [
          { name: "White", color: "#4a4a4a" },
          { name: "Other", color: "#a3a3a3" },
        ];
      } else if (dataType === "gender") {
        return [
          { name: "Men", color: "#4a4a4a" },
          { name: "Other", color: "#a3a3a3" },
        ];
      } else {
        return [
          { name: "College and Above", color: "#4a4a4a" },
          { name: "High School", color: "#a3a3a3" },
        ];
      }
    })();

    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 200}, 50)`);

    legend
      .selectAll("circle")
      .data(legendData)
      .enter()
      .append("circle")
      .attr("cx", 0)
      .attr("cy", (d, i) => i * 30)
      .attr("r", 10)
      .attr("fill", (d) => d.color);

    legend
      .selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", (d, i) => i * 30 + 5)
      .text((d) => d.name)
      .attr("font-size", "14px")
      .attr("fill", "#333");

    // After drawing legend, add takeaway message
    const takeaway = svg
      .append("g")
      .attr("transform", `translate(${width - 250}, ${height - 350})`);

    takeaway
      .append("rect")
      .attr("width", 230)
      .attr("height", "auto")
      .attr("rx", 12)
      .attr("ry", 12)
      .attr("fill", "rgba(255, 255, 255, 0.95)")
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1)
      .attr("filter", "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1))");

    const text = takeaway
      .append("text")
      .style("font-family", '"adobe-caslon-pro", serif')
      .style("font-size", "18px")
      .style("line-height", "1.4")
      .style("fill", "#333")
      .style("font-weight", "700")
      .style("text-anchor", "middle");

    // Split text into multiple lines if needed
    const words = getTakeawayMessage(dataType).split(" ");
    let line = "";
    let lineNumber = 0;
    const lineHeight = 28;

    words.forEach((word) => {
      const testLine = line + word + " ";
      if (testLine.length * 9 > 200) {
        text
          .append("tspan")
          .attr("x", 115)
          .attr("dy", lineNumber === 0 ? 35 : lineHeight)
          .text(line.trim());
        line = word + " ";
        lineNumber++;
      } else {
        line = testLine;
      }
    });
    text
      .append("tspan")
      .attr("x", 115)
      .attr("dy", lineNumber === 0 ? 35 : lineHeight)
      .text(line.trim());

    // Get the text bounding box and update the rectangle height
    const textBBox = text.node().getBBox();
    takeaway
      .select("rect")
      .attr("height", textBBox.height + 50)
      .attr("y", textBBox.y - 25);
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <svg id="bubble-chart" width={width} height={height}></svg>
    </div>
  );
};

export default BubbleChart;
