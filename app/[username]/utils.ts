import { createClient } from "@/lib/supabase/server";

interface TicketCheckResult {
  exists: boolean;
  publicUrl?: string;
  error?: string;
  created_at?: string;
}

export async function checkTicketExists(
  username: string,
): Promise<TicketCheckResult> {
  const supabase = createClient();

  try {
    const { data: files, error: listError } = await supabase.storage
      .from("ticket-images")
      .list("", {
        limit: 1,
        search: `${username}.png`,
      });

    if (listError) {
      return { exists: false, error: "Error checking ticket" };
    }

    if (!files || files.length === 0 || !files[0].created_at) {
      return { exists: false };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("ticket-images").getPublicUrl(`${username}.png`);

    const og_url = `${publicUrl}?v=${files[0].created_at}&quality=65`;

    return { exists: true, publicUrl: og_url, created_at: files[0].created_at };
  } catch (error) {
    return { exists: false, error: "Error checking ticket" };
  }
}
