import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";

function ProductEditScreen(props) {
  const { history, match } = props;

  const dispatch = useDispatch();

  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push(`/admin/productlist/`);
    } else {
      if (!product || product.id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [productId, dispatch, product, history, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log({
      id: product.id,
      name: product.name,
      price: product.price,
      // image: product.image,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description,
      brand: product.brand,
    });
    // update product
    dispatch(
      updateProduct({
        id: product.id,
        name: name,
        price: price,
        // image: image,
        category: category,
        countInStock: countInStock,
        description: description,
        brand: brand,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    console.log("Files is Uploading");
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `/api/products/upload/`,
        formData,
        config
      );

      setImage(data);

      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link className="btn btn-primary" to={`/admin/productlist`}>
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <Message variant="danger">
          {errorUpdate}!, Try Logging In Again !!!
        </Message>
      )}
      <FormContainer>
        <h1>Product Details</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error}! Try Reloading, If error persist, LOGIN AGAIN !!!
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label=""
                onChange={uploadFileHandler}
                custom
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Product Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product Stock"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Product Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                row={5}
                placeholder="Enter Short Product Description"
                value={description}
                style={{ height: "100px" }}
                onChange={(event) => setDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
