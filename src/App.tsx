import { isDocument } from '@testing-library/user-event/dist/utils';
import { stringify } from 'querystring';
import React, { useState } from 'react';
import { idText, toEditorSettings } from 'typescript';
import './App.css';
import { Todo } from './components/Todo';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@600&family=Patrick+Hand&display=swap');
</style>

type Task = {
  name: string,
  id: number,
  isDone: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>();


  return (
    <div className="App">
      <h1>To <span> Do </span> List</h1>
      <input value={newTaskName} onChange={(event) => setNewTaskName(event.target.value)} />
      <button onClick={() => {
        setNewTaskName("");
        setTasks(previousTodos => {
          return [...previousTodos, { name: newTaskName ?? "", id: Date.now(), isDone: false }]
        })
      }} ><span>Add</span></button>
      <div className="tasks">
        {tasks.map(task => <Todo onCheck={() => {
          setTasks(previousTodos => previousTodos.map(todo => {
            if (task.id === todo.id){
              return {
                ...todo,
                isDone: !todo.isDone,
              }
            }
            return todo;
          }))
        }} id={task.id} isDone={task.isDone} name={task.name} />)}

      </div>
    </div>
  );
}

export default App;
