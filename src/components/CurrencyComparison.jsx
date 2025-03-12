import React, { useEffect, useState } from "react";

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

const CurrencyComparison = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Note: Replace 'YOUR_API_KEY' with your actual API key from exchangerate-api.com
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/b396df306de672f7e9d92cfe/latest/USD"
        );
        const data = await response.json();
        setRates(data.conversion_rates);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch currency rates");
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) return <div>Loading currency data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="currency-comparison">
      <h3>Currency Exchange Rates</h3>
      <div className="currency-grid">
        {Object.entries(currencyMap).map(([country, currency]) => (
          <div key={country} className="currency-item">
            <div className="country-name">{country}</div>
            <div className="exchange-rate">
              1 USD = {rates[currency]?.toFixed(2)} {currency}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .currency-comparison {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          margin: 20px;
        }

        h3 {
          margin: 0 0 20px 0;
          color: #333;
          font-family: "adobe-caslon-pro", serif;
        }

        .currency-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .currency-item {
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          transition: transform 0.2s;
        }

        .currency-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .country-name {
          font-weight: 600;
          color: #4a4a4a;
          margin-bottom: 5px;
        }

        .exchange-rate {
          color: #666;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};

export default CurrencyComparison;
