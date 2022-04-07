import React, { useState } from 'react';
import { toEditorSettings } from 'typescript';
import './App.css';
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
      <input onChange={(event) => setNewTaskName(event.target.value)} />
      <button onClick={() => setTasks(previousTodos => {
        return [...previousTodos, { name: newTaskName ?? "", id: 1, isDone: false }]
      })}><span>Add</span></button>
      <div className="tasks">
      {tasks.map(item => {
            return <p>{item.name}</p>
           })
        }
      </div>
    </div>
      );
}

      export default App;
