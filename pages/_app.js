import LoginProvider from '../context/AuthContext/LoginProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <LoginProvider>
      <Component {...pageProps} />
    </LoginProvider>
  )
}

export default MyApp
