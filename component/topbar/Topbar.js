import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors';
import axios from 'axios';


function SimpleDialog(props) {
  const { onClose, open, addUser,setAddUser,user,dispatch,conversation } = props;
  console.log(conversation)

  const handleListItemClick = (all) => {
    console.log(all._id)
    const filteredItem = addUser.filter((ind) => {
      return ind._id !== all._id
    })
    setAddUser(filteredItem)
    console.log(all)
    const bothUserId = {
      senderId: user._id,
      receiverId: all._id,
    }
    axios
      .get(
        `http://localhost:3000/api/conversation/getBothUserConversation?firstUserId=${user._id}&secondUserId${all._id}`,
      )
      .then((response) => {
        console.log(response.data)
        if (!response.data) {
          axios
            .post(`http://localhost:3000/api/conversation/postConversation`, bothUserId)
            .then((response) => {
              console.log(response.data)
              conversation.push(response.data)
            })
            .catch((err) => {
              console.log(err)
            })
          const userInfo = { userId: user._id }
          axios
            .put(`http://localhost:3000/api/user/followUser?id=${all._id}`, userInfo)
            .then((response) => {
              console.log(response.data)
              // const followData = {"username" : all.username,"_id":all._id}
              // onlineFriends.push(followData)
              // setUserData(
              //   userData.map((user) => {
              //     return { ...user, followings: user.followings.push(all._id) }
              //   }),
              // )
              // dispatch({ type: 'Login_Success', result: {...response.data, followin} })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
  };

  return (

    <Dialog onClose={onClose} open={open} >
      <DialogTitle>Add Contact</DialogTitle>
      <List sx={{ pt: 0 }}>
        {addUser.map((all) => (
          <ListItem button key={all._id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={all.username} sx={{ m: 2 }} style={{ width: '10vh' }} />
            <ListItemButton sx={{ bgcolor: blue[100], color: blue[600] }} style={{borderRadius:'5px'}}  onClick={() => handleListItemClick(all)}>Add</ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>

  );
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

const Topbar = (props) => {
  const { user, handleLogout, conversation, setConversation,dispatch } = props;
  const [sideUser, setSideUser] = useState([])
  const [addUser, setAddUser] = useState([])
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/getAllUser`)
      .then((response) => {
        const data = response.data
        console.log(data)
        const withoutCurrentUser = data?.filter(
          (info) => info._id !== user._id,
        )
        let result = withoutCurrentUser?.filter(
          (all) => !sideUser.some((side) => all.username === side.username),
        )
        console.log(result)
        setAddUser(result)
        // setAllUsers(withoutCurrentUser)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [sideUser, user])

  useEffect(() => {
    let combineData = []
    conversation.map((con) => {
      const friendId = con.members.find((m) => m !== user._id)
      axios
        .get(`http://localhost:3000/api/user/getSingleUser?userId=${friendId}`)
        .then((response) => {
          console.log(response.data)
          combineData.push(response.data)
          setSideUser(combineData)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, [conversation, user, setSideUser])




  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <ChatBubbleOutlineIcon style={{ marginTop: '1vh' }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))} */}
              <MenuItem>{user?.username}</MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user?.username}
          </Box>

          <Box sx={{ p: 2 }} autoFocus button onClick={handleClickOpen}>
            <Tooltip title="Add Contact">
              <Avatar >
                <AddIcon primary="add" />
              </Avatar>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem>
                <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          addUser={addUser}
          setAddUser={setAddUser}
          user={user}
          dispatch={dispatch}
          conversation={conversation}
        />
      </Container>
    </AppBar>
  );
};

export default Topbar;