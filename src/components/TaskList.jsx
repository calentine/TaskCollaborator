import React, {useState, useEffect} from 'react'
import TaskInput from './TaskInput';
import {v4 as uuidv4} from 'uuid';
import Task from './Task';
import io from 'socket.io-client'

// Initialize the socket connection
const socket = io('http://localhost:3001'); // Change the URL if necessary

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    
    useEffect(()=>{
        // Event listener for task list from server
        socket.on('taskList', (sharedTasks)=>{
            setTasks(sharedTasks);
        });

        // Cleanup event listener when component unmounts
    return () => {
        socket.off('taskList');
    }; },[]);


    const addTask = (taskName) => {
        const newTask = {id: uuidv4(), name: taskName, completed: false};
        setTasks([...tasks, newTask]);
        socket.emit('addTask', newTask);
    };

    const toggleComplete = (id) =>{
        setTasks(
            tasks.map((task) =>
            task.id === id ?{...task, completed: !task.complete} : task)
        );
        socket.emit('completeTask', id);
    };
    // This is going to only return the tasks !== id
    const deleteTask = (id) =>{
        setTasks(tasks.filter(task => task.id !== id));
        socket.emit('deleteTask', id);
    };

    const DisplayTaskList = ({ tasks }) => {
        return tasks.map((task) => (
            // Task Component
            <Task 
                key={task.id} 
                task={task} 
                toggleComplete={toggleComplete} 
                deleteTask={deleteTask} /> 
        ));
    };

    return (
        <div className='task-container'>
            <span className='task-list-title'>Let's do some Tasks!</span>
            <TaskInput addTask={addTask}/>
            <ul>
                <DisplayTaskList tasks={tasks} />
            </ul>
        </div>
    )
}
