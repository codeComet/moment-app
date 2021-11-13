import React from "react";
import { Card, Dropdown, Button } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  // const [iconState, setIconState] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const style = {
    position: "absolute",
    right: "0px",
    background: "none",
    marginRight: "15px",
    cursor: "pointer",
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDots />
      {children}
    </a>
  ));

  // const likePostHandler = (id) => {
  //   setIconState((prevState) => !prevState);
  //   dispatch(likePost(id));
  // };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <AiFillHeart />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <AiOutlineHeart />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <AiOutlineHeart />
        &nbsp;Like
      </>
    );
  };

  return (
    <div>
      <Card style={{ marginBottom: "20px" }}>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div style={style}>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
              <Dropdown.Menu className="w-20 p-0 border-0">
                <Dropdown.Item
                  className="bg-primary text-white"
                  onClick={() => setCurrentId(post._id)}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  className="bg-danger text-white"
                  onClick={() => dispatch(deletePost(post._id))}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        <Card.Img variant="top" src={post.image} />
        <div
          className="d-flex justify-content-between align-items-baseline py-2"
          style={{ fontSize: "14px" }}
        >
          <Card.Text className="px-2 text-secondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Card.Text>
          <Card.Text className="px-2 text-muted">Author: {post.name}</Card.Text>
        </div>
        <Card.Body className="pt-0 px-2">
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.message}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              className="d-flex align-items-center justify-content-between btn-light"
              style={{
                cursor: "pointer",
                border: "none",
                backgroundColor: "white",
                fontSize: "13px",
                paddingLeft: "4px",
              }}
              onClick={() => dispatch(likePost(post._id))}
              disabled={!user?.result}
            >
              <Likes />
            </Button>
            <Card.Text>{moment(post.createdAt).fromNow()}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;
