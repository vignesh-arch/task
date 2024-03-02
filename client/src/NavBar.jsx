import React from "react";
import { Navbar, Nav, Col, Row, Container } from "react-bootstrap";
import ImageAddNavItem from "./ImageAddNavItem.jsx";
import SearchBar from "./SearchBar.jsx";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand='lg' className='justify-content-between'>
      <Container fluid>
        <Navbar.Brand href='#'>Feeds</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Nav.Item style={{width:'300px'}}>
              <SearchBar />
            </Nav.Item>
            <ImageAddNavItem />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
