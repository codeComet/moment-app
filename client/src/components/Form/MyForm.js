import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import "./MyForm.css";

const MyForm = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    tags: "",
    message: "",
    image: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));
  // console.log(currentId);
  console.log(post);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clearForm();
  };

  const clearForm = () => {
    setCurrentId(null);
    setPostData({ title: "", tags: "", message: "", image: "" });
  };

  if (!user?.result?.name) {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>You're not Logged In!</Card.Title>

          <Card.Text>Login/Sign Up to Create Your Own Moments!</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="">
      <Form onSubmit={handleSubmit}>
        <h4 className="mb-3 text-white">
          {currentId ? `Edit Moment` : `Create New Moment`}
        </h4>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Moment Title"
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
            value={postData.title}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Tags: Sunset, Paris...etc"
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(",") });
            }}
            value={postData.tags}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Moment Description"
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
            }}
            value={postData.message}
          />
        </Form.Group>
        <Form.Group className="mb-3 text-white">
          <Form.Label>Select Image</Form.Label>
          <br />
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="danger"
          onClick={clearForm}
          style={{ marginLeft: "20px" }}
        >
          Clear
        </Button>
      </Form>
    </div>
  );
};

export default MyForm;
