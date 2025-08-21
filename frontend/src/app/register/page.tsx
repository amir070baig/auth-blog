"use client";

import { useState } from "react";
import axios from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    await axios.post("/auth/register", form);
    router.push("/login");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="border p-2 mb-2 w-full"
        type="text" placeholder="Name"
        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input className="border p-2 mb-2 w-full"
        type="email" placeholder="Email"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input className="border p-2 mb-4 w-full"
        type="password" placeholder="Password"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </div>
  );
}
