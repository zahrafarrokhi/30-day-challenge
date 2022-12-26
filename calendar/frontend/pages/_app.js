import { wrapper } from '../lib/store'
import '../styles/globals.css'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../lib/createEmotionCache';
import theme from '../lib/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';
import { setupInterceptors } from '../lib/axios';

const clientSideEmotionCache = createEmotionCache();


function App({ Component, pageProps, emotionCache = clientSideEmotionCache,  }) {
  const getLayout = Component.getLayout || ((component) => component); 
  const store = useStore();

  setupInterceptors(store)

  return (
    <PersistGate persistor={store.__PERSISTOR} loading={null}>
 
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {getLayout(<Component {...pageProps} />)}
      </LocalizationProvider>
    </ThemeProvider>
  </CacheProvider>
  </PersistGate>)
}
export default wrapper.withRedux(App)
