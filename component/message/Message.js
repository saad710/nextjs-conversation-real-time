import { Avatar, ListItemAvatar, Box } from '@mui/material'
import React from 'react'
import { format } from 'timeago.js'
import { blue } from '@mui/material/colors';

const Message = (props) => {
  const { message, own } = props
  return (
    <div >
      <Box>
        <div>
          <Box p={2}>
            {own ? (
              <Box display="flex" alignItems="start   " flexDirection="row">
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: blue[100], color: blue[600] }}
                  />
                </ListItemAvatar>
                <div className="pl-3">
                  <Box
                    mb={1}
                    sx={{
                      p: 2,
                      backgroundColor: '#73c2fb',
                      borderRadius: '6px',
                      color: 'black',
                    }}
                  >
                    {message.text}
                  </Box>
                  <div className="messageBottom">
                    {format(message.createdAt)}
                  </div>
                </div>
              </Box>
            ) : (
              <Box
                mb={1}
                display="flex"
                alignItems="flex-end"
                flexDirection="row-reverse"
                className="chat-content"
              >
                <div className="pl-3">
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: '#fefefa',
                      ml: 'auto',
                      borderRadius: '6px',
                      color: 'black',
                    }}
                  >
                    {message.text}
                  </Box>
                  <div className="messageBottom">
                    {format(message.createdAt)}
                  </div>
                </div>
              </Box>
            )}
          </Box>
        </div>
      </Box>
    </div>
  )
}

export default Message
