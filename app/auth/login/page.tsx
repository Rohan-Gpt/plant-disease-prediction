import LoginForm from "@/components/auth/loginForm";
import { currentUser } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await currentUser();
  if (user) return redirect("/dashboard");
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-green-100 via-white to-emerald-100 ">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
