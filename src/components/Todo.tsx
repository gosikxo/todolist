import React, {useState} from 'react'

export const Todo = (props: {onCheck: () => void, name: string, id: number, isDone: boolean}) => {
  return (
    <div>
      <input onChange={props.onCheck} checked={props.isDone} type="checkbox"></input>
      <span className={props.isDone ? 'clicked': "notClicked"}>{props.name}</span>
    </div> 
)
}

