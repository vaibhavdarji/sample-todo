import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from "../contexts";
import "../App.css";
import { todoTypes } from "../actionTypes";

const TodoList = () => {
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        dispatch({
            type: todoTypes.LOAD_TODO_REQUEST
        });
        const fetchData = async () => {
            try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            
            const data = await response.json();
            
            dispatch({
                type: todoTypes.LOAD_TODO_LIST,
                payload: data
            });
            } catch (e) {
            }
        };
        fetchData();
    }, [dispatch]);
    return (
        <div>
            {
                state.loading && (
                    <p>Fetching todo list</p>
                )
            }
            <ul>
            {
                state.list.map(todo => (
                    <li key={todo.id}>
                        <Link to={`/item/${todo.id}`} data-testid={todo.id}>
                            {todo.title}
                        </Link>
                    </li>
                ))
            }
            </ul>
        </div>
    );
};

export default TodoList;

