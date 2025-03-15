import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./story.css";
import illustration2 from "./Assets/Illustration_2.jpg";

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
        <img
          src={illustration2}
          alt="Story Illustration"
          className="header-illustration"
        />
        <h1 className="headline">A New Wave of Gentrification</h1>
      </div>
      <div className="text-container">
        <p className="body-text">
          In Roma Norte, Mexico City-native Emilia Magaloni describes walking
          past cafés filled with expatriates, catching occasional bursts of
          Spanish amid the English conversations. The streets too, feel
          unfamiliar to how she remembers the neighborhood — fusion restaurants
          now serving a polished blend of Mexican and American flavors, boutique
          gyms advertising reformer Pilates, and co-working spaces overflowing
          with hot desks and the scent of oat milk lattes. Once a hub of
          working-class families and family-run shops, Roma Norte, and Mexico
          City at-large, is now a playground for the globally mobile, where
          prices almost mirror cities such as New York or San Francisco.
          <br />
          <br />
          The digital nomad boom, once hailed as a revolution in work-life
          balance, is fast becoming a growing force accelerating economic
          displacement. By earning in stronger currencies while spending in
          weaker ones, digital nomads are fast driving up the cost of living,
          pricing out locals and shifting the economic landscape to cater to
          short-term, high-spending visitors rather than long-term residents.
          <br />
          <br />
          According to Magaloni, the disproportionate purchasing power of nomads
          can significantly influence local economies, often to the detriment of
          the very communities that make these destinations desirable.
        </p>
      </div>
    </div>
  );
};

export default ScrollamaDemo;
