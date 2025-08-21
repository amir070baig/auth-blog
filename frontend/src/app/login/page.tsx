"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const res = await axios.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    window.location.href = "/"
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="border p-2 mb-2 w-full"
        type="email" placeholder="Email"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input className="border p-2 mb-4 w-full"
        type="password" placeholder="Password"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  );
}
