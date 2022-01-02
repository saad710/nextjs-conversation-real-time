import React, { createContext } from 'react';
import { useEffect, useReducer } from 'react';

const initialState = {
    user: null,
    pro:[
        {
            "name" : "saad",
            "id" : "5"
        },
        {
            "name" : "ifrat",
            "id" : "6"
        },
    ],
}

const reducer = (state,action) => {
    switch(action.type){
        case 'Login_Success':
            return {
                ...state,
                user: action.result ,
            };
            case 'pro-data' :
            return {
                ...state,
                pro:action.result
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
        <UserContext.Provider value={{user: state.user, dispatch, pro:state.pro}}>
            {children}
        </UserContext.Provider>
    );
};

export default LoginProvider;