import React, { useEffect, useState } from "react";
import Board from "./components/board";
import useSound from 'use-sound';
import initializeDeck from "./deck";

import "./App.css";

function App() {
  const [flipped, setFlipped] = useState([]);
  const [cards, setCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  useEffect(() => {
    preloadImages();
  }, [cards]);

  const [flipSound] = useSound('./sounds/card-flip.wav')
  const [shuffleSound] = useSound('./sounds/card-shuffle.wav')
  const [dingSound] = useSound('./sounds/ding.wav')

  const handleClick = (id) => {
    flipSound()
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        dingSound()
        setSolved([...solved, flipped[0], id]);
        resetCards();
      } else {
        setTimeout(resetCards, 1000);
      }
    }
  };

  const handleRestart = () => {
    shuffleSound()
    setTimeout(function() {
      setSolved([]);
      setCards(initializeDeck());
      resetCards();
    }, 1500)
  };

  const preloadImages = () => {
    cards.map((card) => {
      const src = `/img/${card.type}.jpeg`;
      new Image().src = src;
    });
  };

  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  

  console.log(cards.length)
  console.log(solved.length)

  return (
    <div className="app">
      <div className="header">
        <h1>Kitten Memory</h1>
      </div>
      <Board
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default App;
