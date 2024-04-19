import React from 'react';
import TableRow from '../TableRow';

const Table = ({ data, deleteItem }) => {
  return (
    <div className='table'>
      {data &&
        data.map((dataItem) => (
          <TableRow
            date={dataItem.date}
            distance={dataItem.distance}
            deleteItem={deleteItem}
          />
        ))}
    </div>
  );
};

export default Table;
