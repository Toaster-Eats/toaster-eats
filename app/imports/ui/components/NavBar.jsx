import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image src="/images/logo.png" width="80px" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 justify-content-between">
            <Nav className="justify-content-start">
              <Nav.Link id="about-us-nav" as={NavLink} to="/aboutus" key="about-us">About Us</Nav.Link>
              {currentUser && (
                <>
                  <NavDropdown id="recipes-dropdown" title="Recipes">
                    <NavDropdown.Item id="list-recipes-nav" as={NavLink} to="/recipes">View All Recipes</NavDropdown.Item>
                    <NavDropdown.Item id="add-recipes-nav" as={NavLink} to="/add-recipe">Add a Recipe</NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown id="ingredients-dropdown" title="Ingredients">
                    <NavDropdown.Item id="list-ingredients-nav" as={NavLink} to="/ingredients">View All Ingredients</NavDropdown.Item>
                    <NavDropdown.Item id="add-ingredients-nav" as={NavLink} to="/add-ingredient">Add an Ingredient</NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link id="vendor-nav" as={NavLink} to="/shops">Stores Near Campus</Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="justify-content-end">
              {currentUser === '' ? (
                <NavDropdown id="login-dropdown" title="Login">
                  <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                    <PersonFill /> Sign in
                  </NavDropdown.Item>
                  <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                    <PersonPlusFill /> Sign up
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown id="navbar-current-user" title={currentUser}>
                  <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                    <BoxArrowRight /> Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
