import { useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Box, Button, Card, Divider, Grid, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import jwt from 'jsonwebtoken'
import Topbar from '../component/topbar/Topbar'
import axios from 'axios'
import Conversation from '../component/conversation/Conversation'
import Message from '../component/message/Message'
import CustomScrollBars from 'react-custom-scrollbars'
import FeatherIcon from 'feather-icons-react'
import { io } from 'socket.io-client'
import { blue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';


const trackHorizontal = {
  'minWidth': '100%',
  'zIndex': 150,
  bottom: 0,
}

const thumbHorizontal = {
  cursor: 'pointer',
  background: 'red',
  'minWidth': '100px',
}

const Messenger = () => {
  const scrollRef = useRef()
  const dispatch = useDispatch();
  
  const socket = useRef()
  const router = useRouter()
  const user = useSelector((state) => state.AuthReducer.user);
  console.log(user)
  // const { user,dispatch } = useContext(UserContext)
  const [conversation, setConversation] = useState([])
  console.log(conversation)
  const [currentChat, setCurrentChat] = useState()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [onlineMatch, setOnlineMatch] = useState([])
  const [findChatUser, setFindChatUser] = useState()
  const [chatUserOnline, setChatUserOnline] = useState()
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [redId, setRedId] = useState('')
  console.log(onlineUsers)
  
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
      dispatch({ type: 'Login', result: data })
      console.log(user)
    } else {
      alert(data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const userToken = jwt.decode(token)
      if (!userToken) {
        localStorage.removeItem('token')
        // history.replace('/login')
        router.replace('/login')
      } else {
        populateQuote()
      }
    } else {
      router.push('/login')
    }
  }, [])



  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket?.current.on('getMessage', (data) => {
      console.log(data.senderId)
      setRedId(data.senderId)
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [user])
  console.log(arrivalMessage)

  console.log(socket)

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])
  console.log(currentChat)

  useEffect(() => {
    socket?.current.emit('addUser', user?._id)
    socket?.current.on('getUsers', (users) => {
      console.log(users)
      setOnlineUsers(
        user?.followings?.filter((f) => users?.some((u) => u.userId === f)),
      )
    })
  }, [user])
  console.log(onlineUsers)

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



  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat?.members.find(
      (member) => member !== user?._id,
    )

    socket.current.emit('sendMessage', {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post(
        'http://localhost:3000/api/message/postMessage',
        message,
      )
      console.log(res.data)
      setMessages([...messages, res.data])
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  useEffect(() => {
    const chatOnlineMatch = onlineMatch?.filter((f) =>
      onlineUsers?.includes(f._id),
    )
    console.log(chatOnlineMatch)
    const matchData = chatOnlineMatch?.filter(
      (user) => user.username === findChatUser,
    )
    console.log(matchData)
    console.log(matchData.length === 0)
    if (matchData.length === 0) {
      setChatUserOnline(false)
    } else {
      setChatUserOnline(true)
    }
  }, [findChatUser, onlineUsers, onlineMatch])


  const handleUserChat = (conv, index) => {
    setRedId('')
    console.log(conv)
    setCurrentChat(conv)
  }

  useEffect(() => {
    const findCurrentChat = currentChat?.members?.filter(
      (userInfo) => userInfo !== user?._id,
    )
    const findCurrentChatId = findCurrentChat?.toString()
    console.log(findCurrentChatId)

    axios
      .get(`http://localhost:3000/api/user/getSingleUser?userId=${findCurrentChatId}`)
      .then((response) => {
        const data = response.data
        console.log(data)
        setFindChatUser(data.username)
      })
      .catch((err) => {
        console.log(err)
      })
    axios
      .get(`http://localhost:3000/api/user/getFriend?userId=${user?._id}`)
      .then((response) => {
        const data = response.data
        console.log(data)
        setOnlineMatch(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentChat, user])

  useEffect(() => {
    let mData = []
    conversation.map((all) => {
      mData.push(all.members.find((data) => data !== user._id))
    })
    console.log(mData)
    const filterSameData = [...new Set(mData.map((unique) => unique))]
    console.log(filterSameData)
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')

  }

  if (!user) {
    return null
  } else {
    return (
      <div>
        <Topbar handleLogout={handleLogout} user={user} dispatch={dispatch} conversation={conversation} setConversation={setConversation} />
        <Card sx={{ display: "flex", p: 0, m: 5 }} style={{width:'100vh',backgroundColor:'#F0F8FF'}} variant="outlined">
          <Grid container >

            <Grid item xs={4} style={{ padding: '2vh' }}>
              <Box>
                <TextField
                  id="outlined-search"
                  placeholder="Search contacts"
                  size="small"
                  type="search"
                  variant="outlined"
                  inputProps={{ 'aria-label': 'Search Contacts' }}
                  fullWidth
                  style={{ backgroundColor: 'white', borderRadius: '5px' }}
                // onChange={(e) => dispatch(chatSearch(e.target.value))}
                />
              </Box>
              <CustomScrollBars
                autoHide={false}
                style={{ width: '100%', height: '75vh' }}
                renderTrackHorizontal={(props) => {
                  console.log('renderTrackHorizontal', props)
                  return <div {...props} style={trackHorizontal} />
                }}
                renderThumbHorizontal={(props) => {
                  console.log('renderThumbHorizontal', props)
                  return <div {...props} style={thumbHorizontal} />
                }}
              >
                {conversation.map((conv, index) => (
                  <div key={index} onClick={() => handleUserChat(conv, index)}>
                    <Conversation conversation={conv} currentUser={user} redId={redId} />
                  </div>
                ))}
              </CustomScrollBars>
            </Grid>
            
            {currentChat && (
              <Grid item xs={8} style={{ padding: '2vh', height: "70vh" }}  >
                <Box
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      display: { xs: 'block', md: 'block', lg: 'none' },
                      mr: '10px',
                    }}
                  >
                    <FeatherIcon icon="menu" width="18" />
                  </Box>
                  <ListItem dense disableGutters>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h4">{findChatUser}</Typography>
                      }
                      secondary={
                        <Typography variant="p">
                          {chatUserOnline ? 'online' : 'offline'}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Box>
                <Divider />
                <CustomScrollBars
                  autoHide={false}
                  style={{ width: "100%" }}
                  renderView={props => (
                    <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
                  )}

                >
                  {messages.map((message, index) => (
                    <Grid key={index} ref={scrollRef} style={{ padding: "0.4vh" }}  >
                      <Message
                        // key={index}
                        message={message}
                        own={user._id === message.sender}
                      />
                    </Grid>
                  ))}
                </CustomScrollBars>
                <form onSubmit={handleSubmit} >
                  <Grid container >
                    <Grid item xs={11}>
                      <TextField
                        id="msg-sent"
                        fullWidth
                        value={newMessage}
                        placeholder="Type a Message"
                        size="small"
                        type="text"
                        variant="outlined"
                        style={{ backgroundColor: 'white' }}
                        inputProps={{ 'aria-label': 'Type a Message' }}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Button fullWidth type="submit">
                        <FeatherIcon icon="send" width="24" />
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            )}

          </Grid>
        </Card>
      </div>
    )
  }
}

export default Messenger
