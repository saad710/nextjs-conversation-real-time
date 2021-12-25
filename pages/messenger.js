import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import { Button, Grid } from '@mui/material';
import jwt from 'jsonwebtoken'
import { UserContext } from '../context/AuthContext/LoginProvider';
import Topbar from '../component/topbar/Topbar';
import axios from 'axios';
import Conversation from '../component/conversation/Conversation';
import Message from '../component/message/Message';



const Messenger = () => {
    const router = useRouter()
    const { user, dispatch } = useContext(UserContext)
    const [conversation, setConversation] = useState([])
    console.log(conversation)
    const [currentChat, setCurrentChat] = useState()
    const [messages, setMessages] = useState([])
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
            dispatch({ type: 'Login_Success', result: data })
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

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/conversation/getSpecificUserConversation?userId=${user?._id}`,
                )
                setConversation(res?.data)
                setCurrentChat(res?.data[0])
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConversations()
    }, [user, setCurrentChat])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/message/getMessage?conversationId=${currentChat?._id}`,
                )
                console.log(res.data)
                setMessages(res?.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages()
    }, [currentChat])


    //   useEffect(() => {
    //     const getMessages = async () => {
    //       try {
    //         const res = await axios.get(
    //           'http://localhost:8800/api/messages/' + currentChat?._id,
    //         )
    //         console.log(res.data)
    //         setMessages(res?.data)
    //       } catch (err) {
    //         console.log(err)
    //       }
    //     }
    //     getMessages()
    //   }, [currentChat])



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
                <Topbar handleLogout={handleLogout} user={user} />
                <Grid container>
                    <Grid item xs={2} style={{ padding: "2vh" }}>
                        {conversation.map((conv, index) => (
                            <div key={index}>
                                <Conversation conversation={conv} currentUser={user} />
                            </div>
                        ))}
                    </Grid>
                    {
                        currentChat && (
                            <Grid item xs={5} style={{ padding: "2vh",height:'80vh',overflowY:"scroll" }}>
                                {messages.map((message, index) => (
                                    <Message key={index} message={message} own={user._id === message.sender} />
                                ))}
                            </Grid>
                        )
                    }
                </Grid>
            </div>
        );
    }
};

export default Messenger;