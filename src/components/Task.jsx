import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

//Task used as a container for individual tasks, also contains props task info, change complete status, and removing tasks
export default function Task({ task, toggleComplete, deleteTask }) {
    return (
        <div className="task">
            <span onClick={()=>toggleComplete(task.id)}  className={task.completed ? "line-through" : ""}>{task.name}</span>
            <div>
                <TrashIcon
                    color={'#EB5A3C'}
                    height={24}
                    width={24}
                    onClick={() => deleteTask(task.id)
                    }
                />
            </div>
        </div>
    );
}
