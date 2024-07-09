import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <button className="py-2 px-4 text-sm flex rounded-md no-underline bg-inherit hover:bg-gray-200 border border-gray-300 text-black font-semibold justify-center">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-4 text-sm flex rounded-md no-underline bg-blue-600 hover:bg-blue-700 text-white font-semibold"
    >
      Login
    </Link>
  );
}
