import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen(props) {
  const { history, match } = props;

  const dispatch = useDispatch();

  const userId = match.params.id;

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {

      if(successUpdate){
        dispatch({type:USER_UPDATE_RESET})
        history.push(`/admin/userlist`)
      }

      if (!user || user.id !== Number(userId)){
          dispatch(getUserDetails(userId))
      }else{
          setFname(user.first_name)
          setLname(user.last_name)
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
      }
  }, [userId, dispatch, user, successUpdate, history]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser({id:user.id, first_name:fname, last_name:lname, email, isAdmin}))
  };

  return (
    <div>
      <Link className="btn btn-primary" to={`/admin/userlist`}>
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      <FormContainer>
        <h1>Edit User</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="fname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={fname}
                onChange={(event) => setFname(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="lname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lname}
                onChange={(event) => setLname(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                placeholder="Is Admin"
                checked={isAdmin}
                onChange={(event) => setIsAdmin(event.target.checked)}
              ></Form.Check>
              <Form.Label>Is Admin</Form.Label>
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

export default UserEditScreen;
