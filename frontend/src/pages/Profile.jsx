import { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [meLoading, setMeLoading] = useState(true);
  const [me, setMe] = useState(null);

  const [profile, setProfile] = useState({ name: "", email: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  const [pwd, setPwd] = useState({ oldPassword: "", newPassword: "" });
  const [savingPwd, setSavingPwd] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/users/me");
        const user = res?.data?.data ?? null;
        setMe(user);
        setProfile({ name: user?.name ?? "", email: user?.email ?? "" });
      } catch {
        setMe(null);
      } finally {
        setMeLoading(false);
      }
    };
    load();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      const res = await api.patch("/users/me", profile);
      const user = res?.data?.data ?? null;
      setMe(user);
      alert("Profile updated");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      setSavingPwd(true);
      await api.patch("/users/change-password", pwd);
      setPwd({ oldPassword: "", newPassword: "" });
      alert("Password updated");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to change password");
    } finally {
      setSavingPwd(false);
    }
  };

  if (meLoading) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={updateProfile}
          className="bg-white rounded-lg shadow p-4 space-y-3"
        >
          <h2 className="font-semibold">Profile details</h2>

          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />

          <button
            disabled={savingProfile}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
          >
            {savingProfile ? "Saving..." : "Save changes"}
          </button>
        </form>

        <form
          onSubmit={changePassword}
          className="bg-white rounded-lg shadow p-4 space-y-3"
        >
          <h2 className="font-semibold">Change password</h2>

          <input
            type="password"
            value={pwd.oldPassword}
            onChange={(e) => setPwd({ ...pwd, oldPassword: e.target.value })}
            placeholder="Old password"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            value={pwd.newPassword}
            onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })}
            placeholder="New password"
            className="w-full border p-2 rounded"
            required
          />

          <button
            disabled={savingPwd}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
          >
            {savingPwd ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>

      {me?.role ? (
        <p className="text-sm text-gray-600 mt-4">Role: {me.role}</p>
      ) : null}
    </div>
  );
};

export default Profile;

