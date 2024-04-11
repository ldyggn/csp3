import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
  // Accessing user context
  const { user } = useContext(UserContext);

  return (
    // Navbar component
    <Navbar className='custom-navbar' expand="lg">
      {/* Container for navbar content */}
      <Container fluid className="navbar-container"> 
        {/* Brand/logo */}
        <Navbar.Brand as={Link} to="/">Glow Girl</Navbar.Brand>
        {/* Navbar toggle button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        {/* Navbar content */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation links */}
          <Nav className="ms-auto">
            {/* Home link */}
            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
            {/* Products link */}
            <Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>
            {/* Conditional rendering based on user authentication */}
            {user.id !== null ? (
              // If user is authenticated
              user.isAdmin ? (
                // If user is admin
                <>
                  {/* Add Product link */}
                  <Nav.Link as={Link} to="/addProduct">Add Product</Nav.Link>
                   {/* Order History link */}
                   <Nav.Link as={Link} to="/order">Order History</Nav.Link>
                  {/* Logout link */}
                  <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                </>
              ) : (
                // If user is not admin
                <>
                  {/* Account link */}
                  <Nav.Link as={NavLink} to="/account" exact="true">Account</Nav.Link>
                  {/* Logout link */}
                  <Nav.Link as={Link} to="/logout" exact="true">Logout</Nav.Link>
                </>
              )
            ) : (
              // If user is not authenticated
              <>
                {/* Login link */}
                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                {/* Register link */}
                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
