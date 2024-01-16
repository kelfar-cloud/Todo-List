import { useState } from "react";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incomplete, setIncomplete] = useState([]);
  const [complete, setComplete] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if(todoText === "") return;
    const newTodos = [...incomplete, todoText];
    setIncomplete(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incomplete];
    newTodos.splice(index, 1);
    setIncomplete(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncomplete = [...incomplete];
    newIncomplete.splice(index, 1);

    const newComplete = [...complete, incomplete[index]];
    setIncomplete(newIncomplete);
    setComplete(newComplete);
  }

  const onClickBack = (index) => {
    const newComplete = [...complete];
    newComplete.splice(index, 1);

    const newIncomplete = [...incomplete, complete[index]];
    setComplete(newComplete);
    setIncomplete(newIncomplete);
  }
  
  return (
    <>
      <div className="input-area">
        <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        {incomplete.length >= 6 && 
        Array.from({ length: incomplete.length }).map((_, i) => (
            <p style={{color: "red"}} key={i}>未来最高！！</p>
          ))
        }
        <ul>
          {incomplete.map((todo, index) => {
            return (
              <li key={todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {complete.map((todo, index) => (
            <li key={todo}>
              <div className="list-row">
                <p className="todo-item">{todo}</p>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
