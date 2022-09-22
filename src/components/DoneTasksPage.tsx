import React from 'react'

const DoneTasksPage = (props: { onClick: () => void, onClick2: () => void }) => {
    return (
        <>
            <div className='icons'>
                <img onClick={props.onClick} className='todoIcon' src='https://cdn-icons-png.flaticon.com/512/839/839860.png' />
                <img onClick={props.onClick2} className='relaxIcon' src='https://cdn-icons-png.flaticon.com/512/3202/3202829.png' />
            </div>
            <div>
                <h1>Completed tasks:</h1>
            </div>
        </>
    )
}

export default DoneTasksPage