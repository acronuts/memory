import React from "react";
import PropTypes from "prop-types";
import Card from "../card";

import "./styles.css";

const Board = ({ solved, disabled, cards, flipped, handleClick }) => {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          type={card.type}
          flipped={flipped.includes(card.id)}
          handleClick={handleClick}
          disabled={disabled || solved.includes(card.id)}
          solved={solved.includes(card.id)}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  disabled: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Board;
