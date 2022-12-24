import { wrapper } from '../lib/store'
import '../styles/globals.css'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../lib/createEmotionCache';
import theme from '../lib/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const clientSideEmotionCache = createEmotionCache();


function App({ Component, pageProps, emotionCache = clientSideEmotionCache,  }) {
  const getLayout = Component.getLayout || ((component) => component); 
  return ( <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {getLayout(<Component {...pageProps} />)}
      </LocalizationProvider>
    </ThemeProvider>
  </CacheProvider>)
}
export default wrapper.withRedux(App)
