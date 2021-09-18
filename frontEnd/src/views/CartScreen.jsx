import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { formatPrice } from "../utils/helpers";

function CartScreen(props) {
  const { match, location, history } = props;

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    console.log("checkout");
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="my-3">
      <h1 className="my-3">Shopping Cart</h1>

      <Row>
        <Col className="my-3" md={8}>
          {cartItems.length === 0 ? (
            <Message className="my-3" variant="info">
              Your Cart is Empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="">
              {cartItems.map((item) => (
                <ListGroup.Item className="my-auto" key={item.product}>
                  <Row className="my-3" style={{ textAlign: "center" }}>
                    <Col md={2}>
                      <Image className="my-3" src={item.image} fluid rounded />
                    </Col>
                    <Col md={3} className="my-3">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={3} className="my-3">
                      {formatPrice(item.price)}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        className="my-3"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        className="my-3"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col className="my-3" md={4}>
          <Card>
            <ListGroup variant="">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>

                {formatPrice(
                  cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed To Payment
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
