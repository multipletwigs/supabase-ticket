"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const targetDate = new Date("2024-12-11T18:00:00").getTime();

const calculateTimeLeft = () => {
  const difference = targetDate - new Date().getTime();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

const AnimatedNumber = memo(({ value }: { value: number }) => (
  <div className="relative w-16 h-12 overflow-hidden">
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center text-3xl font-light"
      >
        {value.toString().padStart(2, "0")}
      </motion.div>
    </AnimatePresence>
  </div>
));

AnimatedNumber.displayName = "AnimatedNumber";

const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <AnimatedNumber value={value} />
    <span className="text-sm mt-1">{label}</span>
  </div>
));

TimeUnit.displayName = "TimeUnit";

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const updateTime = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
  }, []);

  useEffect(() => {
    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [updateTime]);

  return (
    <div className="flex h-full my-4 items-center w-full justify-center text-white">
      <div className="text-center">
        <div className="flex justify-center space-x-4">
          <TimeUnit value={timeLeft.days} label="days" />
          <TimeUnit value={timeLeft.hours} label="hours" />
          <TimeUnit value={timeLeft.minutes} label="minutes" />
          <TimeUnit value={timeLeft.seconds} label="seconds" />
        </div>
      </div>
    </div>
  );
};

export default CountDown;
