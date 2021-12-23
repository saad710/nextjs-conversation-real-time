import React, { createContext } from 'react';
import { useEffect, useReducer } from 'react';

const initialState = {
    user: null
}

const reducer = (state,action) => {
    switch(action.type){
        case 'Login_Success':
            return {
                ...state,
                user: action.result ,
            }      
            default: 
            return state;
    }
}

export const UserContext = createContext()

const LoginProvider = (props) => {
    const [state,dispatch] = useReducer(reducer,initialState)
  
    const { children } = props;

    return (
        <UserContext.Provider value={{user: state.user, dispatch}}>
            {children}
        </UserContext.Provider>
    );
};

export default LoginProvider;