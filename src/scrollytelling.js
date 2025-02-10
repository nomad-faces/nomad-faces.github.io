import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./scrollytelling.css";
import background from "./nighthawk.jpg";


const ScrollamaDemo = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(null);
  
    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
      setCurrentStepIndex(data);
    };
  
    const fixedSection =
      currentStepIndex > 0
        ? {
            position: "fixed",
            top: "10%",
            transition: "opacity 1s ease",
          }
        : { display: "none" };
  
    return (
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        />
        <div className="container">
          <div className={"stickyHeader"}>
            <h1>The Faces of a Digital Nomad</h1>
          </div>
          <div className="scroll-section">
            <Scrollama offset={0.7} onStepEnter={onStepEnter} debug>
              <Step data={0}>
                <div className="step-container">
                  <div className="step-content">
                    <h2>Sunset</h2>
                    <p>
                    The sunset paints the sky with vivid hues as the day gracefully gives way to night
                    </p>
                  </div>
                </div>
              </Step>
  
              <Step data={1}>
                <div className="step-container">
                  <div className="step-content">
                    <h2>Dusk</h2>
                    <p>
                    At dusk, the light softens and the world is cloaked in a gentle, twilight glow.
                    </p>
                  </div>
                </div>
              </Step>
  
              <Step data={2}>
                <div className="step-container">
                  <div className="step-content">
                    <h2>Midnight</h2>
                    <p>
                    At midnight, the quiet darkness is punctuated by a tapestry of sparkling stars.
                    </p>
                  </div>
                </div>
              </Step>
            </Scrollama>
          </div>
          <div className="fixed-section" style={fixedSection}>
            <div>
              <h2>Fixed Content</h2>
              <p>Current step: {currentStepIndex}</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ScrollamaDemo;
