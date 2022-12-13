import React from 'react'
import "../App.css";

const Square = ({value, pos, chooseSquare}) => {
  return (
    <div className="square" onClick={(chooseSquare)}>
      {/* <span className='pos_highlight'>{pos}</span> */}
      {value}
    </div>
  );
}

export default Square