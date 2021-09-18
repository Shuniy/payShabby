import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  FormGroup,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { formatDate, formatPrice } from "../utils/helpers";

function ProductScreen(props) {
  // match comes from react route
  const { match, history } = props;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {

    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({
        type:PRODUCT_CREATE_REVIEW_RESET,
      })
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(
      match.params.id, {
        rating, comment
      }
    ))
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="my-3" variant="danger">
          {error}! Try Reloading, If error persist, LOGIN AGAIN !!!
        </Message>
      ) : (
        <div>
          <Row>
            <Col md={5} className="my-3">
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4} className="my-3">
              <ListGroup variant="">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}`}
                    color="#f8e825"
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price</strong> : {formatPrice(product.price)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description</strong> : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} className="my-3">
              <Card>
                <ListGroup variant="">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>{formatPrice(product.price)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      disabled={product.countInStock <= 0}
                      type="button"
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className="my-3">
            <Col md={6}>
              <h4 className="my-3">Reviews</h4>
              {product.reviews.length === 0 && (
                <Message className="my-3" variant="info">
                  No Reviews
                </Message>
              )}

              <ListGroup variant="">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <strong style={{ fontSize: 21, padding: "10px 0" }}>
                      {review.name}
                    </strong>
                    <Rating value={review.rating} color="#f8e825" />
                    <em>
                      <p>{formatDate(review.createdAt)}</p>
                    </em>
                    <p className="my-3">{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4 className="my-3">Write a Review</h4>
                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message className="my-3" variant="success">
                      Review Submitted
                    </Message>
                  )}
                  {errorProductReview && (
                    <Message className="my-3" variant="danger">
                      {errorProductReview}
                    </Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          className="my-2"
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Average</option>
                          <option value="4">4 - Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <FormGroup controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          className="my-2"
                          rows={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </FormGroup>
                      <Button
                        type="submit"
                        className="my-2"
                        disabled={loadingProductReview}
                        variant="primary"
                      >
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to={`/login`}>Login</Link>
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
