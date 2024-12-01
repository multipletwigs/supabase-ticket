import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TicketNotFound from "./ticket-not-found";
import { checkTicketExists } from "../utils";

interface InviteContentProps {
  username: string;
}

function InviteHeader({ username }: { username: string }): React.JSX.Element {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Sparkles className="w-6 h-6 text-blue-400" />
      <h1 className="text-2xl md:text-3xl text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        You're Invited!
      </h1>
      <Sparkles className="w-6 h-6 text-purple-400" />
    </div>
  );
}

function TicketDisplay({
  publicUrl,
  username,
}: {
  publicUrl: string;
  username: string;
}): React.JSX.Element {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
      <div className="relative">
        <img
          src={publicUrl}
          alt={`${username}'s ticket`}
          width={1200}
          height={630}
          className="rounded-lg shadow-lg max-w-full hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <p className="text-white text-base md:text-lg font-medium px-4 text-center">
            @{username}'s exclusive ticket
          </p>
        </div>
      </div>
    </div>
  );
}

async function InviteContent({
  username,
}: InviteContentProps): Promise<React.JSX.Element> {
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

  if (!ticketCheck.exists) {
    return <TicketNotFound />;
  }

  return (
    <Card className="max-w-2xl w-full bg-zinc-900/90 backdrop-blur-sm border-zinc-800">
      <CardHeader className="space-y-4">
        <InviteHeader username={username} />
        <p className="text-center">
          Join <span className="text-blue-500 font-semibold">@{username}</span>{" "}
          and create your own unique ticket
        </p>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        <TicketDisplay publicUrl={ticketCheck.publicUrl!} username={username} />
      </CardContent>

      <CardFooter className="flex flex-col gap-4 p-4 md:p-6">
        <Link href="/" className="w-full">
          <Button className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-base md:text-lg py-6 text-white">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            Claim Your Ticket Now
          </Button>
        </Link>
        <p className="text-center text-sm">
          Create and customize your unique ticket in minutes
        </p>
      </CardFooter>
    </Card>
  );
}

export default InviteContent;
