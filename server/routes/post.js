const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Post = require("../models/Post");

// @route       POST api/posts
// @desc        Create post
// @access      Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  const urlHandle = url.startsWith("https://") ? url : `https://${url}`;
  const statusHandle = status || "TO LEARN";
  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required." });
  try {
    const newPost = new Post({
      title,
      description,
      url: urlHandle,
      status: statusHandle,
      user: req.userId,
    });
    await newPost.save();
    return res.json({
      success: true,
      message: "Happy learning!",
      post: newPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Internal error." });
  }
});

// @route       GET api/posts
// @desc        Get post
// @access      Private
router.get("/", verifyToken, async (req, res) => {
  try {
    // Populate data of user table
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Internal error." });
  }
});

// @route       PUT api/posts
// @desc        Update post
// @access      Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  const urlHandle = url.startsWith("https://") ? url : `https://${url}`;
  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required." });
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: urlHandle || "",
      status: status || "",
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    // new: true -> return post updated
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );
    // User not authorised to update post
    if (!updatedPost)
      return res.status(401).json({
        message: false,
        message: "Post not found or user not authorised.",
      });

    return res.json({
      success: true,
      message: "Excellent progress!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Internal error." });
  }
});

// @route       Delete api/posts
// @desc        Delete post
// @access      Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);
    // User not authorised to update post
    // 401 Unauthorized
    if (!deletePost)
      return res.status(401).json({
        message: false,
        message: "Post not found or user not authorised.",
      });
    return res.json({ success: true, posts: deletePost });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Internal error." });
  }
});

module.exports = router;
