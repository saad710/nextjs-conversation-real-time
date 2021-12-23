import { Button, Card, Grid, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'



function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
//   const { setUserData } = useContext(LoginContext)
//   const { auth, setAuth } = useContext(AuthContext)

  async function loginUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()
    console.log(data)

    if (data.auth === true) {
      localStorage.setItem('token', data.token)
      // alert('Login successful')
      router.push("/test")
    } else {
      // alert('Please check your username and password')
      router.push('/login')
    }
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
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h1 style={{ color: 'white' }}>Login</h1>
          <Link href="/register" style={{ textDecoration: 'none' }} passHref>
            <Button style={{ backgroundColor: '#f5fffa' }}>Register</Button>
          </Link>
        </Grid>
        <form onSubmit={loginUser}>
          <TextField
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            style={{backgroundColor: 'white', borderRadius: '5px', margin:'0.5vh',padding:'0.5vh',width:"30vh" }}
          />
          <br />
          <TextField
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            style={{backgroundColor: 'white', borderRadius: '5px', margin:'0.5vh',padding:'0.5vh',width:"30vh" }}
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
              Login
            </Button>
          </Grid>
        </form>
      </Card>
    </Grid>
  )
}

export default App