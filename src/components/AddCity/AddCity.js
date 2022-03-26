import React, { useContext } from "react";
import { LogineContext } from "../../Contexts/LogineContext";

function AddCity() {

  const {setFavorites} = useContext(LogineContext);
  const {city} = useContext(LogineContext);

  return (
    <div className="Favorites">
          <button
        className="button_add_city_ToFavorites"
        onClick={() => {
          setFavorites((arr) => [...arr, city ]);
        }}
      >
        Add To Your Favorits
      </button>      
    </div>
  );
}
export default AddCity;
