import React, {useState} from 'react'

//Task input and prop to add tasks to Task List
export default function TaskInput({addTask}) {
    const [taskValue, setTaskValue] = useState('');
    
    const handleInputChange = (input)=> {
        setTaskValue(input.target.value);
    }

    const handleAddTask = () => { 
        // This will not add a task if the value is whitespace/empty
        if(taskValue.trim()){
        addTask(taskValue); 
        setTaskValue('');  //clear the taskValue after adding one 
        }
    }
return (
    <div className='input-container'>
        <input
        className="border border-gray-500 rounded-md px-1 py-1 w-small focus:outline-none focus:ring-2 focus:ring-orange-500"
        name='task input'
        type='text'
        placeholder='enter a task'
        onChange={handleInputChange}
        value={taskValue}
        />
        <button className='button' onClick={handleAddTask}>Add Task</button>
    </div>
  )
}




