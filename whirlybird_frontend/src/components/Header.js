import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import Logo from './resources/Logo_green.svg'
import ProfileAvatar from './resources/profile_avatar.png'

const Header = (props) => {
  return (
    <Router>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/"><img src={Logo} alt="WhirlyBird logo" style={{height: '2rem'}}/></NavbarBrand>
            <Nav className="ml-auto">
            <NavItem>
              <NavLink className="text-light" href="/profile"><img src={ProfileAvatar} alt="profile" style={{height: '2rem'}}/></NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    </Router>
  );
};

export default Header;