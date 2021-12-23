import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Conversation = (props) => {
    const {conversation,currentUser} = props;
    const [user, setUser] = useState('')
    console.log(user?.username)

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id)
        console.log(friendId)
        const getUser = async () => {
          try {
            const res = await axios(
              `http://localhost:3000/api/user/getSingleUser?userId=${friendId}`,
            )
            console.log(res.data)
            setUser(res.data)
          } catch (err) {
            console.log(err)
          }
        }
        getUser()
      }, [currentUser, conversation])

    return (
        <div>
             <List>
        <ListItem button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" />
          </ListItemAvatar>
          <ListItemText
            style={{ marginTop: '1.7vh' }}
            primary={user?.username}
          />
        </ListItem>
      </List>
        </div>
    );
};

export default Conversation;