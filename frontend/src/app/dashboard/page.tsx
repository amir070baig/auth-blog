"use client";

import { useState, useEffect } from "react";
import axios from "@/lib/api";

export default function DashboardPage() {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = async () => {
    await axios.post("/posts", form);
    alert("Post created");
    setForm({ title: "", content: "" });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create New Post</h2>
      <input className="border p-2 mb-2 w-full"
        type="text" placeholder="Title"
        value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea className="border p-2 mb-4 w-full"
        placeholder="Content"
        value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
      />
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Publish</button>
    </div>
  );
}
