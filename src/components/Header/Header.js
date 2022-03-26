import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import Weather from '../Weather/Weather'
import Favorites from "../Favorites/Favorites";
function Header() {

  return (

    <div className="conteiner-header">
      <h4 className="header-HEROLO">Herolo Weather Task</h4>
       <Link id="favorites_btn" className="btn btn-primary" to="/Weather">Weather</Link>
       <Link className="btn btn-primary" id="home_btn" to="/Favorites">Favorites</Link>
      <p className="border-line"></p>
    </div>

 
  );
}

export default Header;
