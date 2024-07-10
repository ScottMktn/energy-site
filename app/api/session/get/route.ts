import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const supabase = createClient();

  try {
    // Get the session data for the user
    // if there is more than one session, get the one with the latest timestamp
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // get the first item in the array

    return NextResponse.json(data?.length ? data[0] : null, {
      status: data?.length ? 200 : 404,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
