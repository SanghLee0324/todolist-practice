import React, { useState, useCallback } from 'react';
import './App.css';
import Lists from './components/Lists';
import Form from './components/Form';

export default function App() {
  const initialTodoData = localStorage.getItem('todoData')
    ? JSON.parse(localStorage.getItem('todoData'))
    : [];

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState([]);

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  };

  const handleClick = useCallback(
    (id) => {
      const newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
    },
    [todoData],
  );

  const handleSubmit = (e) => {
    // form 안에 input을 submit할 때 페이지 리로드 막아주는 함수
    e.preventDefault();

    // 새로운 할 일 데이터 뭉치를 일단 만들어 줌. newTodo 변수에 담아서
    const newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 기존의 할 일 목록에 새로운 할 일 데이터 뭉치를 추가로 업데이트 해주고 + input창에 적힌 글자는 빈값으로 지워주기
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue('');
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>

        <Lists
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
