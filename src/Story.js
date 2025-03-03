import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./story.css";

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
    <div>
      <div className="header-container">
        <h1 className="headline">The Digital Nomad Dilemma</h1>
      </div>
      <div className="text-container">
        <p className="body-text">
          In Roma Norte, Mexico City, Magaloni describes walking past cafés filled
          with expatriates, catching occasional bursts of Spanish amid the English
          conversations. The streets too, feel strikingly unfamiliar — fusion
          restaurants serving a polished blend of Mexican and American flavors,
          boutique gyms advertising reformer Pilates, and co-working spaces
          overflowing with hot desks and the scent of oat milk lattes. Once a hub of
          working-class families and small family-run shops, this neighborhood is
          now a playground for the globally mobile, where prices almost mirror
          cities such as New York or San Francisco.
          <br />
          <br />
          The digital nomad boom, often
          hailed as a revolution in work-life balance, has become a growing force
          accelerating economic displacement. By earning in stronger currencies
          while spending in weaker ones, digital nomads have inadvertently driven up
          the cost of living, pricing out locals, altering housing markets, and
          shifting the economic landscape to cater to short-term, high-spending
          visitors rather than long-term residents.
        </p>
      </div>
    </div>
  );
};

export default ScrollamaDemo;
