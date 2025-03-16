import React from "react";
import "./scrollytelling.css";
import background from "./Assets/Illustration_1.JPG";

const ScrollamaDemo = () => {
  return (
    <div className="scrollytelling-wrapper">
      <img
        src={background}
        alt="Header Illustration"
        className="header-image"
      />

      <div className="title-container">
        <h1>The Faces of a Modern Nomad</h1>
        <p>By Eden Hadar, Sunny Sun, and Bhabna Banerjee</p>
      </div>
    </div>
  );
};

export default ScrollamaDemo;
