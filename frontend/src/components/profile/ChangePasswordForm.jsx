import { useState } from "react";

export default function ChangePasswordForm({ onSubmit, isSubmitting }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ oldPassword, newPassword });
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4"
    >
      <h2 className="font-semibold text-slate-900">Change password</h2>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Current password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">New password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 rounded-lg font-medium bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-60 transition-colors"
      >
        {isSubmitting ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
