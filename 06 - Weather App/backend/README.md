# backend 
1. weather api => https://openweathermap.org/api
2. Write api
```python
class GetWeather(APIView):

    def get(self,request):
        try:
            lat = request.GET['lat']
            lon = request.GET['lon']
            response = requests.get('https://api.openweathermap.org/data/2.5/forecast', {
                'lat' : lat,
                'lon': lon,
                'appid':'xxxxxxxxxxxxxxxxxx',
                'units': 'metric',
            })

            return Response({'response':response.json()}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message':'the weather not found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


```
3. env
```python
# pip install django-environ
import environ


env = environ.Env(
    # You can set default values here
    DEBUG=(bool, False)
)
environ.Env.read_env()

# views.py
 'appid':settings.API_KEY,

```
4. postman
![forecast with postman](./screenshots/get-forecast-response.png)


# frontend
1.
```jsx
export default function Home() {

  const [data, setData] = useState();
  const getData = async ()=>{
    try {
      const response = await axios.get('http://localhost:8000', {params:{lat:'55.1051724',lon:'-0.5507812'}})
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 
  useEffect(()=>{
    getData()
  },[])
  return (
    <>
    
    </>
  )
}
```
![Frontend network](./screenshots/frontend-network.png)
2. Load data
```jsx
    {data?.response.list.map((day)=><div>{day.dt} {day.main.temp}</div>)}
 
```
3. Format time
```jsx
import moment from 'moment'


 moment.unix(day.dt).format("YYYY-MM-DD")
```
4. Format Jalali
```jsx

import moment from 'moment-jalaali'

 moment.unix(day.dt).format("jDD jMMMM jYYYY") // 12 Bahman 1401
 
// Use persian dialect
moment.loadPersian()
 moment.unix(day.dt).format("jDD jMMMM jYYYY") // ۱۲ بهمن ۱۴۰۱

```
5. How to get user’s location with React JS
*** allow => point is getData() 
```python
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            getData()
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            console.log(result.state);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            if (result.state === "granted") {
              console.log(result.state);
              getData()
            }
          };
        });
    } else {
      alert("Sorry Not available!");
    }

   
  },[])
```
*** current position

![Get Coordinates](./screenshots/getcoordinates-doc.png)

```jsx
// Update geolocation to load the data when user location is available
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(getData) // getCurrentPosition takes a function(position) {} as first parameter
            
            //If granted then you can directly call your function here
          }
          ...
          
// Get user position in params
  const getData = async (pos)=>{
    const crd = pos.coords; // Get coordinates
    try {
      const response = await axios.get('http://localhost:8000', {params:{lat:crd.latitude,lon:crd.longitude}}) // use coordinates for lat/lon
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 
```