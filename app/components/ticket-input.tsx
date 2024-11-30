"use client";

import { useState, useEffect, useMemo } from "react";
import { useSocialCardStore } from "@/app/stores/social-card-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";

export default function NameInput() {
  const { name, setName, generateRandomGradient, imageUrl } =
    useSocialCardStore();
  const [inputValue, setInputValue] = useState(name);

  useEffect(() => {
    setInputValue(name);
  }, [name]);

  const debouncedSetName = useMemo(
    () => debounce((value: string) => setName(value), 500),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    setInputValue(newValue);
    debouncedSetName(newValue);
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `social-card-${name || "untitled"}.png`; // Set filename

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  useEffect(() => {
    return () => {
      const timeoutFunc = debouncedSetName as unknown as {
        cancel?: () => void;
      };
      timeoutFunc.cancel?.();
    };
  }, []);

  return (
    <div className="flex flex-col mt-auto gap-2 sm:gap-4 w-full max-w-lg">
      <div className="space-y-2 mt-auto">
        <label
          htmlFor="name-input"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Input
          type="text"
          id="name-input"
          value={inputValue}
          onChange={handleChange}
          className="w-full text-sm sm:text-base"
          placeholder="Enter name"
          maxLength={20}
          aria-describedby="name-description"
        />
        <p id="name-description" className="text-xs sm:text-sm text-gray-500">
          Enter the name to display on the social card. ({inputValue.length}/20)
        </p>
      </div>
      <div className="inline-flex sm:flex-row flex-col gap-2">
        <Button
          variant="secondary"
          onClick={generateRandomGradient}
          className="w-full h-8 sm:h-10 text-xs sm:text-sm justify-center"
        >
          Generate a random gradient strip!
        </Button>
        <Button
          onClick={handleDownload}
          variant="default"
          className="w-full h-8 sm:h-10 text-xs sm:text-sm justify-center"
          disabled={!imageUrl}
        >
          Download Card!
        </Button>
      </div>
    </div>
  );
}
