import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import ethnicityData from "../datasets/ethnicity";

const BubbleChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 600;
    const margin = 10;

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const format = d3.format(",d");

    const pack = d3
      .pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(30);

    const root = pack(
      d3.hierarchy({ children: ethnicityData }).sum((d) => d.Value)
    );

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle");

    const node = svg
      .append("g")
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node.append("title").text((d) => `${d.data.Ethnicity}\n${format(d.value)}`);

    node
      .append("circle")
      .attr("fill-opacity", 0.7)
      .attr("fill", (d) => color(d.data.Ethnicity))
      .attr("r", (d) => d.r);

    node
      .append("text")
      .attr("dy", "0.3em")
      .text((d) => d.data.Ethnicity)
      .style("font-size", "12px")
      .style("fill", "white");
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default BubbleChart;
