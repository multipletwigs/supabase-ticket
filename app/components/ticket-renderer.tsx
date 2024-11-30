"use client";
import React, { useEffect, useMemo, useRef, useCallback } from "react";
import { debounce } from "@/lib/utils";
import { toPng } from "html-to-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleSlash2Icon } from "lucide-react";
import SocialCard from "./ticket";
import { useSocialCardStore } from "@/app/stores/social-card-store";

export default function TicketRenderer() {
  const templateRef = useRef(null);
  const store = useSocialCardStore();
  const Component = SocialCard;
  const convertToImage = useCallback(async () => {
    if (templateRef.current) {
      store.setError(false);
      try {
        const dataUrl = await toPng(templateRef.current, {
          width: 1200,
          height: 630,
          quality: 1.0,
          pixelRatio: 1,
        });
        store.setImageUrl(dataUrl);
      } catch (err) {
        console.error("Error converting template to image:", err);
        store.setError(true);
      } finally {
        store.setIsConverting(false);
      }
    }
  }, [store.number, store.name, store.gradient]);

  const debouncedGenerateImage = useMemo(
    () => debounce(convertToImage, 500),
    [],
  );

  useEffect(() => {
    debouncedGenerateImage();
    return () => {
      const timeoutFunc = debouncedGenerateImage as unknown as {
        cancel?: () => void;
      };
      timeoutFunc.cancel?.();
    };
  }, [store.name, store.number, store.gradient]);

  return (
    <div className="relative w-full">
      <div className="fixed left-full top-0 w-[1200px] h-[630px] opacity-0 pointer-events-none origin-top-left scale-100">
        <div ref={templateRef} className="w-[1200px] h-[630px]">
          <Component {...store} />
        </div>
      </div>
      <fieldset className="grid gap-4 rounded-lg border p-3 sm:p-4 mx-auto max-w-full sm:max-w-2xl">
        <legend className="px-2 text-sm sm:text-base">Social Card</legend>

        {store.error ? (
          <Alert variant="destructive" className="mx-auto w-full">
            <AlertDescription className="text-xs sm:text-sm flex items-center justify-center">
              Failed to generate image. Please try again.
            </AlertDescription>
          </Alert>
        ) : store.isConverting && !store.imageUrl ? (
          <div className="w-full">
            <AspectRatio ratio={1200 / 630}>
              <Skeleton className="w-full h-full rounded-lg" />
            </AspectRatio>
          </div>
        ) : store.isConverting && store.imageUrl ? (
          <div className="w-full relative">
            <AspectRatio ratio={1200 / 630}>
              <img
                src={store.imageUrl}
                alt="Generated template"
                className="w-full h-full rounded-lg shadow-md object-cover opacity-50 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-background/80 px-3 py-2 rounded-md backdrop-blur-sm">
                  <CircleSlash2Icon className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  <span className="text-xs sm:text-sm">Generating...</span>
                </div>
              </div>
            </AspectRatio>
          </div>
        ) : store.imageUrl ? (
          <div className="w-full">
            <AspectRatio ratio={1200 / 630}>
              <img
                src={store.imageUrl}
                alt="Generated template"
                className="w-full h-full rounded-lg shadow-md object-cover transition-all"
              />
            </AspectRatio>
          </div>
        ) : null}
      </fieldset>
    </div>
  );
}
