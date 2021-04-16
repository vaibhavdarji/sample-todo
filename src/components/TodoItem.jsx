import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../App.css";
import { AppContext } from "../contexts";
import { todoTypes } from "../actionTypes";

const TodoItem = () => {
    const { id } = useParams();
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        dispatch({
            type: todoTypes.LOAD_TODO_REQUEST
        });

        const fetchData = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
            const data = await response.json();
            dispatch({
                type: todoTypes.LOAD_ACTIVE_TODO,
                payload: data
            });
        }
        fetchData();
    }, [id, dispatch]);
    return (
        <div className="single-todo-item">
            {
                state.loading && (
                    <p>Fetching todo item {id}</p>
                )
            }
            {
                state.active && (
                    <div>
                        <h2 className="todo-title">{state.active.title}</h2>
                        <h4>Added by: {state.active.userId}</h4>
                        {
                            state.active.completed && (
                                <p className="completed">This item has been completed</p>
                            )
                        }
                        {
                            !state.active.completed && (
                                <p className="not-completed">This item is yet to be completed</p>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default TodoItem;

