import React from 'react'

const RelaxPage = (props: { onClick: () => void }) => {
  return (
    <>
    <div className='icons'>
        <img onClick={props.onClick} className='todoIcon' src='https://cdn-icons-png.flaticon.com/512/839/839860.png'/>
    </div>
    <div>
        <h1>Just relax!</h1>
        <img src='https://i.pinimg.com/originals/36/99/23/3699234f311b8d44ba46d6503b4a033c.gif'/>
    </div>
    </>

  )
}

export default RelaxPage