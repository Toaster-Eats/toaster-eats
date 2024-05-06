import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Table, Button, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

/** Renders a single recipe card with image, recipe name, dietary restriction(s), estimations, a rating system, and a counter for reviews. */
const Recipe = ({ recipe, onRate }) => {
  const [rating, setRating] = useState(recipe.rating || 0);
  const [reviewCount, setReviewCount] = useState(recipe.reviewCount || 0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onRate) {
      onRate(recipe._id, newRating); // If there's a function to handle rating, call it
      setReviewCount((prevCount) => prevCount + 1); // Increment the review count
    }
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex flex-column align-items-center">
        <Image className="mt-2 rounded-3" src={recipe.image} height={250} width={275} style={{ objectFit: 'cover' }} />
        <div className="text-center mt-2">
          <Card.Title className="fw-bold">{recipe.title}</Card.Title>
          <Card.Subtitle>{recipe.dietaryRestrictions}</Card.Subtitle>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-1">
          <Rating
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={15}
            activeColor="#ffd700"
          />
          <span className="ms-2">({reviewCount} ratings)</span>
        </div>
      </Card.Header>

      <Card.Body>
        <CardText className="pt-2">
          <h5 className="fw-bold">Description:</h5>
          <p>{recipe.description}</p>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Estimations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cost Per Serving:</td>
                <td>${recipe.estimations.costPerServing.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Number of Servings:</td>
                <td>{recipe.estimations.numberOfServings}</td>
              </tr>
              <tr>
                <td>Total Time:</td>
                <td>{recipe.estimations.totalTime}</td>
              </tr>
            </tbody>
          </Table>
        </CardText>

        <div className="d-flex justify-content-center">
          <Link to={`/recipe/${recipe._id}`}>
            <Button size="sm" style={{ backgroundColor: '#599AFF', border: 'none', color: 'white' }}>View Recipe</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

Recipe.propTypes = {
  // eslint-disable-next-line react/require-default-props
  recipe: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    dietaryRestrictions: PropTypes.string,
    estimations: PropTypes.shape({
      costPerServing: PropTypes.number,
      numberOfServings: PropTypes.number,
      totalTime: PropTypes.string,
    }),
    rating: PropTypes.number,
    reviewCount: PropTypes.number, // Counter for reviews
  }),
  // eslint-disable-next-line react/require-default-props
  onRate: PropTypes.func,
};

export default Recipe;
