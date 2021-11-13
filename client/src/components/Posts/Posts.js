import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import "./Posts.css";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return !posts.length ? (
    <Spinner
      animation="border"
      className="text-primary"
      style={{ marginLeft: "50%" }}
    />
  ) : (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post._id} className="h-100">
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
