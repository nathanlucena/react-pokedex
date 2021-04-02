import React  from "react";
import './style.css';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Header(props) {

  return (
    <>
    <div className="footer" >
      <a className="linkApi" target="__blank" href="https://pokeapi.co/">Data from pokeapi.co</a>
      <a className="linkGit" target="__blank" href="https://github.com/nathanlucena">Create from: Nathan Lucena <GitHubIcon style={{ fontSize:15 }} padding="20px"/> </a>
    </div>
 </>
  );
}


