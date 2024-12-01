import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";

interface TicketCheckResult {
  exists: boolean;
  publicUrl?: string;
  error?: string;
  created_at?: string;
}

async function checkTicketExists(username: string): Promise<TicketCheckResult> {
  const supabase = createServiceRoleClient();
  try {
    const { data: files, error: listError } = await supabase.storage
      .from("ticket-images")
      .list("", {
        limit: 1,
        search: `${username}.jpeg`,
      });

    if (listError) {
      return { exists: false, error: "Error checking ticket" };
    }

    if (!files || files.length === 0 || !files[0].created_at) {
      return { exists: false };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("ticket-images").getPublicUrl(`${username}.jpeg`);

    const url = new URL(publicUrl);
    url.searchParams.append("v", files[0].created_at);
    const og_url = url.toString();

    return { exists: true, publicUrl: og_url, created_at: files[0].created_at };
  } catch (error) {
    return { exists: false, error: "Error checking ticket" };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required in request body" },
        { status: 400 },
      );
    }

    const result = await checkTicketExists(username);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
