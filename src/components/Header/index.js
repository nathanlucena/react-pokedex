import React  from "react";
import logo from '../../assets/logo.png'
import './style.css';

export default function Header(props) {

  return (
    <>
    <a href="http://localhost:3000/" className="logo-container" >
      <img className="image" src={logo} alt="Pokemon title"/>
    </a>
    <div>

    </div>
 </>
  );
}


