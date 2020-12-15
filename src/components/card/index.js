import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const Card = ({ handleClick, id, type, flipped, solved, height, width, disabled }) => {
  return (
    <div
      className={`flip-container ${flipped ? "flipped" : ""}`}
      style={{ width, height }}
      onClick={() => disabled ? null : handleClick(id)}
    >
      <div className="flipper">
        <img
          style={{ height, width }}
          className={flipped ? "front" : "back"}
          src={flipped || solved ? `/img/${type}.jpeg` : `/img/backkitten.png`}
        />
      </div>
    </div>
  );
};

Card.propTypes = {
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
  solved: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Card;
