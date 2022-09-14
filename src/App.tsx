import React, { useState } from 'react';
import './App.css';
import { Todo } from './components/Todo';
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Satisfy&display=swap');
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
      <div className='tasksAndDoneTasks'>
        <div className="tasks">
          <h3>To do:</h3>
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
        <div className="doneTasks">
          <h3>Done:</h3>
          {tasks.filter(task => task.isDone).map(todo => {
            return <span>{todo.name}<br></br></span>         
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
