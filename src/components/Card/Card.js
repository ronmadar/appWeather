import React, { useContext, useEffect, useState } from "react";
import { LogineContext } from "../../Contexts/LogineContext";

function Card() {
  const { favourites,setFavourites } = useContext(LogineContext);
  const { temps } = useContext(LogineContext);
  const { mode } = useContext(LogineContext);

  useEffect(() => {
    console.log(favourites)
  });

  const removeCard = (e) => {
    console.log("card removed!")
    const name = e.target.getAttribute("name")   
    setFavourites(favourites.filter(item => item !== name))
    console.log(name)
  }

 
  return (
    <div>
      {favourites.map((city_name, index) => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <p>{city_name}</p>
              </h5>
              <p className="card-temperature">{temps[index]}F</p>
              <h2 className="card-mode">{mode[index]}</h2>
              <button onClick={removeCard} name={city_name}>remove card</button>
            </div>           
          </div>
        
      ))}
      
    </div>
  );
}
export default Card;
