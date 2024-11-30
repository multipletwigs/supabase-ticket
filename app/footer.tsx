import { BookOpenIcon, GithubIcon, MessageCircleIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
        <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <nav className="flex flex-row flex-wrap items-center justify-center sm:gap-8 text-sm text-gray-600">
          <a
            className="flex items-center gap-2 transition-colors hover:text-emerald-600 hover:underline hover:underline-offset-4 p-2 sm:p-0"
            href="https://supabase.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpenIcon className="h-4 w-4" />
            Documentation
          </a>
          <a
            className="flex items-center gap-2 transition-colors hover:text-emerald-600 hover:underline hover:underline-offset-4 p-2 sm:p-0"
            href="https://github.com/multipletwigs/supabase-ticket"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            className="flex items-center gap-2 transition-colors hover:text-emerald-600 hover:underline hover:underline-offset-4 p-2 sm:p-0"
            href="https://discord.supabase.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircleIcon className="h-4 w-4" />
            Join Discord
          </a>
        </nav>

        <p className="text-sm text-gray-500 text-center">
          © 2024 Supabase Community. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
