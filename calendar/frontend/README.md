# Calendar app (React/Django)

![Calendar](./screenshots/final-calendar.png)
## ADD New task
![New task](./screenshots/final-new.png)
## Tasks
![Tasks](./screenshots/final-tasks.png)

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

![persist](./screenshots/persist.png)

```jsx
// lib/store.js
  const isClient = typeof window !== 'undefined';
  let mainReducer = rootReducer

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage,
    };

    const persistedReducers = persistReducer(persistConfig, rootReducer); // Wrapper reducers: if incoming actions are persist actions, run persist commands otherwise use rootReducer to update the state
    mainReducer = persistedReducers
  }

  const store = configureStore({ reducer: mainReducer, preloadedState: initialState, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) });

  if (isClient) {
    store.__PERSISTOR = persistStore(store);
  }
  // _app.js
   const store = useStore();

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


```

### refresh token 
`Error: Authentication credentials were not provided.`
```jsx
npm i axios-auth-refresh
// axios.js
export const setupInterceptors = (store) => {
 

  createAuthRefreshInterceptor(axiosInstance, async (failedRequest) => {
    const resp = await axiosInstance.post("/auth/refresh/", {
      refresh: store.getState().authReducer?.refresh,
    });
    const { access: accessToken } = resp.data;
    const bearer = `${process.env.JWT_AUTH_HEADER ?? "Bearer"} ${accessToken}`;
    console.log(accessToken);
    axiosInstance.defaults.headers.common.Authorization = bearer;

    failedRequest.response.config.headers.Authorization = bearer;
    return Promise.resolve();
  });
};

export default axiosInstance;
// _app.js
import { setupInterceptors } from '../lib/axios';
function App({ Component, pageProps, emotionCache = clientSideEmotionCache,  }) {
  
  const store = useStore();

  setupInterceptors(store)

```

## logout
```jsx
// lib/slices/*.js
export const { reset } = authSlice.actions
// lib/utils.js
import axiosInstance from './axios'


export const logout = (dispatch) => {
  dispatch(require('./slices/task').reset())
  dispatch(require('./slices/auth').reset())

  delete axiosInstance.defaults.headers.common.Authorization 
}
// components/navbar
 <ListItem >
  <ListItemButton onClick={() => logout(dispatch)}>
    <ListItemText primary={"Logout"} />
  </ListItemButton>
</ListItem>

// route to login page
<ListItemButton onClick={() => {
  logout(dispatch)
  router.push('/auth/login')
}}>
  <ListItemText primary={"Logout"} />
</ListItemButton>

// After refresh token is expired, logout
// lib/axios.js

export const setupInterceptors = (store) => {
  createAuthRefreshInterceptor(axiosInstance, async (failedRequest) => {
    try {
      const resp = await axiosInstance.post("/auth/refresh/", {
        refresh: store.getState().authReducer?.refresh,
      });
      const { access: accessToken } = resp.data;
      const bearer = `${process.env.JWT_AUTH_HEADER ?? "Bearer"} ${accessToken}`;
      console.log(accessToken);
      axiosInstance.defaults.headers.common.Authorization = bearer;
  
      failedRequest.response.config.headers.Authorization = bearer;
      return Promise.resolve();
    } catch(e) {
      logout(store.dispatch)
    }
  });
};
```

## tasks
show tasks on specific day


### backend
```python
pip install django-filter

from django_filters.rest_framework import DjangoFilterBackend

class TaskView(mixins.CreateModelMixin,mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = {
        'date': ['date',],
    }


```

### frontend

```jsx

// listTask
export const listTask = createAsyncThunk(
  "task/list",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/task/task/`,{params:{ 
        // if data = { date }
        // date__date__exact: data.date
        // or
        // if data = { date__date__exact }
        ...data
      }});

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
// components/calender
 <CalendarPicker
//  state => [day ,selectedDays]
        renderDay={(day, selectedDays, pickersProps) => {
          return (
            <CustomDay
           ....
            />
          );
        }}
       
      />
