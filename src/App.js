import React from "react";
import { useEffect,useState } from "react";
import { LogineContext } from "./Contexts/LogineContext";
import Weather from "./components/Weather/Weather";
import Header from "./components/Header/Header";
import Favorites from "./components/Favorites/Favorites";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  withRouter,
  Route,
} from "react-router-dom";

function App() {
  const [temps, setTemps] = useState([]);
  const [mode, setMode] = useState([]);
  const [city, setCity] = useState("");
  const [favourites, setFavorites] = useState([]);



  return (
    <div className="App">
      <LogineContext.Provider
        value={{
          city,
          setCity,
          temps,
          setTemps,
          mode,
          setMode,
          favourites,
          setFavorites,
        }}
      >
        <Router>
          <Header />

          <Switch>
            <Favorites path="/Favorites" component={withRouter(Favorites)} />
            <Weather path="/Weather" component={withRouter(Weather)} />
          </Switch>
        </Router>
      </LogineContext.Provider>
    </div>
  );
}

export default App;
