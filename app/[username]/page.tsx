import { Suspense } from "react";
import { Loader2Icon, Sparkles } from "lucide-react";
import InviteContent from "./components/ticket-invite";
import { createClient } from "@/lib/supabase/server";
import { checkTicketExists } from "./utils";

function ImageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2Icon className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.1),transparent_60%)]"></div>
      <Suspense fallback={<ImageLoader />}>
        <InviteContent username={username} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const ticketCheck = await checkTicketExists(params.username);

  const baseMetadata = {
    title: "Join Supabase Malaysia's Community Meetup!",
    description:
      "Supabase Ticketing for community meetup powered by CraftGraph",
  };

  if (!ticketCheck.exists) {
    return {
      ...baseMetadata,
      openGraph: {
        title: "Join Supabase Malaysia's Community Meetup!",
        description: "Create your unique ticket and join the community!",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }

  return {
    ...baseMetadata,
    openGraph: {
      title: `Join ${params.username} at Supabase Malaysia's Community Meetup!`,
      description: "Click to claim your unique ticket and join the community!",
      images: [
        {
          url: ticketCheck.publicUrl!,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
