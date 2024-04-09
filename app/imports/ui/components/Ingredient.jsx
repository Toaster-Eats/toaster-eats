import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Ingredient = ({ ingredient, notes }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={ingredient.image} width={75} />
      <Card.Title>{ingredient.name} </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>{ingredient.description}</Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => <Note key={note._id} note={note} />)}
      </ListGroup>
      <AddNote ingredientId={ingredient._id} />
      //<Link to={`/edit/${ingredient._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired, notes: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.string,
    store: PropTypes.string,
    size: PropTypes.string,
    ingredientId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  })).isRequired,
};

export default Ingredient;
