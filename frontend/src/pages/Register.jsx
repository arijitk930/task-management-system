import { useRegister } from "../hooks/useRegister";
import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  const { register, isPending } = useRegister();

  return (
    <AuthLayout>
      <RegisterForm onSubmit={register} isPending={isPending} />
    </AuthLayout>
  );
}
