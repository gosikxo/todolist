import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo } from './components/Todo';
import RelaxPage from './components/RelaxPage';
import DoneTasksPage from './components/DoneTasksPage';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cardo&family=Josefin+Sans:wght@500&display=swap');
</style>


type Task = {
  name: string,
  id: number,
  isDone: boolean
}

async function postTask(task: Task) {
  const response = await fetch('https://todo.bitsky.workers.dev/tasks', {
    method: 'POST',
    body: JSON.stringify(task)
  })
}

async function getTasks() {
  const res = await fetch('https://todo.bitsky.workers.dev/tasks');
  const data = await res.json();
  return data;
}

async function updateTask(task: Task) {
  const response = await fetch(`https://todo.bitsky.workers.dev/tasks/${task.id}`, {
    method: 'POST',
    body: JSON.stringify(task)
  })
}

async function deleteTask(task: Task) {
  const response = await fetch(`https://todo.bitsky.workers.dev/tasks/${task.id}/delete`, {
    method: 'POST',
    body: JSON.stringify(task)
  })
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>();
  const [page, setPage] = useState("first-page")

  // useEffect(() => {
  //   getTasks().then(data => setTasks(data))
  // }, [])


  const deleteDoneTasks = (): void => {
    setTasks(tasks.filter((task) => {
      return !task.isDone
    }))
  }

  const handleClick = (): void => {
    const newTaskData = { name: newTaskName ?? "", id: Date.now(), isDone: false }
    if (!newTaskName) {
      return
    }
    setTasks(previousTodos => {
      return [...previousTodos, newTaskData]
    })
    postTask(newTaskData)
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
            className='relaxIcon'
            src='https://cdn-icons-png.flaticon.com/512/3202/3202829.png' />
          <img onClick={() => {
            setPage('third-page')
          }}
            className='doneTasksIcon'
            src='https://cdn-icons-png.flaticon.com/512/4091/4091120.png' />
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
                  updateTask(task)
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
          setPage('first-page')
        }}
          onClick2={() => {
            setPage('third-page')
          }} />
      </div>
    )
  } else {
    return (
      <div className="App">
        <DoneTasksPage onClick={() => {
          setPage('first-page')
        }}
          onClick2={() => {
            setPage('second-page')
          }} />
      </div>
    )
  }
}

export default App;
