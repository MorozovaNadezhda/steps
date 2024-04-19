import React from 'react';

const Input = ({ value, onInput }) => {
  return <input type='text' value={value} onInput={onInput} />;
};

export default Input;
