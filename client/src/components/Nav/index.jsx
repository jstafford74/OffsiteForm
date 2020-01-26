import React from "react";
import { connect } from 'react-redux'
import { Button, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { onLogout } from '../../redux/actions'

const Nav = (props) => {
  return   <Navbar sticky='top' className='navbar-expand-lg navbar-warning bg-success justify-content-between'>
  <Navbar.Brand href="/" className="text-secondary">Mobile Skin Examinations by Melanoscan</Navbar.Brand>
  {
    props.user ?
      <Button onClick={props.onLogout}>Logout</Button> :
      <Link to={"/login"}>
        <Button>Login</Button>
      </Link>
  }
</Navbar>;
};

export default connect(
  // mapStateToProps
  state => ({user: state.user.details}),
  // mapDispatchToProps
  { onLogout }
)(Nav);
