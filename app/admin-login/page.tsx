"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/admin/login", { email, password });

      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Login failed."
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f6f2] px-4 text-[#25382d]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-[#e5e8df] bg-white p-7 shadow-sm sm:p-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#718171]">
          Property Management
        </p>

        <h1 className="mt-4 text-3xl font-medium">Admin sign in</h1>

        <p className="mt-2 text-sm text-[#858d81]">
          Sign in to manage your property listings.
        </p>

        <label className="mt-8 block text-sm font-medium">
          Email address
        </label>

        <input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[#dfe4da] px-4 py-3 outline-none focus:border-[#536e59]"
          placeholder="admin@example.com"
        />

        <label className="mt-5 block text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[#dfe4da] px-4 py-3 outline-none focus:border-[#536e59]"
          placeholder="Enter your password"
        />

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full rounded-xl bg-[#25382d] px-4 py-3 font-medium text-white transition hover:bg-[#3d5945] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}