import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar-padding">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/images/logo.png" width="80px" alt="Logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? (
              <>
                <NavDropdown id="recipes-dropdown" title="Recipes">
                  <NavDropdown.Item id="list-recipes-nav" as={NavLink} to="/recipes" key="list-recipes">
                    View All Recipes
                  </NavDropdown.Item>
                  <NavDropdown.Item id="add-recipes-nav" as={NavLink} to="/add-recipe" key="add-recipe">
                    Add a Recipe
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown id="ingredients-dropdown" title="Ingredients">
                  <NavDropdown.Item id="list-ingredients-nav" as={NavLink} to="/ingredients" key="list-ingredients">
                    View All Ingredients
                  </NavDropdown.Item>
                  <NavDropdown.Item id="add-ingredients-nav" as={NavLink} to="/add-ingredient" key="add-ingredient">
                    Add an Ingredient
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link id="vendor-nav" as={NavLink} to="/vendor" key="vendor">Stores Near Campus</Nav.Link>
              </>
            ) : null}

            {/* eslint-disable-next-line no-nested-ternary */}
            {Meteor.userId() ? (
              Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
                <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Store Profile</Nav.Link>
              ) : (
                <Nav.Link id="your-profile-nav" as={NavLink} to="/your-profile" key="your-profile">Your Profile</Nav.Link>
              )
            ) : null}

          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
