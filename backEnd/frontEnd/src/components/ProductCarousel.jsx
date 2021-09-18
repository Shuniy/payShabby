import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import Loader from "./Loader";
import { listTopProducts } from "../actions/productActions";
import { formatPrice } from "../utils/helpers";

function ProductCarousel(props) {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark" style={{borderRadius:10}}>
      {products.map((product) => (
        <Carousel.Item key={product.id}>
          <Link to={`/product/${product.id}/`}>
            <Image src={product.image} alt={product.name} />
            <Carousel.Caption className="carousel-caption">
              <h4>
                {product.name} at {formatPrice(product.price)}{" "}
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
