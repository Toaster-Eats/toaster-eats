import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipe/Recipe';
import Recipe from '../components/Recipe';

const TopPicks = () => {
  const { ready, recipes } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.PublicationName);
    const isReady = subscription.ready();
    const recipeItems = Recipes.collection.find({}).fetch();
    return {
      ready: isReady,
      recipes: recipeItems,
    };
  }, []);

  // eslint-disable-next-line no-shadow
  const shuffleRecipes = (recipes) => [...recipes].sort(() => 0.5 - Math.random()); // Shuffle recipes randomly

  if (!ready) {
    return <LoadingSpinner />;
  }

  const shuffledRecipes = shuffleRecipes(recipes); // Shuffles the recipes
  const topPicks = shuffledRecipes.slice(0, 3); // Gets the first three from the shuffled list

  return (
    <Container fluid>
      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height={270} alt="Recipes Banner" />
        </Col>
      </Row>
      <h2 className="text-center fw-bold mt-4">This Week&apos;s Picks</h2>
      <Row xs={1} md={2} lg={5} className="g-3 mb-4">
        {topPicks.map((recipe) => (
          <Col key={recipe._id} lg={4}>
            <Recipe recipe={recipe} />
          </Col>
        ))}
      </Row>

      {!Meteor.userId() ? (
        <Row className="justify-content-center mb-5">
          <Col xs="auto" className="text-center">
            <h5 style={{ fontFamily: 'Titillium Web, sans-serif', fontWeight: 400 }}>
              Sign up to get full access to our wide array of tasty recipes!
            </h5>
            <Link to="/signup">
              <Button
                size="sm"
                variant="success"
                style={{
                  fontFamily: 'Titillium Web, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                }}
              >
                Sign Up!
              </Button>
            </Link>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default TopPicks;
