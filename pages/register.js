import { Button, Card, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'
// import { Link, NavLink, useHistory } from 'react-router-dom'
import { axios } from 'axios';

function App() {
  const router = useRouter()

  const [username, setName] = useState('')
  console.log(username)
  const [email, setEmail] = useState('')
  console.log(email)
  const [password, setPassword] = useState('')
  console.log(password)

  const registerUser = async event  => {
      console.log('register')
    event.preventDefault()
    const userData = {
        "username" : username,
        "email" : email,
        "password" : password,
    }

     await axios.post('http://localhost:3000/api/auth/regester',userData)
    .then((response) => {
        console.log(response.data)
    })
    .catch((err) => {
        console.log(err)
    })

    // const response = await fetch('http://localhost:3000/api/auth/regester', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username,
    //     email,
    //     password,
    //   }),
    // })

    // const data = await response.json()
    // console.log(data)

    // if (data.auth === true) {
    //   router.push('/hello')
    // }
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: '20vh' }}
    >
      <Card
        sx={{ maxWidth: 445 }}
        style={{ padding: '5vh', backgroundColor: '#003366' }}
      >
        <h1 style={{ color: 'white' }}>Register</h1>
        <span style={{ color: 'white' }}>Already Registered ? </span>
        {/* <NavLink to="/login" style={{ textDecoration: 'none' }}>
          <Button style={{ backgroundColor: '#f5fffa' }}>Login</Button>
        </NavLink> */}
        <form onSubmit={registerUser}>
          <TextField
            variant="standard"
            value={username}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            style={{ paddingTop: '1vh', width: '50vh' }}
          />
          <br />
          <TextField
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            style={{ paddingTop: '1vh', width: '50vh' }}
          />
          <br />
          <TextField
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            style={{ paddingTop: '1vh', width: '50vh' }}
          />
          <br />
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
			  variant="contained"
              type="submit"
			  style={{marginTop:"1vh"}}
            >
              Register
            </Button>
          </Grid>
        </form>
      </Card>
    </Grid>
  )
}

export default App