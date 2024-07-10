import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../components/shared/SubmitButton";
import Image from "next/image";

export default function Home({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/?message=Could not authenticate user");
    }

    return redirect("/?message=Check email to continue sign in process");
  };

  return (
    <main className="min-h-screen flex flex-col items-center max-w-2xl mx-auto">
      <Image
        src="/Tesla-Megapack-hero.webp"
        alt="Tesla Megapack"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 -z-10 bg-cover bg-center"
      />
      <div className="flex w-full flex-col space-y-16 items-center justify-center my-36 py-16 bg-white md:rounded-lg">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl md:text-4xl text-center text-black font-bold">
            Welcome to PowerPlan
          </h1>
          <p className="text-sm text-center">
            Mockup the build of materials and site layout of an Industrial
            Energy Battery site
          </p>
        </div>

        <div className="flex-1 flex flex-col w-full px-4 md:px-8 sm:max-w-xl justify-center gap-2">
          <form className="flex-1 flex flex-col w-full justify-center gap-2 text-black">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border border-gray-300 mb-4 text-sm"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border border-gray-300 mb-4 text-sm"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <SubmitButton
              formAction={signIn}
              className="py-2 px-4 text-sm flex rounded-md no-underline bg-blue-600 hover:bg-blue-700 text-white font-semibold items-center justify-center"
              pendingText="Signing In..."
            >
              Sign In
            </SubmitButton>
            <SubmitButton
              formAction={signUp}
              className="py-2 px-4 text-sm flex rounded-md no-underline bg-inherit hover:bg-gray-200 border border-gray-300 text-black font-semibold justify-center"
              pendingText="Signing Up..."
            >
              Sign Up
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
