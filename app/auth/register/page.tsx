import RegisterForm from "@/components/auth/register-form";
import { currentUser } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Register() {
  const user = await currentUser();
  if (user) return redirect("/dashboard");
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-green-100 via-white to-emerald-100 ">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
