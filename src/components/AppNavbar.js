import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);


  return (
    <Navbar className='custom-navbar' expand="lg">
      <Container fluid className="navbar-container"> 
        <Navbar.Brand as={Link} to="/">Glow Girl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
            {(user.id !== null) ?
              user.isAdmin ?
              <>
                <Nav.Link as ={Link} to="/addProduct">Add Product</Nav.Link>
                <Nav.Link as ={Link} to="/logout">Logout</Nav.Link>
              </>
              :
              <>
                <Nav.Link as={NavLink} to="/account" exact>Account</Nav.Link>
                <Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
              </>
              :
              <>
                <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}