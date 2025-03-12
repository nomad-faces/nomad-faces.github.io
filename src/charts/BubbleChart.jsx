import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Icon1 from "../assets/Icon_1.png";
import Icon2 from "../assets/Icon_2.png";
import Icon3 from "../assets/Icon_3.png";
import Icon4 from "../assets/Icon_4.png";

const BubbleChart = ({ dataType }) => {
  const [data, setData] = useState([]);

  const width = 800;
  const height = 600;
  const gridSize = 10;
  const cellSize = 50;
  const iconSize = 30;
  const circleSize = 20;

  // Array of available icons
  const icons = [Icon1, Icon2, Icon3, Icon4];

  // Function to get random icon
  const getRandomIcon = () => {
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const countryData = [
    {
      name: "United States",
      Value: 44,
      color: "#e92838",
      group: "United States",
    },
    { name: "United Kingdom", Value: 7, color: "#7bc0ec", group: "Other" },
    { name: "Canada", Value: 5, color: "#7bc0ec", group: "Other" },
    { name: "Russia", Value: 5, color: "#7bc0ec", group: "Other" },
    { name: "Germany", Value: 4, color: "#7bc0ec", group: "Other" },
    { name: "France", Value: 3, color: "#7bc0ec", group: "Other" },
    { name: "Other", Value: 32, color: "#7bc0ec", group: "Other" },
  ];

  const ethnicityData = [
    { name: "White", Value: 59, color: "#e92838", group: "White" },
    { name: "Asian", Value: 13, color: "#7bc0ec", group: "Other" },
    { name: "Latin", Value: 12, color: "#7bc0ec", group: "Other" },
    { name: "Black", Value: 7, color: "#7bc0ec", group: "Other" },
    { name: "Indian", Value: 5, color: "#7bc0ec", group: "Other" },
    { name: "Middle Eastern", Value: 3, color: "#7bc0ec", group: "Other" },
    { name: "Pacific", Value: 1, color: "#7bc0ec", group: "Other" },
  ];

  const genderData = [
    { name: "Men", Value: 83, color: "#e92838", group: "Men" },
    { name: "Women", Value: 17, color: "#7bc0ec", group: "Other" },
  ];

  const educationData = [
    {
      name: "Bachelor's",
      Value: 53,
      color: "#e92838",
      group: "College and Above",
    },
    {
      name: "Master's",
      Value: 34,
      color: "#e92838",
      group: "College and Above",
    },
    { name: "PhD", Value: 3, color: "#e92838", group: "College and Above" },
    { name: "High School", Value: 10, color: "#7bc0ec", group: "High School" },
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
        return "Roughtly 3 out of 5 nomads are white.";
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
          x: col * cellSize + 70,
          y: row * cellSize + 70,
          icon: getRandomIcon(),
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

    // Create a group for each bubble
    const bubbleGroups = svg
      .selectAll("g.bubble")
      .data(data, (d) => d.x + "-" + d.y)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Add background circles
    bubbleGroups
      .append("circle")
      .attr("r", circleSize)
      .attr("fill", "transparent")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);

    // Add images
    bubbleGroups
      .append("image")
      .attr("xlink:href", (d) => d.icon)
      .attr("x", -iconSize / 2)
      .attr("y", -iconSize / 2)
      .attr("width", iconSize)
      .attr("height", iconSize)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);

    // Add tooltip behavior
    bubbleGroups
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

    // Draw Legend
    const legendData = (() => {
      if (dataType === "countries") {
        return [
          { name: "United States", color: "#e92838" },
          { name: "Other", color: "#7bc0ec" },
        ];
      } else if (dataType === "ethnicities") {
        return [
          { name: "White", color: "#e92838" },
          { name: "Other", color: "#7bc0ec" },
        ];
      } else if (dataType === "gender") {
        return [
          { name: "Men", color: "#e92838" },
          { name: "Women", color: "#7bc0ec" },
        ];
      } else {
        return [
          { name: "College and Above", color: "#e92838" },
          { name: "High School", color: "#7bc0ec" },
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
      .attr("transform", `translate(${width - 200}, ${height - 400})`);

    const takeawayBox = takeaway
      .append("rect")
      .attr("width", 180)
      .attr("height", 140)
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
      .style("font-weight", "700");

    // Split text into multiple lines if needed
    const words = getTakeawayMessage(dataType).split(" ");
    let line = "";
    let lineNumber = 0;
    const lineHeight = 28;
    const maxWidth = 160;

    words.forEach((word) => {
      const testLine = line + word + " ";
      const testWidth = testLine.length * 8;

      if (testWidth > maxWidth && line.length > 0) {
        text
          .append("tspan")
          .attr("x", 90)
          .attr("y", 45 + lineNumber * lineHeight)
          .attr("text-anchor", "middle")
          .text(line.trim());
        line = word + " ";
        lineNumber++;
      } else {
        line = testLine;
      }
    });

    text
      .append("tspan")
      .attr("x", 90)
      .attr("y", 45 + lineNumber * lineHeight)
      .attr("text-anchor", "middle")
      .text(line.trim());
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
