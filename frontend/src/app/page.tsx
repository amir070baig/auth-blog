"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api";

type Post = {
  id: number;
  title: string;
  content: string;
  author: { name: string };
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {};

  const getPosts = async () => {
    const res = await axios.get("/posts");
    setPosts(res.data);
  };

  const deletePost = async (id: number) => {
    await axios.delete(`/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📝 All Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 shadow rounded mb-4">
          <h3 className="font-semibold">{post.title}</h3>
          <p>{post.content}</p>
          <small>— {post.author.name}</small>
          {user?.role === "admin" && (
            <button
              onClick={() => deletePost(post.id)}
              className="text-red-500 ml-4"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
