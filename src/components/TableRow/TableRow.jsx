import React from 'react';

const TableRow = ({ date, distance, deleteItem }) => {
  return (
    <div className='table-row'>
      <p className='table-row__date'>{date}</p>
      <p className='table-row__distance'>{distance}</p>
      <button className='table-row__delete' onClick={() => deleteItem(date)}>
        ✘
      </button>
    </div>
  );
};

export default TableRow;
