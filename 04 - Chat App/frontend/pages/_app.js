import { setupInterceptors } from '../lib/axios';
import { wrapper } from '../lib/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';
import '../styles/globals.css'

function App({ Component, pageProps }) {
  const store = useStore();

  setupInterceptors(store)
  return <PersistGate persistor={store.__PERSISTOR} loading={null}> <Component {...pageProps} /></PersistGate>
}


export default wrapper.withRedux(App)
