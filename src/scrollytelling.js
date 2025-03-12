import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./scrollytelling.css";
import background from "./assets/Illustration_1.JPG";
import face1 from "./assets/Icon_1.png"; /* Fix the import path by using relative path */
import face2 from "./assets/Icon_2.png";
import face3 from "./assets/Icon_3.png";

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

            {/* <Step data={3}>
              <div className="context-section">
                <div className="context-text">
                  <h1>Context Section</h1>
                  <p>
                    The lack of diversity within the digital nomad community has
                    significant consequences. Wealthier nomads from advanced
                    economies often have the power to shape local markets and
                    cultural spaces to fit their preferences, driving up costs
                    and displacing local identity and communities. Largely
                    composed of individuals from privileged backgrounds, the
                    economic benefits of remote work remain concentrated among
                    those already positioned to succeed. Without greater
                    inclusion, does this growing movement further reinforce
                    global inequalities?
                  </p>
                </div>
              </div>
            </Step> */}
          </Scrollama>
        </div>
      </div>
    </>
  );
};

export default ScrollamaDemo;
