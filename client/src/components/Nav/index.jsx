import React from "react";
import { connect } from 'react-redux'
import { Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { onLogout } from '../../redux/actions'

const Style = {
  nav: {
    backgroundColor: "white",
    fontSize: "1.25rem",
    color: "black"

  },
  navLink: {
    color: "black",
    fontSize: "1.25rem",

  }
}
const StickyNav = (props) => {
  return <Navbar className="justify-content-end" style={Style.nav} sticky='top' >
    <Navbar.Brand href="/" >Melanoscan</Navbar.Brand>
    <Nav >
      <Nav.Link style={Style.nav} href="#home">How</Nav.Link>
      <Nav.Link style={Style.nav} href="#features">About Us</Nav.Link>
      <Nav.Link style={Style.nav} href="#pricing">Contact Sales</Nav.Link>
      {
        props.user ?
          <Button onClick={props.onLogout}>Logout</Button> :
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
      }
    </Nav>
  </Navbar>;

};

export default connect(
  // mapStateToProps
  state => ({ user: state.user.details }),
  // mapDispatchToProps
  { onLogout }
)(StickyNav);
