import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  const newPost = new PostMessage({
    ...body,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Post not found!");
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Post not found");
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post deleted successfully!" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated!" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Post not found!");

  const selectedPost = await PostMessage.findById(id);

  const userIndex = selectedPost.likes.findIndex(
    (id) => id === String(req.userId)
  );

  if (userIndex === -1) {
    selectedPost.likes.push(req.userId);
  } else {
    selectedPost.likes = selectedPost.likes.filter(
      (id) => id !== String(req.userId)
    );
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, selectedPost, {
    new: true,
  });

  res.status(200).json(updatedPost);
};
