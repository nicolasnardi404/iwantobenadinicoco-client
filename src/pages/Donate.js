import React, { useEffect } from "react";
import Header from "../components/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Donate() {
  const history = useHistory();

  function handleClick(e, url) {
    e.preventDefault();
    history.push(`/${url}`);
  }

  useEffect(() => {
    // Load Stripe's Buy Button script dynamically
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="btn-container">
        <button className="about-btn" onClick={(e) => handleClick(e, "home")}>
          MACHINE BRAIN
        </button>
        <button className="about-btn" onClick={(e) => handleClick(e, "about")}>
          WHAT I AM AI
        </button>
      </div>
      <div className="about donate">
        <h1>"I WANNA BE NADI NICOCO" IS AN INDEPENDENT PROJECT</h1>
        <h2>YOUR SUPPORT HELPS KEEP THIS AND OTHER PROJECTS ALIVE</h2>
        <h3>
          IF YOU'RE INTERESTED IN EXPLORING OTHER PROJECTS FROM OUR COLLECTIVE,
          CHECK OUT:
        </h3>
        <a
          href="https://www.randomrainbow.art"
          target="_blank"
          rel="noopener noreferrer"
        >
          RANDOM RAINBOW - queer video art platform
        </a>
        <br></br>
        <a
          href="https://www.nadinicoco.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          NADI NICOCO - artist
        </a>
        <br></br>
        <a
          href="https://www.quartoambiente.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          QUARTO AMBIENTE - brazilian collective
        </a>
        <br></br>
        {/* Stripe Buy Button */}
        <stripe-buy-button
          buy-button-id="buy_btn_1PwQaD09kQaCl5xpu4ZIwHKA"
          publishable-key="pk_live_51PwO6M09kQaCl5xpiYwXWc1lE6JSVV8H6a08o0HtO27vHyCP4IKSjxIHAs6HfsW90hdfBB7vMBzpWTO4AXmm6gOP003CShheae"
        ></stripe-buy-button>
      </div>
    </div>
  );
}
