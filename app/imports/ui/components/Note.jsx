/*
 * This is a code form ICS 314 "digits" assignemnt.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Note = ({ note }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{note.createdAt.toLocaleDateString('en-US')}</p>
    <p>{note.price} at {note.store}, size: {note.size}</p>
  </ListGroup.Item>
);

// Require a document to be passed to this component.
Note.propTypes = {
  note: PropTypes.shape({
    price: PropTypes.string,
    store: PropTypes.string,
    size: PropTypes.string,
    ingredientId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
};

export default Note;
