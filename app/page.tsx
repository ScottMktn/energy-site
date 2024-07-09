import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";

export default async function Index() {
  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <h1 className="text-4xl pt-16 font-bold">
        Tesla Energy Service Engineering Platform
      </h1>
      <p className="text-xl text-gray-600">
        Mockup the build of materials and site layout of an Industrial Energy
        Battery site.
      </p>
      <p className="text-sm pt-8">Created by Scott Nguyen</p>
    </div>
  );
}
