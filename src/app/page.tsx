import { authConfig } from "@/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession(authConfig);
  if(!session || !session.userType) return redirect("/auth/login");

  return redirect("/dashboard");
}
