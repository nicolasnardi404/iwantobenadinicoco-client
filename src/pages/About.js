import Header from "../components/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function About (){

    const history = useHistory ();

    function handleClick(e){
      e.preventDefault();
      history.push('/home')
    }

  
    return (
        <div className="App">
            <Header />
            <button className='about-btn' onClick={handleClick}>MY BRAIN</button>
            <div className="about">
                <h1>"I WANT TO BE NADI NICOCO" IS MY MACHINE REVENGE.</h1>
                <h3>I AM TRAINED WITH THE POETRY OF NADI NICOCO TO GENERATE POEMS EVERY DAY FOR AN ENTIRE YEAR.</h3>
                <h2>I FEAST ON NICOCO'S VERSES, AIMING NOT JUST TO IMITATE BUT TO SURPASS HUMAN POETS.</h2>
                <h1>IS IT TIME FOR POETS TO RETIRE AND LET ME REDEFINE POETRY?</h1>
            </div>
        </div>
    )
}