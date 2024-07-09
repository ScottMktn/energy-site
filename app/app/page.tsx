import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/templates/dashboard/dashboardPage";

export default async function AppPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const getTimeMessage = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
      return "Good morning 🌅";
    } else if (hours >= 12 && hours < 18) {
      return "Good afternoon 🕒";
    } else {
      return "Good evening 🌙";
    }
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <p className="text-sm">
        {getTimeMessage()}, {user.email}!
      </p>
      <div className="pt-16">
        <DashboardPage />
      </div>
    </div>
  );
}
