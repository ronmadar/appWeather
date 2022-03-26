import React from "react";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import {LogineContext} from "../../Contexts/LogineContext";

import AddCity from "../AddCity/AddCity";
function Weather() {
  const {city, setCity} = useContext(LogineContext);
  const {setMode} = useContext(LogineContext);

  const [days, setDays] = useState([]);
  const {temps, setTemps} = useContext(LogineContext);

  let city_name = ``;
  useEffect(() => {
    city_name = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=IVVy4Zmest5UwkAn5cGBW5G0X0g9AgSG
    &q=${city}`;

  });


  const handleSubmit = (event) => {
    event.preventDefault();
    let location_key = "";

    axios
      .get(city_name)
      .then((response) => {
        location_key = response.data[0].Key;
      })
      .then(() => {
        axios
          .get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=IVVy4Zmest5UwkAn5cGBW5G0X0g9AgSG
            `
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
              const myMode = element.Day.IconPhrase
              const day = tmp_date_name.split(",")[0];
              const tmp_unit = element.Temperature.Maximum.Unit;
              const temp = element.Temperature.Maximum.Value;
              setDays((arr) => [...arr, day]);
              setTemps((arr) => [...arr, temp]);
              setMode((arr) => [...arr,myMode])
             
            });
          }); 
      });
  };


  return (
    <div className="weather-container ">

      <div>
        <AddCity/>
      </div>

      <form className="search" onSubmit={handleSubmit}>
        <div className="form-search">
        <label>
          Name of city you want to search..?
          <input
            type="text"
            onChange={(e) => {setCity(e.target.value)}}
            placeholder="Search Here.."
          />
        </label>
        <input type="submit" value="Submit" />
        </div>
      </form>

      <div className="weather-container">
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
