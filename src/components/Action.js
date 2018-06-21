import React from 'react';

const Action = (props) => {
  return (
    <div>
      <button
        className="big-button"
        onClick={props.handlePick}
        disabled={!props.hasOptions}>React, Node, Express, MongoDB ?
        </button>
    </div>
  );
}

export default Action;