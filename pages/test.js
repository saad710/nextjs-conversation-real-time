import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import { Button } from '@mui/material';
import jwt from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux';



const Test = () => {
    const router = useRouter()
     const dispatch = useDispatch();
    const active = useSelector((state) => state.TestReducer.test);
    console.log(active)
    // const proActive = useSelector((state) => state.TestReducer.pro)
    // console.log(proActive)
  
  

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                // history.replace('/login')
                router.replace('/login')
            } else {
                dispatch({ type: 'test-data', result: active.map(a => {
                    return {...a , active:'yes'}
                  }) })
                  dispatch({ type: 'pro-data', result: 10
                  }) 
                
            }
        }
        else {
            router.push('/login')
        }
    }, [])

  

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.replace("/login")
        // history.replace('/login')
    }

        return (
            <div>
                <h1>hello</h1>
                <Button onClick={handleLogout}>logout</Button>
            </div>
        );
    
};

export default Test;


