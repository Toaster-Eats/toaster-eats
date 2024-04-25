import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

// Custom inline style for proper horizontal alignment
const inlineStyle = {
  display: 'flex',
  alignItems: 'center',
};

const customNavDropdownStyle = {
  paddingRight: '5px', // Adjust this value to bring the dropdown arrow closer to the text
};

const NavBar = () => {
  const { currentUser, userId } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    userId: Meteor.userId(),
  }), []);

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar-padding">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <div style={inlineStyle}>
            <Image src="/images/logo.png" width="80px" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? (
              <>
                <NavDropdown className="custom-dropdown" title="Recipes" id="recipes-dropdown" style={customNavDropdownStyle}>
                  <NavDropdown.Item as={NavLink} to="/recipes">All Our Recipes!</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/add-recipe">Add a Recipe!</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown className="custom-dropdown" title="Ingredients" id="ingredients-dropdown" style={customNavDropdownStyle}>
                  <NavDropdown.Item as={NavLink} to="/ingredients">All Available Ingredients!</NavDropdown.Item
                  >
                  <NavDropdown.Item as={NavLink} to="/add-ingredient">Add an Ingredient!</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link id="vendor-nav" as={NavLink} to="/vendor">Stores Near Campus</Nav.Link>
              </>
            ) : null}

            {userId && Roles.userIsInRole(userId, 'vendor') ? (
              <Nav.Link id="admin-nav" as={NavLink} to="/admin">Store Profile</Nav.Link>
            ) : null}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown className="custom-dropdown" id="login-dropdown" title="Login">
                <NavDropdown.Item id="signin-nav" as={NavLink} to="/signin">
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="signup-nav" as={NavLink} to="/signup">
                  <PersonPlusFill /> Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown className="custom-dropdown" id="current-user-dropdown" title={currentUser}>
                <NavDropdown.Item id="signout-nav" as={NavLink} to="/signout">
                  <BoxArrowRight /> Sign out
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
