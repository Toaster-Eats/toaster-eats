import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button, CardText, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import Rating from 'react-rating-stars-component';
import { useTracker } from 'meteor/react-meteor-data';
import { Favorites } from '../../api/favorite/Favorite';

const Recipe = ({ recipe }) => {
  const navigate = useNavigate();

  // Subscribe to Favorites and ensure subscription readiness
  const { loading, favorites } = useTracker(() => {
    const handle = Meteor.subscribe(Favorites.userPublicationName);

    if (!handle.ready()) {
      return { loading: true }; // Subscription not ready
    }

    const favoritesList = Favorites.collection.find({ userId: Meteor.userId() }).fetch();
    return { loading: false, favorites: favoritesList };
  }, []); // Ensure reactivity when favorites change

  const isFavorited = !loading && favorites.some((fav) => fav.recipeId === recipe._id); // Check if recipe is favorited

  const handleFavoriteToggle = () => {
    if (!Meteor.userId()) {
      navigate('/signin'); // Redirect to sign-in if not logged in
      return;
    }

    Meteor.call('user.toggleFavorite', recipe._id, (error) => {
      if (error) { /* empty */ }
    });
  };

  // Makes sure rating and reviewCount are at least 0
  const rating = recipe.rating ?? 0;
  const reviewCount = recipe.reviewCount ?? 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-100">
      <Card.Header className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-between w-100">
          <Button variant="light" size="sm" onClick={handleFavoriteToggle}>
            {isFavorited ? <HeartFill color="red" /> : <Heart />}
          </Button>
        </div>
        <Image
          className="mt-2 rounded-3"
          src={recipe.image}
          height={250}
          width={275}
          style={{ objectFit: 'cover' }}
        />
        <div className="text-center mt-2">
          <Card.Title className="fw-bold">{recipe.title}</Card.Title>
          <Card.Subtitle>{recipe.dietaryRestrictions}</Card.Subtitle>
          <div className="d-flex justify-content-center align-items-center">
            <Rating count={5} value={rating} size={15} activeColor="#ffd700" />
            <span className="ms-2">({reviewCount} ratings)</span> {/* Shows 0 if ratings are undefined */}
          </div>
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
                <td>Cost Per Serving</td>
                <td>${recipe.estimations.costPerServing.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Number of Servings</td>
                <td>{recipe.estimations.numberOfServings}</td>
              </tr>
              <tr>
                <td>Total Time</td>
                <td>{recipe.estimations.totalTime}</td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Link to={`/recipe/${recipe._id}`}>
              <Button size="sm" style={{ backgroundColor: '#599AFF', border: 'none', color: 'white' }}>
                View Recipe
              </Button>
            </Link>
          </div>
        </CardText>
      </Card.Body>
    </Card>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
    reviewCount: PropTypes.number,
  }).isRequired,
};

export default Recipe;
