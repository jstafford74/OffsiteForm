import React from 'react';

const Style ={
  foot:{
    minHeight:'10vh',
    backgroundColor:'Orange',
    color:'black',
    textAlign:'center',
    fontSize:'1.2rem',
    marginTop:10
  }
}
const Footer = () => (
    <footer className="footer" style={Style.foot}>
      <p>Melanoscan, LLC  Copyright 2020  </p>
    </footer>
  );

  export default Footer;