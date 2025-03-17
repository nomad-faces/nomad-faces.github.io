import React, { useState } from "react";
import "./cards.css";
import Card1 from "./Assets/Card_1.png";
import Card2 from "./Assets/Card_2.png";
import Card3 from "./Assets/Card_3.png";

function Cards() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClick = (index) => {
    setSelectedCard(index);
  };

  const closeOverlay = () => {
    setSelectedCard(null);
  };

  const cards = [Card1, Card2, Card3];

  // Card content for each overlay
  const cardContent = [
    {
      title: "Allen",
      text: 'Allen was drawn to Lisbon, Portugal, for its balance of pace and personality. His rental sits in Alfama, a neighborhood of winding alleyways through pastel-colored buildings and century-old cafés. For Allen, Lisbon offers something rare: a lifestyle that feels both fluid and rooted.\n\nOriginally from Denver, Colorado, Allen first became a digital nomad in 2018, well before remote work was mainstream. As a freelance video editor and daytime trader, he earned enough to live comfortably in cities across Southeast Asia, Western Europe, and Latin America. When the pandemic hit and remote work surged, Allen watched the movement expand rapidly. Cities like Lisbon, once known for their laid-back creative communities, saw an influx of high-earning remote workers.\n\nFor a little over a year Allen has lived as part of a subscription-based housing collective in Lisbon — a model designed for remote workers like him. The arrangement offers flexibility without the isolation he once felt in short-term rentals. Here, his neighbors are other freelancers, entrepreneurs, and digital nomads, many moving between countries on loose schedules. "It\'s transient," he says, "but there\'s a sense of community in the flux."',
    },
    {
      title: "Jade",
      text: "Jade arrived in Bali, Indonesia, six months ago, settling in Canggu — a coastal hub where motorbikes weave past juice bars, surf shops, and beach clubs packed with foreign visitors. Originally from Montreal, Canada, she had spent the previous four years drifting between South Africa, Thailand, and Sri Lanka, supported by her parents as she navigated life as a recent graduate working in brand marketing.\n\n In Bali, she found her calling. Currently, she’s training to become a yoga instructor, building a growing clientele of remote workers and tourists drawn to the island’s expansive wellness scene. On most mornings, she leads yoga and meditation sessions on the beach, weaving in lessons on holistic living and sustainability — ideas she picked up while learning about Balinese culture in her short time there. \n\n Jade believes she’s an ethical traveler — someone who strives to connect with the place she’s in rather than just pass through it. Yet, she’s aware of the contradictions. She lives in a hostel that doubles as a co-working space, where nomads pay up to 15 USD per day for Wi-Fi — more than what many locals earn through their daily wages. For now, Jade says she’s trying to find her balance — to integrate herself in the culture while acknowledging the privilege that shapes her experience of it.",
    },
    {
      title: "Sam",
      text: "Born in Manchester, UK, Sam spent much of his childhood moving between countries — with his parents’ work as expatriates keeping his family on the move. That sense of mobility stuck with him, shaping his path as an adult. Now, Sam splits his time between the UK and Mexico, spending the colder, rain-soaked months abroad.\n\n After a few years of working as a software developer, Sam made a late shift into design — a move that gave him greater creative freedom and the flexibility to work remotely. Mexico City was the natural choice since his parents own a property that he could use to budget for his travel. The city’s appeal, too, was undeniable — affordable living costs, a thriving creative scene, and a steady flow of young professionals just like him. \n\n For Sam, the digital nomad lifestyle has been a win-win. As a history enthusiast, the flexibility to work from anywhere has allowed him to pursue his curiosity as a traveler, weaving time for museums and cultural landmarks into his schedule. He hopes to deepen that experience by learning Spanish — which he hopes will help him explore more of Central and Latin America in the coming years.",
    },
  ];

  return (
    <>
      <div
        className={`cards-container ${
          selectedCard !== null ? "popup-active" : ""
        }`}
      >
        <div className="cards-row">
          {cards.map((card, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleClick(index)}
            >
              <img
                src={card}
                alt={`Card ${index + 1} front`}
                className="card-image"
              />
            </div>
          ))}
        </div>

        {selectedCard !== null && (
          <div className="overlay-card">
            <button className="close-btn" onClick={closeOverlay}>
              Close
            </button>
            <h2 className="overlay-title">{cardContent[selectedCard].title}</h2>
            <div className="overlay-text">
              {cardContent[selectedCard].text
                .split("\n\n")
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-container" style={{ marginTop: "2rem" }}>
        <p className="body-text">
          <span className="centered-text">
            Click on a face to learn their story.
          </span>
          <br />
          <br />
          The stories of Allen, Jade, and Sam reflect a broader reality about
          digital nomadism — one shaped heavily by privilege. Their ability to
          live and work abroad is closely tied to factors like nationality,
          ethnicity, income, and social mobility. Meanwhile, the same economic
          advantage that enables digital nomads to thrive can unintentionally
          strain local communities, widening gaps in affordability and access.
          For now, global mobility remains far from equal.
        </p>
      </div>
    </>
  );
}

export default Cards;
