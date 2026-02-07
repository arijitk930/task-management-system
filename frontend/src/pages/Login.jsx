import { useLogin } from "../hooks/useLogin";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  const { login, isPending } = useLogin();

  return (
    <AuthLayout>
      <LoginForm onSubmit={login} isPending={isPending} />
    </AuthLayout>
  );
}
