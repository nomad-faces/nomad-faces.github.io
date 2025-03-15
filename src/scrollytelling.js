import React, { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./scrollytelling.css";
import background from "./Assets/Illustration_1.jpg";
import face1 from "./Assets/Icon_1.png";
import face2 from "./Assets/Icon_2.png";
import face3 from "./Assets/Icon_3.png";

const ScrollamaDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const onStepProgress = ({ progress, step }) => {
    setProgress(progress);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          overflow: "scroll",
        }}
      />

      <div className="container">
        <div
          className={`${
            currentStepIndex <= 3 ? "stickyHeader" : "header-normal"
          }`}
          style={{
            opacity: currentStepIndex >= 3 ? 0 : 1,
            visibility: currentStepIndex >= 3 ? "hidden" : "visible",
          }}
        >
          <h1>The Faces of a Modern Nomad</h1>
          <p>By Eden Hadar, Sunny Sun, and Bhabna Banerjee</p>
        </div>
        <div className="scroll-section">
          <Scrollama
            offset={0.8}
            onStepEnter={onStepEnter}
            onStepProgress={onStepProgress}
          >
            <Step data={0}>
              <div className="scroll-faces">
                <div className="face1">
                  <img src={face1} alt="face1" className="face-image" />
                </div>
              </div>
            </Step>

            <Step data={1}>
              <div className="scroll-faces">
                <div className="face2">
                  <img src={face2} alt="face2" className="face-image" />
                </div>
              </div>
            </Step>

            <Step data={2}>
              <div className="scroll-faces">
                <div className="face3">
                  <img src={face3} alt="face3" className="face-image" />
                </div>
              </div>
            </Step>

            <Step data={3}>
              <div
                className="context-section"
                style={{
                  opacity: 0,
                  visibility: "hidden",
                  height: "1%",
                }}
              ></div>
            </Step>
          </Scrollama>
        </div>
      </div>
    </>
  );
};

export default ScrollamaDemo;
