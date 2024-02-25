import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: String,
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
});

const Comment = mongoose.model("Comment",CommentSchema);
export default Comment;
