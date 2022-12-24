## install
```bash
npx create-next-app frontend

npm run dev

```
## MUI

```bash
npm install @mui/material @emotion/react @emotion/styled @emotion/server @emotion/cache
```

### Create theme
```jsx
// lib/theme.js or src/theme.js
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        ...
    },
});
export default theme;
```
### Create emotion cache
```jsx
// lib/createEmotionCache.js or src/createEmotionCache.js
import createCache from '@emotion/cache';

const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export default createEmotionCache;
```

### Update _document.js
```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionCache from '../lib/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import React from 'react';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
      ...
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
      </Head>
      <body>
        ...
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx) => {

  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
```

### Update _app.js
```jsx

const clientSideEmotionCache = createEmotionCache();


function App({ Component, pageProps, emotionCache = clientSideEmotionCache,  }) {
  return ( <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>)
}
```
## TailWind
1.
```bash

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
2.
```jsx
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3.
```css
/*styles/ globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

```

# React icons

```bash
npm i react-icons
```

# Redux

```bash
npm i redux react-redux redux-persist redux-thunk @reduxjs/toolkit next-redux-wrapper
# create lib/store.js
import { wrapper } from '../lib/store'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
# add wrapper
export default wrapper.withRedux(App)

```

# Axios

```bash
npm i axios

```

```jsx
// .env
BACKEND_BASE_URL=https://localhost:8000
// lib/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.BACKEND_BASE_URL,
  headers: {
    common: {
      'Accept-Language': 'ir',
    },
  },
});

export default axiosInstance

```


### login

```jsx
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "davidattenborough", "password": "boatymcboatface"}' \
  http://localhost:8000/api/token/

// out 
{
  "access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....",
  "refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....."
}


// login
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }));
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.refresh = action.payload.data.refresh;
      state.access = action.payload.data.access;
      
      axios.defaults.headers.common.Authorization = `Bearer ${state.access}`
      return state;
    });

```

## create superuser
```bash
python manage.py createsuperuser
```

## testlogin
```jsx
// network
 const submit =async()=>{
    try {
      await dispatch(login({phone_number:phone,password:pass})).unwrap()
    } catch (error) {
      console.log(error)
    }
   }
// out
access: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxODg3NzU1LCJpYXQiOjE2NzE4ODc0NTUsImp0aSI6IjQ3MGM0MWMzOGRmOTRkYjg5ZDVmMzExNTQ3YmRiMjNmIiwidXNlcl9pZCI6MX0.rq_V_NL6p3r55Fu_ZaRRsFYt_ggVb3G9-bjF-EFV9vU"
refresh:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3MTk3Mzg1NSwiaWF0IjoxNjcxODg3NDU1LCJqdGkiOiIwN2YxYmQyNDk5Nzk0MGQ4ODViOTQ1ZDI5MTExYzczNyIsInVzZXJfaWQiOjF9.noDQlLVPhwbT6jCTLNcWZebwJQoqb5849TgCqXSbW7s"

```

## redux action 
```jsx

action.payload.data.refresh;
```

![Login action](./screenshots/login-redux-action.png)
## redux state
![Login state](./screenshots/login-redux-state.png)
## component & state
![Login components](./screenshots/login-components.png)

# Layout

```jsx
// pages/_app.js


function App({ Component, pageProps, emotionCache = clientSideEmotionCache,  }) {
  const getLayout = Component.getLayout || ((component) => component);  // Add this
  return ( <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        {getLayout(<Component {...pageProps} />)} {/* and this*/}
    </ThemeProvider>
  </CacheProvider>)
}
```


# Setup mui calendare time format
```jsx
function App({ Component, pageProps, emotionCache = clientSideEmotionCache,  }) {
  return ( <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      ...
      </LocalizationProvider>
    </ThemeProvider>
  </CacheProvider>)
}
```