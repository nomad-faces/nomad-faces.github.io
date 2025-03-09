import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import worldGeoJSON from "../datasets/countries.geo.json";

const currencyMap = {
  "United States": "USD",
  Spain: "EUR",
  Thailand: "THB",
  "United Kingdom": "GBP",
  Germany: "EUR",
  Mexico: "MXN",
  France: "EUR",
  Italy: "EUR",
  Portugal: "EUR",
  Indonesia: "IDR",
};

const mostVisitedCountries = [
  "United States",
  "Spain",
  "Thailand",
  "United Kingdom",
  "Germany",
  "Mexico",
  "France",
  "Italy",
  "Portugal",
  "Indonesia",
];

const width = window.innerWidth * 0.8;
const height = 500;

const NomadMap = () => {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  const fetchExchangeRate = async (country) => {
    const currency = currencyMap[country];
    if (!currency || currency === "USD") {
      setExchangeRate(null);
      return;
    }

    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/b396df306de672f7e9d92cfe/latest/USD`
      );
      const data = await response.json();
      setExchangeRate({
        rate: data.conversion_rates[currency],
        currency: currency,
      });
    } catch (err) {
      console.error("Failed to fetch exchange rate:", err);
      setExchangeRate(null);
    }
  };

  useEffect(() => {
    const projection = d3
      .geoNaturalEarth1()
      .fitSize([width, height], worldGeoJSON);
    const path = d3.geoPath().projection(projection);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "rgba(255, 255, 255, 0.5)")
      .style("backdrop-filter", "blur(3px)");

    const g = svg.append("g");

    g.selectAll("path")
      .data(worldGeoJSON.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) =>
        mostVisitedCountries.includes(d.properties.name) ? "#6BBF8B" : "#FFFFFF"
      )
      .attr("stroke", "#4a4a4a")
      .attr("stroke-width", 1.5)
      .on("click", function (event, d) {
        if (mostVisitedCountries.includes(d.properties.name)) {
          if (isZoomed) {
            g.transition()
              .duration(750)
              .attr("transform", "translate(0,0) scale(1)");
            setIsZoomed(false);
            setTooltip(null);
            setExchangeRate(null);
          } else {
            fetchExchangeRate(d.properties.name);
            setTooltip({
              x: event.clientX,
              y: event.clientY,
              country: d.properties.name,
            });

            const bounds = path.bounds(d);
            const dx = bounds[1][0] - bounds[0][0];
            const dy = bounds[1][1] - bounds[0][1];
            const padding = 200;

            const scale = 0.8 / Math.max(dx / width, dy / height);
            const translate = [
              (width - scale * (bounds[1][0] + bounds[0][0])) / 2,
              (height - scale * (bounds[1][1] + bounds[0][1])) / 2,
            ];

            g.transition()
              .duration(750)
              .attr(
                "transform",
                `translate(${translate[0]},${translate[1]}) scale(${scale})`
              );
            setIsZoomed(true);
          }
        }
      });
  }, []);

  return (
    <div>
      <div style={{ position: "relative", width: width, margin: "0 auto" }}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ borderRadius: "10px" }}
        ></svg>
        {tooltip && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              minWidth: "300px",
              maxWidth: "400px",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ margin: 0 }}>{tooltip.country}</h3>
              <button
                onClick={() => {
                  const g = d3.select(svgRef.current).select("g");
                  g.transition()
                    .duration(750)
                    .attr("transform", "translate(0,0) scale(1)");
                  setIsZoomed(false);
                  setTooltip(null);
                  setExchangeRate(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "0 8px",
                  color: "#666",
                }}
              >
                ×
              </button>
            </div>
            <div style={{ color: "#666" }}>
              {exchangeRate ? (
                <div style={{ marginBottom: "15px" }}>
                  <div
                    style={{
                      fontSize: "1.1em",
                      fontWeight: "600",
                      color: "#4a4a4a",
                      marginBottom: "5px",
                    }}
                  >
                    Currency Exchange Rate
                  </div>
                  <div
                    style={{
                      padding: "10px",
                      background: "#f8f8f8",
                      borderRadius: "6px",
                      display: "inline-block",
                    }}
                  >
                    1 USD = {exchangeRate.rate.toFixed(2)}{" "}
                    {exchangeRate.currency}
                  </div>
                </div>
              ) : tooltip.country === "United States" ? (
                <div style={{ marginBottom: "15px" }}>Base currency: USD</div>
              ) : (
                <div style={{ marginBottom: "15px" }}>
                  Loading exchange rate...
                </div>
              )}
              <p>
                This is a sample description for {tooltip.country}. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NomadMap;
