import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ImageAddNavItem from "./ImageAddNavItem.jsx";
import SearchBar from "./SearchBar.jsx";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#'>Feeds</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='navbarScroll' className='justify-content-between'>
          <Nav>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className='justify-content-end'>
            <SearchBar />
            <ImageAddNavItem />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;