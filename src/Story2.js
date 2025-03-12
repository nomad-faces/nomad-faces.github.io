import React from "react";
import "./story2.css";
import viz1 from "./assets/Miniviz_1.png";

const Story2 = () => {
  return (
    <div className="story2-container">
      <div className="top-section">
        <div className="intro-content-wrapper">
          <div className="intro-text">
            <p>
              Since 2019, Mexico City has recorded a 70% surge in U.S. citizens
              applying for or renewing their residency visas. In neighborhoods
              like Roma Norte and Condesa, the large influx of remote American
              workers has led to landlords prioritizing wealthier foreign
              tenants, displacing long-term residents whose wages cannot keep
              pace with the rising cost of living.
              <br />
              <br />
              The same pattern has emerged in economically-vulnerable countries
              across the world, from European destinations such as Portugal and
              Greece, to South-East Asian hotspots like Indonesia, Vietnam, and
              Thailand.
            </p>
          </div>
          <div className="intro-image">
            <img
              src={
                viz1
              } 
              alt="Housing effect visualization"
              className="intro-viz"
            />
          </div>
        </div>
      </div>

      <div className="main-content">
        <p className="article-text">
          However, beyond the shifting economic landscape lies a more nuanced
          problem: cultural erasure. Unlike long-term immigrants, digital nomads
          or expats exist in a state of impermanence, often staying just long
          enough to experience a place without fully integrating into its
          cultural fabric. While their mobility allows them to immerse
          themselves in local customs, it also enables a selective engagement —
          participating in aspects of a culture that appeal to them while
          avoiding deeper social or historical contexts.
          <br />
          <br />
          In areas that serve as digital nomad hubs, many long-standing cultural
          aspects — festivals, cuisines, architecture, or communal practices —
          are often curated to fit the preferences and lifestyles of the
          wealthier, transient residents. In Bali, Indonesia — one of the
          long-standing favorites for nomads — almost the entire stretch of the
          island's coastline has been gentrified to be lined with modern, luxury
          villa rentals that exclusively cater to affluent foreigners while
          mimicking Balinese architecture for aesthetic appeal.
          <br />
          <br />
          The linguistic shift of locals from native languages to English has
          also had broader implications, subtly reshaping social dynamics and
          economic opportunities as traditional dialects and cultural
          expressions fade from daily life. For many locals around the world,
          these changes have created a sense of detachment from their own
          cities, according to Magaloni. "While their original cultural and
          social identity is not erased outright, it is gradually marginalized
          in favor of a more globally palatable version," Magaloni said.
        </p>

        <div className="header-container">
          <h1 className="headline">
            Solutions for a sustainable nomad economy
          </h1>
        </div>
        <div className="text-container">
          <p className="body-text">
            In the years following the digital nomad boom due to the COVID-19
            pandemic, governments have faced the challenge of managing its
            impact in a way that encourages sustainable coexistence with local
            communities. Some cities have already begun implementing measures to
            preserve their cultural identity while still accommodating the
            benefits of global mobility.
            <br />
            <br />
            In 2023, the Portuguese government imposed a freeze on new
            short-term rental permits to curb the displacement of local
            residents in urban districts near Lisbon. In cities like Chiang Mai
            and Barcelona, initiatives to preserve historic districts have been
            introduced to prevent over-commercialization.
            <br />
            <br />
            As of 2025, over 50 countries have implemented digital nomad visas
            that require remote workers to meet certain income thresholds and
            contribute to local social security systems. In addition, local
            campaigns have called for these initiatives to include a digital
            nomad tax that would fund local services and ensure that those who
            benefit from global mobility also contribute to the sustainability
            of the places they choose to reside in.
            <br />
            <br />
            Yet, being reliant on stricter policies deflects the responsibility
            from the digital nomads, who to an extent, should hold themselves
            accountable for adopting more sustainable practices.
            <br />
            <br />
            For digital nomads to truly embrace their role as global citizens,
            they must acknowledge the disparity in how mobility is perceived and
            experienced by different groups. In doing so, they can take
            responsibility for their impact and actively work toward adopting
            more sustainable practices.
            <br />
            <br />
            Ultimately, an ethical nomad economy requires not only policy
            adjustments but also personal accountability. It's essential that
            remote workers recognize the significance of affordability—not as a
            temporary perk, but as the foundation of someone else's home.
            Policies should not only accommodate digital nomads but also
            safeguard the well-being of local communities. As digital nomadism
            evolves, it must shift from a pursuit of individual gain to a more
            equitable system that considers the long-term consequences of global
            movement.
            <br />
            <br />
            The responsibility lies not only with governments and cities but
            with digital nomads themselves. Beyond policies and regulations, it
            is the duty of those who benefit from global mobility to integrate
            more sustainable practices into their way of living.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story2;
