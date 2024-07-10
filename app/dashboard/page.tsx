import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/templates/dashboard/dashboardPage";

export default async function AppPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  let initialLayout;

  try {
    // Fetch the session data if it exists
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/session/get?userId=${user.id}`);

    if (!response.ok)
      throw new Error(`Error fetching session data: ${response.statusText}`);

    const session = await response.json();
    initialLayout = session?.layout || undefined;
  } catch (error) {
    console.error("Failed to fetch session data:", error);
  }

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <p className="text-sm">Welcome back, {user.email}!</p>
      <div className="pt-16">
        <DashboardPage user={user} initialLayout={initialLayout} />
      </div>
    </div>
  );
}
