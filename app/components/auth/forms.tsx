"use client";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "@/app/stores/auth-store";
import { useEffect } from "react";
import { useSocialCardStore } from "@/app/stores/social-card-store";
import ClaimButton from "../ticket-claim";
import GithubButton from "./gh-button";
import { useTicketStore } from "@/app/stores/tickets-store";
import { toast } from "sonner";

export const LoginButtons = () => {
  const {
    handleGithubAuth,
    setAuthLoading,
    user,
    checkUser,
    handleLogout,
    authLoading,
  } = useAuthStore();
  const imageUrl = useSocialCardStore((state) => state.imageUrl);
  const { isUploading, uploadError, uploadTicket, hasTicket, checkTicket } =
    useTicketStore();

  useEffect(() => {
    checkUser();
    if (user) {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      checkTicket();
    }
  }, [user]);

  const handleTicketClaim = async () => {
    const username = user?.identities?.[0]?.identity_data?.user_name;
    if (!username || !imageUrl) return;

    try {
      await uploadTicket(imageUrl, username);
      toast.success("Uploaded Ticket to Supabase Storage!");
    } catch (error) {
      toast.error(
        "Failed to upload ticket, contact me?? This shouldn't even happen ngl",
      );
    }
  };

  if (user?.identities?.[0]) {
    const username = user.identities[0].identity_data?.user_name;

    return (
      <div className="mt-2 sm:mt-4 flex flex-col gap-1.5 sm:gap-2 w-full">
        {imageUrl && (
          <>
            <ClaimButton
              onClick={handleTicketClaim}
              loading={isUploading}
              hasTicket={hasTicket}
              username={username}
              host={typeof window !== "undefined" ? window.location.origin : ""}
            />
            {uploadError && (
              <p className="text-red-500 text-sm">{uploadError}</p>
            )}
          </>
        )}
        <Button
          className="w-full h-8 sm:h-10 text-xs sm:text-sm justify-center"
          variant="secondary"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return <GithubButton onClick={handleGithubAuth} loading={authLoading} />;
};
