import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo } from './components/Todo';
import RelaxPage from './components/RelaxPage';
import DoneTasksPage from './components/DoneTasksPage';
import { supabase } from './supabase';
import { v4 as uuid } from "uuid";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cardo&family=Josefin+Sans:wght@500&display=swap');
</style>


type Task = {
  name: string,
  id: string,
  isDone: boolean,
  isDeleted: boolean
}

async function postTask(task: Task) {
  const res = await supabase.from('todos').insert(
    task
  );
  return res;
}

async function getTasks() {
  return await supabase.from('todos').select();
}

async function updateTask(task: Task) {
  return await supabase.from('todos').update(task).eq('id', task.id);
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>();
  const [page, setPage] = useState("first-page")

  useEffect(() => {
    getTasks().then(result => {
      if (!result.data || result.error) {
        // TODO: add message to user
        return
      }
      setTasks(result.data.filter((task) => {
        return !task.isDeleted
      }))
    }
    )
  }, [])


  const deleteDoneTasks = (): void => {
    setTasks(tasks.filter((task) => {
      if (task.isDone) {
        updateTask({ ...task, isDeleted: true });
      }
      return !task.isDone
    }))
  }

  const handleClick = (): void => {
    const newTaskData = { name: newTaskName ?? "", id: uuid(), isDone: false, isDeleted: false }
    if (!newTaskName) {
      return
    }
    setTasks(previousTodos => {
      return [...previousTodos, newTaskData]
    })
    postTask(newTaskData)
    setNewTaskName("")
  }

  const handleDeleteClick = (id: string): void => {
    const foundTask = tasks.find(task => task.id === id)
    if (!foundTask) {
      throw new Error('Task not found')
    }
    updateTask({ ...foundTask, isDeleted: true });
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
                  const newTask = {
                    ...todo,
                    isDone: !todo.isDone,
                  };
                  updateTask(newTask)
                  return newTask
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
