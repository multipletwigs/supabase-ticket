"use client";

import { memo } from "react";
import { SocialCardState } from "@/app/stores/social-card-store";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { Card } from "@/components/ui/card";
import { MapPin, CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const GradientCanvas = memo(
  ({ gradient }: { gradient: SocialCardState["gradient"] }) => (
    <ShaderGradientCanvas>
      <ShaderGradient
        animate="off"
        cDistance={1}
        cPolarAngle={100}
        color1={gradient.stop1}
        color2={gradient.stop2}
        color3={gradient.stop3}
      />
    </ShaderGradientCanvas>
  ),
);

GradientCanvas.displayName = "GradientCanvas";

const GridOverlay = memo(() => (
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[size:50px_50px]" />
));

GridOverlay.displayName = "GridOverlay";

const Header = memo(() => (
  <div className="flex justify-between items-center">
    <div className="flex gap-2 flex-col text-4xl leading-tight">
      <h1>I&apos;M ATTENDING A </h1>
      <h1>
        <span className="text-emerald-400">SUPABASE</span>
        {"\n"}
        COMMUNITY MEETUP
      </h1>
    </div>
    <span className="text-5xl">KUALA LUMPUR</span>
  </div>
));

Header.displayName = "Header";

function SocialCard(props: SocialCardState) {
  const { name, gradient } = props;

  return (
    <Card className="group relative w-[1200px] h-[630px] bg-black/45 text-white font-mono">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-black/80 z-0" />
      <GridOverlay />

      <div className="relative h-full flex flex-col justify-between p-16 z-10">
        <div className="space-y-8">
          <Header />

          <div className="flex items-center gap-6 text-2xl text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Xendit Malaysia
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6" />
              11th December 2024
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div>6PM - 10PM</div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {name}
          </h2>

          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center flex-row border-2 border-white">
              <div className="text-3xl px-6 ">LAUNCH WEEK 13</div>
              <div className="w-64 h-12 bg-white/5 relative">
                <GradientCanvas gradient={gradient} />
              </div>
            </div>
            <p className="text-2xl text-muted-foreground/50">
              powered by craftgraph.app
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(SocialCard);
