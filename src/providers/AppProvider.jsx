import React, { useReducer } from "react";
import { AppContext } from "../contexts";
import { todoTypes } from "../actionTypes";

const initialState = {
    loading: false,
    list: [],
    active: ''
};

const reducer = (state, action) => {
    if (action.type === todoTypes.LOAD_TODO_REQUEST) {
        return {
            ...state,
            loading: true
        };
    } else if (action.type === todoTypes.LOAD_TODO_LIST) {
        return {
            ...state,
            loading: false,
            list: action.payload
        };
    } else if (action.type === todoTypes.LOAD_ACTIVE_TODO) {
        return {
            ...state,
            loading: false,
            active: action.payload
        };
    }

    return state;
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {
                children
            }
        </AppContext.Provider>
    );
};

export default AppProvider;