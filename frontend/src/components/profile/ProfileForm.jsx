import { useState, useEffect } from "react";

export default function ProfileForm({
  initialName,
  initialEmail,
  onSubmit,
  isSubmitting,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(initialName ?? "");
    setEmail(initialEmail ?? "");
  }, [initialName, initialEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4"
    >
      <h2 className="font-semibold text-slate-900">Profile details</h2>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60 transition-colors"
      >
        {isSubmitting ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
