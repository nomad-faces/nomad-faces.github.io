import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Age = () => {
  const svgRef = useRef();

  const rawData = [
    { age: 20, percentage: 0.2 },
    { age: 22, percentage: 0.3 },
    { age: 23, percentage: 0.3 },
    { age: 24, percentage: 1.0 },
    { age: 25, percentage: 1.0 },
    { age: 26, percentage: 1.0 },
    { age: 27, percentage: 2.0 },
    { age: 28, percentage: 2.0 },
    { age: 29, percentage: 2.0 },
    { age: 30, percentage: 3.0 },
    { age: 31, percentage: 5.0 },
    { age: 32, percentage: 7.0 },
    { age: 33, percentage: 7.0 },
    { age: 34, percentage: 6.0 },
    { age: 35, percentage: 6.0 },
    { age: 36, percentage: 8.0 },
    { age: 37, percentage: 6.0 },
    { age: 38, percentage: 6.0 },
    { age: 39, percentage: 5.0 },
    { age: 40, percentage: 5.0 },
    { age: 41, percentage: 4.0 },
    { age: 42, percentage: 3.0 },
    { age: 43, percentage: 3.0 },
    { age: 44, percentage: 2.0 },
    { age: 45, percentage: 2.0 },
  ];

  // Create interpolated data points for smoother curve
  const interpolateData = () => {
    const result = [];
    for (let i = 0; i < rawData.length - 1; i++) {
      const current = rawData[i];
      const next = rawData[i + 1];
      result.push(current);

      // Only interpolate if there's a gap in ages
      if (next.age - current.age > 1) {
        const steps = next.age - current.age;
        for (let j = 1; j < steps; j++) {
          const t = j / steps;
          result.push({
            age: current.age + j,
            percentage: current.percentage * (1 - t) + next.percentage * t,
          });
        }
      }
    }
    result.push(rawData[rawData.length - 1]);
    return result;
  };

  const ageData = interpolateData();

  useEffect(() => {
    if (!svgRef.current) return;

    // Set up dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear any existing elements
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3.scaleLinear().domain([20, 45]).range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(ageData, (d) => d.percentage)])
      .range([innerHeight, 0]);

    // Create tooltip
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
      .style("font-family", '"adobe-caslon-pro", serif')
      .style("font-size", "14px");

    // Create the main group element
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create the area generator with monotone interpolation
    const area = d3
      .area()
      .x((d) => xScale(d.age))
      .y0(innerHeight)
      .y1((d) => yScale(d.percentage))
      .curve(d3.curveMonotoneX);

    // Create the line generator with monotone interpolation
    const line = d3
      .line()
      .x((d) => xScale(d.age))
      .y((d) => yScale(d.percentage))
      .curve(d3.curveMonotoneX);

    // Add the area path
    g.append("path")
      .datum(ageData)
      .attr("fill", "#4a4a4a")
      .attr("fill-opacity", 0.2)
      .attr("d", area);

    // Add the line path
    g.append("path")
      .datum(ageData)
      .attr("fill", "none")
      .attr("stroke", "#4a4a4a")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add interactive overlay points for the original data points
    g.selectAll("circle")
      .data(rawData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.age))
      .attr("cy", (d) => yScale(d.percentage))
      .attr("r", 4)
      .attr("fill", "#4a4a4a")
      .attr("opacity", 0)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 1);
        tooltip
          .style("visibility", "visible")
          .html(`Age: ${d.age}<br>Percentage: ${d.percentage}%`)
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 0);
        tooltip.style("visibility", "hidden");
      });

    // Add the x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat((d) => `${d}`)
          .ticks(10)
      )
      .style("font-family", '"adobe-caslon-pro", serif')
      .style("font-size", "14px");

    // Add the y-axis
    g.append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => `${d}%`)
          .ticks(5)
      )
      .style("font-family", '"adobe-caslon-pro", serif')
      .style("font-size", "14px");

    // Add x-axis label
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 10)
      .style("font-family", '"adobe-caslon-pro", serif')
      .style("font-size", "16px")
      .text("Age");

    // Add y-axis label
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -innerHeight / 2)
      .style("font-family", '"adobe-caslon-pro", serif')
      .style("font-size", "16px")
      .text("Percentage of Digital Nomads");

    // Add source text at the bottom right
    svg
      .append("text")
      .attr("x", width - 40)
      .attr("y", height - 2)
      .attr("text-anchor", "end")
      .style("font-family", '"adobe-caslon-pro", serif')
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("Data as of February 2025. Source: nomads.com");

    return () => {
      tooltip.remove(); // Cleanup tooltip when component unmounts
    };
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        margin: "20px auto",
        maxWidth: "900px",
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Age;
