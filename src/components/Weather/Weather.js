import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from "axios";
import { LogineContext } from "../../Contexts/LogineContext";
import './Weather.css'
import AddCity from "../AddCity/AddCity";
function Weather() {
  const { city, setCity } = useContext(LogineContext);
  const [citiesList, setCitiesList] = useState([]);
  const { setMode } = useContext(LogineContext);
  const { days, setDays } = useContext(LogineContext);
  const { temps, setTemps } = useContext(LogineContext);


  /*   <input
              type="text"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              placeholder="Search Here.."
            />
            */
  let location_key = "";
  let city_name = ``;
  useEffect(() => {
    city_name = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=1ML7egvWkyu72pXVOngOIP7SAfokzbCI
    &q=${city}`;
    
    console.log("cities list : ");
    console.log(citiesList);
    //console.log(citiesList);
  });

  const handleSubmit = (event) => {

    event.preventDefault();

    axios
      .get(city_name)
      .then((response) => {
        location_key = response.data[0].Key;
        console.log(location_key);
      })
      .then(() => {
        axios
          .get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=WgmRgAbCkHnZxuAAc6ikInRiNPU4VhXE`
          )
          .then((res) => {
            res.data.DailyForecasts.forEach((element) => {
              const tmp_date = element.Date;

              const tmp_day = new Date(tmp_date);
              const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              };

              const tmp_date_name = tmp_day.toLocaleDateString(
                "en-US",
                options
              );
              const myMode = element.Day.IconPhrase;
              const day = tmp_date_name.split(",")[0];
              const tmp_unit = element.Temperature.Maximum.Unit;
              const temp = element.Temperature.Maximum.Value;
              
                setDays((arr) => [...arr, day]);
                setTemps((arr) => [...arr, temp]);
                setMode((arr) => [...arr, myMode]);
              
              console.log("day " + day);
            });
          });
      });
  };
 

   //auto complete settings
  let items = [];

  const handleOnSearch = (string, results) => {
    setCity(string);
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = (event) => {
    console.log('Focused')
    setDays([])
    setTemps([])
    setMode([])
    axios
      .get(city_name)
      .then((response) => {
        location_key = response.data[0].Key;
        console.log(location_key);
      })
      .then(() => {
        axios
          .get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=WgmRgAbCkHnZxuAAc6ikInRiNPU4VhXE`
          )
          .then((res) => {
            res.data.DailyForecasts.forEach((element) => {
              const tmp_date = element.Date;

              const tmp_day = new Date(tmp_date);
              const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              };

              const tmp_date_name = tmp_day.toLocaleDateString(
                "en-US",
                options
              );
              const myMode = element.Day.IconPhrase;
              const day = tmp_date_name.split(",")[0];
              const tmp_unit = element.Temperature.Maximum.Unit;
              const temp = element.Temperature.Maximum.Value;
              
              setDays((arr) => [...arr, day]);
              setTemps((arr) => [...arr, temp]);
              setMode((arr) => [...arr, myMode]);
              
           
              
              console.log("day " + day);
            });
          });
      });
  }
  let count = 0;
  const formatResult = (setCitiesList) => {
    
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }} key={count + 1}>name: {setCitiesList}</span>
      </>
    )
  }
  return (
      <div className="weather-container">
    
 
      <form className="search" onSubmit={handleSubmit}>
        <div className="form-search">
          <label>
            Name of city you want to search..?
            <ReactSearchAutocomplete
            items={citiesList[0]}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
          </label>
          
        </div>
      </form>
      <AddCity />
      <div className="wrap-cards">
      {days.map((tmp_city_name, index) => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <p>{tmp_city_name}</p>
              </h5>
              <p className="card-temperature">{temps[index]}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      
   
  );
}
export default Weather;
