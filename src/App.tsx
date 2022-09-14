import React, { useState } from 'react';
import './App.css';
import { Todo } from './components/Todo';
<style>
@import url('https://fonts.googleapis.com/css2?family=Cardo&family=Josefin+Sans:wght@500&display=swap');
</style>


type Task = {
  name: string,
  id: number,
  isDone: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>();


  const deleteDoneTasks = (): void => {
    setTasks(tasks.filter((task) => {
      return !task.isDone
    }))
  }

  return (
    <div className="App">
      <div className='header'>
        <h1>To Do List</h1>
        <input value={newTaskName} onChange={(event) => setNewTaskName(event.target.value)} />
        <button onClick={() => {
          setNewTaskName("");
          setTasks(previousTodos => {
            return [...previousTodos, { name: newTaskName ?? "", id: Date.now(), isDone: false }]
          })
        }} ><span>Add</span></button>
      </div>
      <div className='tasksAndDoneTasks'>
        <div className="tasks">
          {tasks.map(task => <Todo onCheck={() => {
            setTasks(previousTodos => previousTodos.map(todo => {
              if (task.id === todo.id) {
                return {
                  ...todo,
                  isDone: !todo.isDone,
                }
              }
              return todo;
            }))
          }} id={task.id} isDone={task.isDone} name={task.name} />)
          }
          <button className='clearTask' onClick={() => deleteDoneTasks()}>Clear tasks</button>
        </div>
      </div>
    </div>
  );
}

export default App;
