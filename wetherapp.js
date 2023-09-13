import React, {useEffect, useState} from "react";
import regent from '../API/Wetherapp/Regen.png'
import sonny from '../API/Wetherapp/sonnny.png'
import Beewolk from '../API/Wetherapp/partly_cloudy.png'
import background from '../API/Wetherapp/backgrand.jpg'
import backgroundcloudy from '../API/Wetherapp/bewolk.jpg'
import './wetharapp.css';


export default function WeatherApp() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [error, setError] = useState(null);
    const [logo, setlogo] = useState('');
    const [logo2, setlogo2] = useState('');

    const searchPress = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=0a98bc21b2038f7b5fd27a83d78b23a2`
    )
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((result) => {
                setWeather(result);
                console.log(result)
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("City not found");
                setWeather({});
            });
    };
    useEffect(()=>{

          if (weather.weather && weather.weather[0].description ==="clear sky"){
                setlogo(sonny)

        }else if (weather.weather && weather.weather[0].description === "few clouds"){
               setlogo(Beewolk)
          }else if (weather.weather && weather.weather[0].description === "scattered clouds"){

                 setlogo(Beewolk)
          }else if (weather.weather && weather.weather[0].description === "overcast clouds"){
              setlogo(Beewolk)
          }else if (weather.weather && weather.weather[0].description === "light rain"){
              setlogo(regent)
          }
    })
    useEffect(()=>{

        if (weather.weather && weather.weather[0].description ==="clear sky"){
            setlogo2(background)
        }else if (weather.weather && weather.weather[0].description === "few clouds"){
            setlogo2(backgroundcloudy)
        }else if (weather.weather && weather.weather[0].description === "scattered clouds"){
            setlogo2(backgroundcloudy)
        }else if (weather.weather && weather.weather[0].description === "overcast clouds"){
            setlogo2(backgroundcloudy)
    }})


    return (
        <div className='dvi' style={{backgroundImage:`url(${logo2})`,
        }}> <div   className='appm' >

            <h1 >Weather App.....</h1>
            <div className='butin' >

                <input
                    type="search"
                    placeholder="Search..."
                    onChange={(event) => setSearch(event.target.value)}
                />
                <button onClick={searchPress} className='but'>Search</button>
            </div>
            {error ? (
                <div>
                    <p>{error}</p>

                </div>
            ) : (
                <div>

                    <h2>{weather.name}</h2>
                    <p>{weather.main && weather.main.temp}°C</p>
                    <p>{weather.weather && weather.weather[0].description  }</p>
                       <p>{weather.description}</p>
                      <img src={logo}/>

                </div>

            )}
        </div>
        </div>
    );
}