import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForumCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "admin";
  const username = localStorage.getItem("username") || "Admin";
  const role = localStorage.getItem("role") || "ROLE_FARMER";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8081/api/forum/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          authorId: userId,
          authorUsername: username,
          authorRole: role,
        }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      navigate("/forum");
    } catch (err) {
      console.error(err);
      alert("Could not create post");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Forum Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
