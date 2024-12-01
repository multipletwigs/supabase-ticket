import { Suspense } from "react";
import { Loader2Icon, Sparkles } from "lucide-react";
import InviteContent from "./components/ticket-invite";
import type { Metadata, ResolvingMetadata } from "next";

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

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = (await params).username;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL!}/api/tickets/check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
      cache: "no-store",
    },
  );

  const ticketCheck = await response.json();

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
      twitter: {
        card: "summary_large_image",
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
      title: `Join ${username} at Supabase Malaysia's Community Meetup!`,
      description: "Click to claim your unique ticket and join the community!",
      images: [
        {
          url: ticketCheck.publicUrl!,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Join ${username} at Supabase Malaysia's Community Meetup!`,
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
