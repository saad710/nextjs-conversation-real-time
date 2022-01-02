import LoginProvider from '../context/AuthContext/LoginProvider'
import '../styles/globals.css'
import { Provider } from "react-redux";
import { configureStore } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={configureStore()}>
    <LoginProvider>
      <Component {...pageProps} />
    </LoginProvider>
    </Provider>
  )
}

export default MyApp
