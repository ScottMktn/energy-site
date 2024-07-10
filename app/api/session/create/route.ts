import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, layout } = await request.json();

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("sessions")
      .insert([{ user_id: userId, layout }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
