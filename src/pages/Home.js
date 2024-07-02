import React from 'react';
import Poems from '../components/Poems';
import Header from '../components/Header';
import '../App.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Home() {

  const history = useHistory ();

  function handleClick(e){
    e.preventDefault();
    history.push('/about')
}

  return (
    <div className="App">
      <Header />
      <button className='about-btn' onClick={handleClick}>WHAT AM I</button>
      <Poems />
    </div>
  );
}
