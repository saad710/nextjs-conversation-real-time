import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MarkUnreadChatAltTwoToneIcon from '@mui/icons-material/MarkUnreadChatAltTwoTone';
import { blue } from '@mui/material/colors';

const Conversation = (props) => {
    const { conversation, currentUser, redId } = props;
    console.log(redId)
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
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} />
                    </ListItemAvatar>
                    <ListItemText
                        style={{ marginTop: '1.7vh' }}
                        primary={user?.username}

                    />
                    <ListItemAvatar>
                        {
                            user._id === redId ?
                                <MarkUnreadChatAltTwoToneIcon style={{ color: "royalblue", marginTop: '1vh', borderRadius: '10px' }} />
                                : null
                        }
                    </ListItemAvatar>

                </ListItem>
            </List>
        </div>
    );
};

export default Conversation;