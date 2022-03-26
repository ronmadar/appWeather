import React, { useContext, useEffect, useState } from "react";
import { LogineContext } from "../../Contexts/LogineContext";

function Card() {
  const { favourites} = useContext(LogineContext);
  const { temps } = useContext(LogineContext);
  const { mode } = useContext(LogineContext);
  
  const removeItem = (event) => {
    event.preventDefault();
     
  };
  return (
    <div>
      {favourites.map((city_name, index) => (
        <form className="search" onSubmit={removeItem}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <p>{city_name}</p>
              </h5>
              <p className="card-temperature">{temps[index]}F</p>
              <h2 className="card-mode">{mode[index]}</h2>
            </div>
            <input  className="remove-item" type="submit" value="Remove" />
          </div>
        </form>
      ))}
    </div>
  );
}
export default Card;

/*

        <div className="form-search">
        <label>
          Name of city you want to search..?
          <input
            type="text"
            onChange={(e) => {setCity(e.target.value)}}
            placeholder="Search Here.."
          />
        </label>
              <

*/
