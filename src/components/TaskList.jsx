import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';
import io from 'socket.io-client';
import CustomModal from './Modal';  // Import the custom modal component

// Initialize the socket connection
const socket = io('http://localhost:3001'); // Change the URL if necessary

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility
    const [modalMessage, setModalMessage] = useState("");   // Message for modal

    useEffect(() => {
        // Event listener for task list from server
        socket.on('taskList', (sharedTasks) => {
            setTasks(sharedTasks);
        });

        // Cleanup event listener when component unmounts
        return () => {
            socket.off('taskList');
        };
    }, []);

    const addTask = (taskName) => {
        // Check if task already exists in the list
        if (tasks.some((task) => task.name === taskName)) {
            // Task already exists, show the modal
            setModalMessage('This task already exists. Please enter a new task.');
            setIsModalOpen(true);  // Open the modal
        } else {
            const newTask = { id: uuidv4(), name: taskName, completed: false };
            setTasks([...tasks, newTask]);
            socket.emit('addTask', newTask);
        }
    };

    const toggleComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
        socket.emit('completeTask', id);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        socket.emit('deleteTask', id);
    };

    const DisplayTaskList = ({ tasks }) => {
        return tasks.map((task) => (
            <Task
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
            />
        ));
    };

    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
    };

    const onConfirmModal = () => {
        // Any additional logic for confirming task addition
        console.log("User clicked Add Another Task.");
        closeModal();  // Close the modal
    };

    return (
        <div className="task-container">
            <span className="task-list-title">Let's do some Tasks!</span>
            <TaskInput addTask={addTask} />
            <ul>
                <DisplayTaskList tasks={tasks} />
            </ul>

            {/* Custom Modal for task already exists */}
            <CustomModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                message={modalMessage}
                onConfirm={onConfirmModal}
            />
        </div>
    );
}
