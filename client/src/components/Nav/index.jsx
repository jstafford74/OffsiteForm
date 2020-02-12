import React from "react";
import { connect } from 'react-redux'
import { Button, Navbar, Nav, Col } from 'react-bootstrap';
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
    fontSize: "1.25rem"

  }

}


const StickyNav = (props) => {
  return <Navbar hover collapseOnSelect expand='lg' style={Style.nav} sticky='top' >
    <Col lg={4}>
      <Navbar.Brand href='/' >Melanoscan</Navbar.Brand>
    </Col>
    <Navbar.Toggle aria-controls='respnav' />
    {/* <Col lg={{ span: 6, offset: 2 }} > */}
    <Navbar.Collapse id='respnav' className='justify-content-end'  >
      <Nav fill>
        <Nav.Link style={Style.nav} href="#home">How it Works</Nav.Link>
        <Nav.Link style={Style.nav} href="#features">About Us</Nav.Link>
        <Nav.Link style={Style.nav} href="#pricing">Contact Sales</Nav.Link>
        {
          props.user ?
            <Button onClick={props.onLogout}>Logout</Button> :
            <Link to={"/login"}>
              <Button size='lg' variant='danger'>Login</Button>
            </Link>
        }
      </Nav>
    </Navbar.Collapse>

    {/* </Col> */}

  </Navbar >;

};

export default connect(
  // mapStateToProps
  state => ({ user: state.user.details }),
  // mapDispatchToProps
  { onLogout }
)(StickyNav);
