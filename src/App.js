import { useState } from 'react';
import Input from './components/Input';
import Table from './components/Table';

function App() {
  const [dateInputValue, setDateInputValue] = useState('');
  const [kmInputValue, setKmInputValue] = useState('');
  const [data, setData] = useState([]);

  const toggleDateInput = (e) => {
    let input = e.target;
    let value = input.value.replace(/\D/g, '').substring(0, 6);
    if (value.length > 2 && value.length <= 4) {
      value = value.substring(0, 2) + '.' + value.substring(2);
    } else if (value.length > 4) {
      value =
        value.substring(0, 2) +
        '.' +
        value.substring(2, 4) +
        '.' +
        value.substring(4);
    }

    setDateInputValue(value);
  };
  const toggleKmInput = (e) => setKmInputValue(e.target.value);

  function parseDate(dateString) {
    var parts = dateString.split('.');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  const submitForm = (e) => {
    e.preventDefault();

    if (!dateInputValue || !kmInputValue) return;

    const dataItem = { date: dateInputValue, distance: kmInputValue };

    const findedDataItem = data.find(
      (dataItem) => dataItem.date === dateInputValue
    );

    if (findedDataItem) {
      const newData = [...data];
      const findedDataItemIdx = newData.findIndex(
        (newDataItem) => newDataItem.date === dateInputValue
      );
      newData[findedDataItemIdx].distance =
        +newData[findedDataItemIdx].distance + +kmInputValue;
      setData(
        newData.sort(function (a, b) {
          var dateA = parseDate(a.date);
          var dateB = parseDate(b.date);
          return dateB - dateA;
        })
      );
    } else {
      setData(
        [...data, dataItem].sort(function (a, b) {
          var dateA = parseDate(a.date);
          var dateB = parseDate(b.date);
          return dateB - dateA;
        })
      );
    }
    e.target.reset();
    setDateInputValue('');
    setKmInputValue('');
  };

  const deleteItem = (date) => {
    setData(
      data
        .filter((dateItem) => dateItem.date !== date)
        .sort(function (a, b) {
          var dateA = parseDate(a.date);
          var dateB = parseDate(b.date);
          return dateB - dateA;
        })
    );
  };

  return (
    <form className='App' onSubmit={submitForm}>
      <div className='app__row'>
        <label>
          Дата (ДД.ММ.ГГ)
          <Input value={dateInputValue} onInput={toggleDateInput} />
        </label>
        <label>
          Пройдено км
          <Input value={kmInputValue} onInput={toggleKmInput} />
        </label>
        <button className='app__btn'>ОК</button>
      </div>
      <div className='app__table-row'>
        <p>Дата (ДД.ММ.ГГ)</p>
        <p>Пройдено км</p>
        <p>Действия</p>
      </div>
      <Table data={data} deleteItem={deleteItem} />
    </form>
  );
}

export default App;
