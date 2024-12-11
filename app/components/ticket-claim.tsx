"use client";
import { Button } from "@/components/ui/button";
import { Check, Copy, Loader2Icon, TicketIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ClaimButtonProps {
  onClick: () => void;
  loading: boolean;
  hasTicket: boolean;
  username?: string;
  host?: string;
}

const ClaimButton = ({
  onClick,
  loading,
  hasTicket,
  username,
  host,
}: ClaimButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!username || !host) return;
    navigator.clipboard.writeText(`${host}/${username}`);
    toast.success("Copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <Button
        className="h-8 sm:h-10 w-full text-xs sm:text-sm justify-center"
        variant="default"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <Loader2Icon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
        ) : (
          <TicketIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        )}
        {hasTicket ? "Update Ticket" : "Claim Ticket"}
      </Button>
      {console.log(hasTicket, username, host)}
      {hasTicket && username && host && (
        <Button
          variant="outline"
          className="h-8 sm:h-10 w-full"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          ) : (
            <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          )}
          <span className="text-xs sm:text-sm">Copy Invite Link</span>
        </Button>
      )}
    </div>
  );
};

export default ClaimButton;
