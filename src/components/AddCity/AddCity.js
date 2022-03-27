import React, { useContext } from "react";
import { LogineContext } from "../../Contexts/LogineContext";

function AddCity() {

  const {setFavourites} = useContext(LogineContext);
  const {city} = useContext(LogineContext);


  return (

        <button
        className="add_to_favourites"
        onClick={() => {
          setFavourites((arr) => [...arr, city ]);
        }}
      >
        Add To Your Favorits
      </button>      

  );
}
export default AddCity;
