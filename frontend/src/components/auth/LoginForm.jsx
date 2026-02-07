import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm({ onSubmit, isPending }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <h2 className="text-xl font-semibold text-slate-900 text-center">
        Welcome back
      </h2>
      <p className="text-sm text-slate-500 text-center mt-1">
        Sign in to your account
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60 transition-colors"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-center text-slate-500 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-violet-600 hover:text-violet-700 font-medium">
          Register
        </Link>
      </p>
    </div>
  );
}
