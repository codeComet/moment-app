import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: String,
  message: String,
  tags: [String],
  image: String,
  name: String,
  creator: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("postMessage", PostSchema);

export default PostMessage;
