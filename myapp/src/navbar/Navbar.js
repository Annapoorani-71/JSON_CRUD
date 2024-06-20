import React from "react";
import "./styles.css";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export default function NavBar() {
  return (
    <div className="NavBar">
      <div className="menuVisible">
        <Link to="/" className="NavItems">
          Home
        </Link>
        <Link to="/about" className="NavItems">
          About
        </Link>
        <Link to="/gallery" className="NavItems">
          Uploading 
        </Link>
        <Link to="/update" className="NavItems">
          Updating 
        </Link>
        <Link to="/gallery" className="NavItems">
          Deleting 
        </Link>
      </div>
      <div className="burgerVisible">
        <Menu>
          <Link to="/" className="menu-items">
            Home
          </Link>
          <Link to="/about" className="menu-items">
            About
          </Link>
          <Link to="/gallery" className="menu-items">
            Gallery
          </Link>
         
        </Menu>
      </div>
    </div>
  );
}
