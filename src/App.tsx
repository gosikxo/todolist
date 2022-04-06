import React, { useState } from 'react';
import { toEditorSettings } from 'typescript';
import './App.css';
//import './components/Todos'


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
      <input onChange={(event) => setNewTaskName(event.target.value)} />
      <button onClick={() => setTasks(previousTodos => {
        return [...previousTodos, { name: newTaskName ?? "", id: 1, isDone: false }]
      })}>Add</button>
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
