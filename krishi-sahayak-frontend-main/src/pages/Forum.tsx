import { useEffect, useState } from "react";

interface ForumPost {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  authorUsername: string;
  authorRole: string;
  createdAt?: string;
  comments?: any[];
}

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  const userId = localStorage.getItem("userId") || "anonymous";
  const username = localStorage.getItem("username") || "Anonymous";
  const role = localStorage.getItem("role") || "ROLE_FARMER";

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8081/api/forum/all");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data: ForumPost[] = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Could not load posts. Try again later.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!title.trim() || !content.trim()) return;

    setPosting(true);
    try {
      const res = await fetch("http://localhost:8081/api/forum/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, authorId: userId, authorUsername: username, authorRole: role }),
      });
      if (!res.ok) throw new Error("Failed to create post");

      // Prepend new post locally for instant feedback
      setPosts([{ title, content, authorId: userId, authorUsername: username, authorRole: role }, ...posts]);
      setTitle("");
      setContent("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError("Could not create post. Try again later.");
    } finally {
      setPosting(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6">AgriHelp Forum</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-700">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-700">No posts yet. Be the first to create one!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post, idx) => (
            <div key={idx} className="p-4 rounded-lg shadow-md bg-gradient-to-r from-green-100 to-yellow-100">
              <h3 className="text-xl font-semibold text-green-900">{post.title}</h3>
              <p className="text-gray-700 my-2">{post.content}</p>
              <p className="text-sm text-green-800">
                {post.authorUsername} · {post.authorRole === "ROLE_FARMER" ? "Farmer" : "Student"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Floating "New Thread" button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg font-bold text-lg"
      >
        + New Thread
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-yellow-50 rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <h3 className="text-xl font-bold text-green-800 mb-4">Create New Thread</h3>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              disabled={posting}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
              rows={5}
              disabled={posting}
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                disabled={posting}
              >
                Cancel
              </button>
              <button
                onClick={createPost}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                disabled={posting}
              >
                {posting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
