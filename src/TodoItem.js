import React, { useState } from 'react';
import axios from 'axios';

import './TodoItem.css';

function TodoItem({ id, taskValue, onDelete }) {
    const [isEditable, setIsEditable] = useState(false);
    const [task, setTask] = useState(taskValue);

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const updateTask = async () => {
        try {
            toggleEdit();
            await axios.put(`http://localhost:3001/todos/${id}`, {
                task,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async () => {
        try {
            await axios.delete(`http://localhost:3001/todos/${id}`);
            onDelete(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="task">
            {/* {isEditable ? (
                <input
                    type="text"
                    value={task}
                    onChange={(e) => {
                        setTask(e.target.value);
                    }}
                    maxLength={120}
                ></input>
            ) : (
                <p>{task}</p>
            )}
            <div className="buttonDiv">
                {isEditable ? (
                    <button onClick={updateTask}>Finish</button>
                ) : (
                    <button onClick={toggleEdit}>Edit</button>
                )}
                <button onClick={deleteTask}>Delete</button>
            </div> */}
            <div className="taskGrid">
                <div className="taskTitle">
                    {isEditable ? (
                        <input
                            type="text"
                            value={task}
                            onChange={(e) => {
                                setTask(e.target.value);
                            }}
                            maxLength={120}
                        ></input>
                    ) : (
                        <p>{task}</p>
                    )}
                </div>
                <div className="taskPriority">Priority</div>
                <div className="taskDueDate">Due Date</div>
                <div className="taskStatus">Status</div>
                <div className="taskTags">Tags</div>
            </div>
        </div>
    );
}

export default TodoItem;
