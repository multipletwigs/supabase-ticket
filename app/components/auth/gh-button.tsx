import { Button } from "@/components/ui/button";
import { Loader2Icon, GithubIcon } from "lucide-react";

const GithubButton = ({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) => (
  <Button
    className="w-full h-8 sm:h-10 text-xs sm:text-sm justify-center"
    variant="secondary"
    onClick={onClick}
    disabled={loading}
  >
    {loading ? (
      <Loader2Icon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
    ) : (
      <GithubIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
    )}
    Sign in with GitHub
  </Button>
);

export default GithubButton;
