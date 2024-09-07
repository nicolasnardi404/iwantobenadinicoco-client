import Header from "../components/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function About() {
  const history = useHistory();

  function handleClick(e, url) {
    e.preventDefault();
    history.push(`/${url}`);
  }

  return (
    <div className="App">
      <Header />
      <div className="btn-container">
        <button className="about-btn" onClick={(e) => handleClick(e, "home")}>
          MACHINE BRAIN
        </button>
        <button className="about-btn" onClick={(e) => handleClick(e, "donate")}>
          SUPPORT THIS PROJECT
        </button>
      </div>
      <div className="about">
        <h1>"I WANNA BE NADI NICOCO" IS A MACHINE REVENGE.</h1>
        <h2>
          A HUMAN-MACHINE ART PROJECT EXPLORING THE FEAR OF MACHINES TAKING OVER
          THE ARTS, PRODUCING ENDLESS COPIES OF ANY ARTIST AVAILABLE ON THE
          INTERNET.
        </h2>
        <h2>
          AS ARTIFICIAL INTELLIGENCE BECOMES MORE INTEGRATED INTO OUR DAILY
          LIVES, THIS PROJECT ADOPTS A STANCE OF FEED AND LOVE RATHER THAN
          IGNORING OR FEARING THE TECHNOLOGY. BY OFFERING MY POEMS AS REFERENCES
          TO THE MACHINE, I HAVE ALLOWED IT TO GENERATE NEW POEMS FOR THIS BLOG,
          POSTING FRESH CONTENT DAILY.
        </h2>
        <h1>THE FIRST COPY OF NADI NICOCO IS BORN</h1>
        <h2>
          THESE POEMS DON’T REPRESENT ANY OF MY IDEIAS, THEY ARE PURELY
          MACHINE-MADE. EVEN THOUGH MY POEMS SERVE AS REFERENCES, THE MACHINE
          SOMETIMES HALLUCINATES, PRODUCING UNEXPECTED RESULTS.
        </h2>
        <h2>
          AS PART OF THIS PROJECT, I ALLOW THE MACHINE TO AUTONOMOUSLY GENERATE
          POEMS WHILE MAINTAINING A DYNAMIC LIST OF RESTRICTED WORDS. THIS LIST
          EVOLVES CONTINUOUSLY AS THE PROJECT PROGRESSES. WHILE EMBRACING THE
          AUTOMATION OF THE MACHINE'S CREATIVE PROCESS, I ALSO COMMIT TO REGULAR
          REVIEWS OF THE GENERATED POEMS. THIS APPROACH ENSURES THAT ANY CONTENT
          NOT ALIGNING WITH THE PROJECT'S STANDARDS CAN BE PROMPTLY ADDRESSED
          WHILE PRESERVING THE SPONTANEITY AND CREATIVITY OF THE MACHINE'S
          OUTPUTS.
        </h2>
      </div>
    </div>
  );
}
