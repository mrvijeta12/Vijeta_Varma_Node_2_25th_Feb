import mongoose from "mongoose";
import express from 'express';
import Post from "../models/post-model.js";
import Comment from "../models/comment-model.js";

const appRouter = express.Router();

//create a post

appRouter.post('/posts', async (req, res) => {
try {
    const post = await Post.create(req.body);
    res.json(post);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Read a post
appRouter.get('/posts/:id', async (req, res) => {
try {
    const post = await Post.findById(req.params.id).populate('comments');
    res.json(post);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Update a post
appRouter.put('/posts/:id', async (req, res) => {
try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Delete a post
appRouter.delete('/posts/:id', async (req, res) => {
try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Comment CRUD operations
// Create a comment on a post
appRouter.post('/posts/:postId/comments', async (req, res) => {
try {
    const comment = await Comment.create(req.body);
    const post = await Post.findById(req.params.postId);
    post.comments.push(comment._id);
    await post.save();
    res.json(comment);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Read comments on a post
appRouter.get('/posts/:postId/comments', async (req, res) => {
try {
    const post = await Post.findById(req.params.postId).populate('comments');
    res.json(post.comments);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Update a comment on a post
appRouter.put('/posts/:postId/comments/:commentId', async (req, res) => {
try {
    const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
    res.json(comment);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Delete a comment on a post
appRouter.delete('/posts/:postId/comments/:commentId', async (req, res) => {
try {
    const post = await Post.findById(req.params.postId);
    post.comments.pull(req.params.commentId);
    await post.save();
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comment deleted successfully' });
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Upvoting and Downvoting System
// Upvote a post
appRouter.put('/posts/:id/upvote', async (req, res) => {
try {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });
    res.json(post);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Downvote a post
appRouter.put('/posts/:id/downvote', async (req, res) => {
try {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { downvotes: 1 } }, { new: true });
    res.json(post);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Upvote a comment
appRouter.put('/comments/:id/upvote', async (req, res) => {
try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });
    res.json(comment);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Downvote a comment
appRouter.put('/comments/:id/downvote', async (req, res) => {
try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, { $inc: { downvotes: 1 } }, { new: true });
    res.json(comment);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

export default appRouter;
