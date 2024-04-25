import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Image, CardTitle, CardSubtitle, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For navigation to the edit page

/** Renders a single ingredient card with details and an edit button. */
const Ingredient = ({ ingredient }) => (
  <Card className="h-100">
    <Card.Header className="d-flex flex-column align-items-center">
      <Image src={ingredient.image} height={250} width={250} style={{ objectFit: 'cover' }} />
      <div className="text-center mt-3">
        <CardTitle>{ingredient.name}</CardTitle>
        <CardSubtitle>
          <strong>Location:</strong> {ingredient.location || 'N/A'}
        </CardSubtitle>
      </div>
    </Card.Header>
    <CardBody>
      {/* Rounds price to two decimal places */}
      <strong>Price:</strong> ${ingredient.price ? ingredient.price.toFixed(2) : 'N/A'}
      <div className="d-flex justify-content-center mt-1">
        <Link to={`/edit-ingredient/${ingredient._id}`}>
          <Button variant="success" size="sm">Edit</Button>
        </Link>
      </div>
    </CardBody>
  </Card>
);

// Define the PropTypes for the ingredient object.
Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    location: PropTypes.string,
  }).isRequired,
};

export default Ingredient;
