import Greeting from "./components/greeting";
import TicketRenderer from "./components/ticket-renderer";
import NameInput from "./components/ticket-input";
import Footer from "./footer";
import CountDown from "./components/countdown";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto h-screen max-w-6xl px-4 sm:px-6 sm:py-16 lg:px-8">
      <main className="grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-4">
        <Greeting />
        <Separator className="sm:hidden" />
        <div className="flex flex-col gap-2 p-6">
          <TicketRenderer />
          <NameInput />
        </div>
      </main>
      <CountDown />
      <Footer />
    </div>
  );
}
