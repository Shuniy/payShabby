import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox(props) {
  const [keyword, setKeyword] = useState("");

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <div
      className='my-auto'
        style={{
          display: "flex",
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5 "
          value={keyword}
        ></Form.Control>
        <Button
          style={{ padding: 10, marginLeft: 10 }}
          type="submit"
          variant="outline-success"
          className="p-2"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default SearchBox;
