import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

export default React.memo(function Lists({
  todoData,
  setTodoData,
  handleClick,
}) {
  const handleEnd = (result) => {
    // 목적지가 없는 경우 이 함수를 종료하기 (드래그 앤 드롭으로 결과가 바뀌지 않은 상황)
    if (!result.destination) return;

    // 목적지가 있는 경우,
    // 우선 리액트 불변성을 지켜주기 위해 새로운 newTodoData 변수를 만들어서 준비해주고
    const newTodoData = todoData;

    // 변경시키는 아이템을 배열에서 지워주고 (source index 이용)
    // + return 값으로 지워진 아이템을 [reorderedItem]에 넣어서 keep해주기
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에(destination index 이용) reorderedItem을 insert해주기.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      handleClick={handleClick}
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});
