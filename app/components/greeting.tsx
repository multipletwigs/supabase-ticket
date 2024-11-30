import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  MapPin,
  Users,
  SparklesIcon,
  Twitter,
  ClockIcon,
} from "lucide-react";
import { LoginButtons } from "./auth/forms";
import Link from "next/link";

export default function Greeting() {
  return (
    <Card className="col-span-1 border-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-bold sm:text-xl md:text-2xl">
          LAUNCH WEEK 13
        </CardTitle>
        <CardDescription className="text-sm sm:text-base md:text-lg">
          Level up your backend game with the Supabase community
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
            <p className="text-sm sm:text-base">
              Thursday, December 11th &#x2022; 2024
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
            <p className="text-sm sm:text-base">6:30PM - 10:00PM</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
            <p className="text-sm sm:text-base">
              Xendit Malaysia, Kuala Lumpur
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
            <p className="text-sm sm:text-base">Limited Slots Available!</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full flex-col items-start gap-2">
        <p className="text-xs sm:text-sm text-gray-600">
          Whether you&apos;re a Supabase veteran or just getting started, come
          join us for an evening of learning and community building.
        </p>
        <p className="text-xs sm:text-sm font-medium text-emerald-600">
          CLAIM YOUR TICKET NOW BY SIGNING IN!
        </p>
        <Button
          className="h-8 p-0 sm:h-10 text-xs sm:text-sm text-yellow-500"
          variant="link"
          asChild
        >
          <Link target="_blank" href="https://lu.ma/q1ucw5hv">
            <SparklesIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Find us through Luma
          </Link>
        </Button>
        <div className="flex items-center gap-1 text-xs">
          <Button className="h-8 p-0 sm:h-10 text-xs text-white" variant="link">
            <Link
              target="_blank"
              href="https://x.com/bashtwigs"
              className="flex items-center gap-1"
            >
              Made by{" "}
              <span className="text-blue-500 flex items-center gap-1">
                <Twitter className="w-4 h-4 ml-1" />
                Zach Khong
              </span>
            </Link>
          </Button>
          <span>&#x2022;</span>
          <span>using</span>
          <Link
            href="https://craftgraph.app"
            className="underline underline-offset-2"
            target="_blank"
          >
            CraftGraph
          </Link>
        </div>
        <LoginButtons />
      </CardFooter>
    </Card>
  );
}
