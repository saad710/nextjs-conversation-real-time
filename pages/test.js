import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import { Button } from '@mui/material';
import jwt from 'jsonwebtoken'
import { UserContext } from '../context/AuthContext/LoginProvider';


const Test = () => {
    const router = useRouter()
    const {user , dispatch} = useContext(UserContext)
    console.log(user)

    // const [userData, setUserData] = useState(null)
    // console.log(userData)
    async function populateQuote() {
        const req = await fetch('http://localhost:3000/api/auth/verify', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        console.log(data)
        if (data) {
            // setUserData(data)
            dispatch({type:'Login_Success', result: data})
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token')
                // history.replace('/login')
                router.replace('/login')
            } else {
                populateQuote()
                
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

    if (!user) {
        return null;
    }
    else {
        return (
            <div>
                <h1>{user?.username}</h1>
                <Button onClick={handleLogout}>logout</Button>
            </div>
        );
    }
};

export default Test;


