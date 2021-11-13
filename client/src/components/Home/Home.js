import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import MyForm from "../Form/MyForm";
import Posts from "../Posts/Posts";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <div>
      <div className="parent-container">
        <div className="posts">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="myForm">
          <MyForm currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
