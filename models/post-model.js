import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model("Post",PostSchema)

export default Post;