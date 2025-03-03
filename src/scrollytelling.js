import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./scrollytelling.css";
import background from "./nighthawk.jpg";
import face from "./face.png";

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
          overflow: "scroll"
        }}
      />

      <div className="container">
        <div 
          className={`${
            currentStepIndex <= 3 
              ? "stickyHeader" 
              : "header-normal"
          }`}
          style={{
            opacity: currentStepIndex >= 3 ? 0 : 1,
            visibility: currentStepIndex >= 3 ? 'hidden' : 'visible'
          }}
        >
          <h1>The Faces of a Digital Nomad</h1>
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
                  <img src={face} alt="face1" className="face-image" />
                </div>
              </div>
            </Step>

            <Step data={1}>
              <div className="scroll-faces">
                <div className="face2">
                  <img src={face} alt="face2" className="face-image" />
                </div>
              </div>
            </Step>

            <Step data={2}>
              <div className="scroll-faces">
                <div className="face3">
                  <img src={face} alt="face3" className="face-image" />
                </div>
              </div>
            </Step>

            <Step data={3}>
              <div className="context-section">
                <div className="context-text">
                  <h1>Context Section</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </Step>

          </Scrollama>
        </div>

        {/* <div className="fixed-section" style={fixedSection}>
            <div>
              <h2>Fixed Content</h2>
              <p>Current step: {currentStepIndex}</p>
            </div>
          </div> */}
      </div>
    </>
  );
};

export default ScrollamaDemo;
