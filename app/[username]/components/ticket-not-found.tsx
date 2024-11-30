import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

function TicketNotFound(): React.JSX.Element {
  return (
    <div className="max-w-lg mx-auto p-4">
      <Alert variant="destructive" className="bg-red-900/50 border-red-900">
        <AlertCircle className="h-5 w-5" />
        <AlertDescription className="text-white ml-2">
          This invite link is invalid or has expired.{" "}
          <Link
            href="/"
            className="underline underline-offset-2 hover:text-white"
          >
            Create your own ticket instead
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default TicketNotFound;
