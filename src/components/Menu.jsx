import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

const propTypes = {
  passive: PropTypes.bool,
  hidden: PropTypes.bool,
};

const defaultProps = {
  passive: false,
  hidden: false,
};

/**
 * TODO: Create menu context to handle open, passive and
 * hidden states.
 * Think of a way to handle a change in children (aka after loader finished)
 */
const Menu = ({ children, passive, hidden }) => {
  const [isHidden, setIsHidden] = useState(!!hidden);
  const handleClick = useCallback(() => {
    setIsHidden(!isHidden);
  }, [isHidden, setIsHidden]);
  return (
    <div
      className={`fixed bg-green-300 rounded-lg inset-4 shadow-2xl flex flex-col justify-center items-center transform ease-out duration-500 ${
        isHidden
          ? "top-11/12 -bottom-11/12"
          : passive
          ? "top-3/4 -bottom-3/4"
          : "top-8"
      }`}
    >
      {passive && (
        <button
          onClick={handleClick}
          className={`w-1/2 top-4 absolute flex items-center justify-center rounded-md border border-gray-100 text-gray-100 transform ease-out duration-1000 opacity-0 ${
            (passive || isHidden) && "opacity-100"
          }`}
          type="button"
        >
          {isHidden ? "SHOW" : "HIDE"}
        </button>
      )}
      {children}
    </div>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
