import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Task({ task, toggleComplete, deleteTask }) {
    return (
        <div className="task">
            <span onClick={()=>toggleComplete(task.id)}  className={task.completed ? "line-through" : ""}>{task.name}</span>
            <div>
                <TrashIcon
                    color={'gray'}
                    height={24}
                    width={24}
                    onClick={() => deleteTask(task.id)
                    }
                />
            </div>
        </div>
    );
}
