/* CommentSection component code */ import React, {
  useEffect,
  useState,
} from "react";
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from "../api";

export default function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments(taskId).then(setComments);
  }, [taskId]);

  const handleAdd = async () => {
    if (!newComment.trim()) return;
    const c = await addComment(taskId, newComment);
    setComments([...comments, c]);
    setNewComment("");
  };

  const handleUpdate = async (id, content) => {
    const updated = await updateComment(id, content);
    setComments(comments.map((c) => (c.id === id ? updated : c)));
  };

  const handleDelete = async (id) => {
    await deleteComment(id);
    setComments(comments.filter((c) => c.id !== id));
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <h4>Comments</h4>
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="New Comment"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <input
              value={c.content}
              onChange={(e) => handleUpdate(c.id, e.target.value)}
            />
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
