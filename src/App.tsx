import React, { useState } from 'react';
import './App.css';
import { Todo } from './components/Todo';
import RelaxPage from './components/RelaxPage';
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
  const [page, setPage] = useState("first-page")


  const deleteDoneTasks = (): void => {
    setTasks(tasks.filter((task) => {
      return !task.isDone
    }))
  }


  const handleClick = (): void => {
    if (!newTaskName) {
      return
    }
    setTasks(previousTodos => {
      return [...previousTodos, { name: newTaskName ?? "", id: Date.now(), isDone: false }]
    })
    setNewTaskName("");
  }

  const handleDeleteClick = (id: number): void => {
    const removeItem = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(removeItem);
  }
  if (page === "first-page") {
    return (
      <div className="App">
        <div className='icons'>
          <img onClick={() => {
            setPage('second-page')
          }}
            className='relaxIcon' src='https://cdn-icons-png.flaticon.com/512/3202/3202829.png' />
        </div>
        <div className='header'>
          <h1>To Do List</h1>
          <input value={newTaskName} onChange={(event) => {
            setNewTaskName(event.target.value)
          }} />
          <button onClick={() => handleClick()
          } ><span>Add</span></button>
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
            }} onClick={() => {
              handleDeleteClick(task.id)
            }}
              id={task.id} isDone={task.isDone} name={task.name} />)
            }
            <button className='clearTask' onClick={() => deleteDoneTasks()}>Clear tasks</button>
          </div>
        </div>
      </div>
    )
  } else if (page === "second-page") {
    return (
      <div className="App">
        <RelaxPage onClick={() => {
          console.log('clicked')
          setPage('first-page')
        }}/>
      </div>
    )
  } return <div></div>
}

export default App;
