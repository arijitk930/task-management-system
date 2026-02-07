import { useProfile } from "../hooks/useProfile";
import ProfileForm from "../components/profile/ProfileForm";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import PageLayout from "../components/layout/PageLayout";
import { FiUser } from "react-icons/fi";

export default function Profile() {
  const {
    me,
    isLoading,
    updateProfile,
    isUpdatingProfile,
    changePassword,
    isChangingPassword,
  } = useProfile();

  if (isLoading) return null;

  return (
    <PageLayout title="">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-violet-100 text-violet-600">
          <FiUser className="text-xl" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProfileForm
          initialName={me?.name}
          initialEmail={me?.email}
          onSubmit={updateProfile}
          isSubmitting={isUpdatingProfile}
        />
        <ChangePasswordForm
          onSubmit={changePassword}
          isSubmitting={isChangingPassword}
        />
      </div>

      {me?.role ? (
        <p className="text-sm text-slate-500 mt-6">Role: {me.role}</p>
      ) : null}
    </PageLayout>
  );
}
