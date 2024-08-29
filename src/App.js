import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://localhost:3001/todos')
            .then((response) => {
                setTodos(response.data);
                isLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const onAdd = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const onRemove = (id) => {
        setTodos(
            todos.filter((todo) => {
                return todo._id !== id;
            })
        );
    };

    return (
        <div className="appDiv">
            {loading && <p>Loading...</p>}

            <div className="tasks">
                {todos.map((todo) => (
                    <TodoItem
                        id={todo._id}
                        taskValue={todo.task}
                        onDelete={onRemove}
                    ></TodoItem>
                ))}
            </div>

            <TodoForm onAdd={onAdd}></TodoForm>
        </div>
    );
}

export default App;
