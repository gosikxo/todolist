import React, {useState} from 'react'


export const Todo = (props: {onCheck: () => void, onClick: () => void, name: string, id: string, isDone: boolean}) => {
  return (
    <div>
      <input onChange={props.onCheck} checked={props.isDone} type="checkbox"></input>
      <span className={props.isDone ? 'clicked': "notClicked"}>{props.name}</span>
      <img onClick={props.onClick} className='taskDelete' src="https://img.icons8.com/officexs/16/000000/delete-sign.png"/>
    </div> 
)
}