// 
const CustomDay = (props) => {
....
  const tasks = useSelector((state) => state.taskReducer?.tasks);
  const loading = useSelector((state) => state.taskReducer?.loading);
  const List = async () => {
    try {
      await dispatch(
        listTask({
          date__date: format(day, "yyyy-MM-dd"),
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PickersDay
        day={day}
        selectedDays={selectedDays}
        {...pickersProps}
        onClick={(e) => {
          setOpen(true);
          // setAnchorEl(e.target);
          List();
        }}
      />
      {open && (
        <Menu open={open} onClose={() => setOpen(false)} anchorEl={ref.current}>
          {loading == false &&
            tasks?.map((t) => (
              <ListItem>
                <ListItemText primary={t.name} />
              </ListItem>
            ))}

          {loading && (
            <div className="p-3 flex-col flex gap-2">
              <Skeleton variant="rounded" width={100} height={16} />
              <Skeleton variant="rounded" width={100} height={16} />
            </div>
          )}
        </Menu>
      )}
    </>
  );
};
```

## create redux
```jsx
// createTask
export const createTask = createAsyncThunk(
  "task/create",
  async (data, thunkAPI) => {
    try {
    ...

      return { data: response.data }; // action.paylod.data =>  data: response.data
    } catch (error) {
     ...
    }
  }
);
// => return above func => action.paylod

builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks =[...state.tasks, action.payload.data]; 


      return state;
    });


```

action.payload.data is object
![Action Payload](./screenshots/create-action-payload.png)

add object to end of list
```jsx
  state.tasks =[...state.tasks, action.payload.data]; 
```

## Complete Tasks
### backend
```python
class TaskView(mixins.UpdateModelMixin, ...,viewsets.GenericViewSet):
  ...

```

### frontend

```jsx
// lib/slices/task.js

// updateTask
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.patch(`/task/task/${id}/`, { ...data });

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

builder.addCase(updateTask.fulfilled, (state, action) => {
  // state.loading = false;
  state.tasks = [
    ...state.tasks.filter((item) => item.id != action.payload.data.id),
    action.payload.data,
  ].sort((a, b) => a.id - b.id); // to fix ordering after update(page glitch)

  return state;
});

// components/Calendar.jsx
const Togglecheck = async (z) => {
  try {
    await dispatch(
      updateTask({
        // ...z,
        id: z.id,
        task_complete: z.task_complete ? false : true,
      })
    ).unwrap();
    setOpenDialog(false);
  } catch (error) {
    console.log(error);
  }
};

{loading == false &&
  tasks &&
  tasks?.map((t) => (
    <ListItem key={t.id}>
      <ListItemIcon className="justify-center">
        <Checkbox
          checked={t.task_complete} // Load state
          onChange={() => Togglecheck(t)} // Update state
        />
      </ListItemIcon>
      <ListItemText primary={t.name} secondary={t.description} />
    </ListItem>
  ))}


```

## Show badge on days with task

```
Data:
[
  { date: '2022-12-1' },
  { date: '2022-12-6' },
  { date: '2022-11-19' },
]
```

### backend

```python
# views.py
class CalendarView(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = CalenderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = (Task.objects
                      .filter(user=user) # filter for user
                      .values('date__date') # create a new column, date => 2022-12-19
                      .annotate(count=Count('date__date')) # Group by date__date, count each day
                ) # 2020/5/14
        print(queryset)
        return queryset

# serializers.py

class CalenderSerializer(serializers.Serializer):
    date = serializers.DateField(source='date__date')

##########
### OR ###
##########
# views.py

class CalendarView(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = CalenderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Task.objects.filter(user=user) \
          .annotate(day=F("date__date")) \
            .values('day') \
              .annotate(count=Count('day'))
        print(queryset)
        return queryset


# serializers.py
class CalenderSerializer(serializers.Serializer):
    day = serializers.DateField()

```

### frontend

```jsx
// lib/slices/task.js
// listDays
export const listDays = createAsyncThunk(
  "task/list-days",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/task/days/`);

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
builder.addCase(listDays.fulfilled, (state, action) => {
  state.loading = false;
  state.days = action.payload.data;

  return state;
});

// components/Calendar.jsx

const CustomDay = (props) => {
  const days = useSelector((state) => state.taskReducer?.days);
  // console.log(days, days?.map(item=>item.date == format(day, "yyyy-MM-dd")), format(day, "yyyy-MM-dd"))
  const hasTasks =
    days?.findIndex((item) => item.date == format(day, "yyyy-MM-dd")) > -1;

  <Badge color="secondary" variant="dot" invisible={!hasTasks}>
    <PickersDay
      day={day}
      selectedDays={selectedDays}
      {...pickersProps}
      ref={ref}
      onClick={(e) => {
        setOpen(true);
        // setAnchorEl(e.target);
        List();
      }}
    />
  </Badge>
}

export default function Calendar(props) {
  const dispatch = useDispatch();

  const getDays = async () => {
    try {
      await dispatch(listDays()).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDays();
  }, []);
  ...
}
```

### edit

## backend

```python
class TaskView(UpdateModelMixin,viewsets.GenericViewSet):
  pass

```

## frontend
```jsx
//redux
// updateTask
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.patch(`/task/task/${id}/`, { ...data });

      console.log(response, response.data);

      return { data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);
//
  builder.addCase(updateTask.fulfilled, (state, action) => {
      // state.loading = false;
      state.tasks = [
        ...state.tasks.filter((item) => item.id != action.payload.data.id),
        action.payload.data,
      ].sort((a, b) => a.id - b.id);

      return state;
    });

// create component pencil for having seprate state
//  which fields update => name,des,checkbox
update => name.des , setEdit(false) // remove textfield
Togglecheck => checkbox //  <Checkbox checked={row.task_complete} onChange={(e)=>Togglecheck(e.target.checked)}/>

// with enter change data
 <form onSubmit={(e)=>update(e)}>
        ...
          </form>
//
const update = async (e) => {
    e.preventDefault()
    try {
      await dispatch(
        updateTask({
          ...total, // => use all the fields in the state
          id: row.id,
         
        })

      ).unwrap();
     
  };
```

## Get date from url

```jsx
  const {date} = router.query

  const totalState = useMemo(() => {
    if (date) {
      const day = new Date(date)
      return day
    } else return new Date()
  }, [date])

  useEffect(() => {
    List()
  }, [])

  const calYearPlus = () => {
    const newDay = addDays(totalState, 1);
    // setTotalState(newDay);
    List(newDay);
    router.push({
      pathname: '/tasks',
      query: { date:format(newDay, "yyyy-MM-dd")  },
    })
  };

  const calYearNeagative = () => {
    const newDay = addDays(totalState, -1);
    // setTotalState(newDay);
    List(newDay);
    router.push({
      pathname: '/tasks',
      query: { date:format(newDay, "yyyy-MM-dd")  },
    })
  };
```
## weekends
### frontend
```jsx
// components/calender
import isWeekend from "date-fns/isWeekend";
const StyledPickersDay = styled(PickersDay)(({ theme, selected, weekend, holiday }) => ({


  ...(weekend && {
    color: theme.palette.warning.main,
  }),
  ...(weekend && selected && {
    color: 'white',
    // backgroundColor: `${theme.palette.warning.light} !important`,
  }),
  
}))

  <StyledPickersDay
  
    
    weekend={isWeekend(day)}
    ...
  />
```
## holidays
```bash
npm i date-holidays

```
### frontend
```jsx
import Holidays from 'date-holidays'
// components/calender
const StyledPickersDay = styled(PickersDay)(({ theme, selected, weekend, holiday }) => ({
 

  ...(holiday && {
    color: 'white',
    '&.MuiPickersDay-root': {
      backgroundColor: `${theme.palette.warning.light}`,
    },
  }),
}))

const holidays = new Holidays('US', 'la', 'no')
  <StyledPickersDay
  ...
    
    holiday={holidays.isHoliday(day)}

  />
```

