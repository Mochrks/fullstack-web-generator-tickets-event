"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "../ui/aurora-background";
import { useNavigate } from "react-router-dom";

import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "../ui/glowing-stars";

export function LandingPage() {
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/form");
  };
  const handleCheck = () => {
    navigate("/check");
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 "
      >
        <div className="text-4xl md:text-7xl font-bold dark:text-white text-center">
          Generate, Customize, and Manage Event Tickets
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Your Event, Your Tickets, Your Way
        </div>

        <button
          className="bg-black dark:bg-white text-white dark:text-black w-40 h-10 rounded-xl  border border-black text-sm"
          onClick={handleGenerate}
        >
          Generate
        </button>
        <div className="flex  pt-10 items-center justify-center antialiased">
          <GlowingStarsBackgroundCard>
            <GlowingStarsTitle>Check Your Ticket</GlowingStarsTitle>
            <div className="flex justify-between items-end">
              <GlowingStarsDescription>
                This service allows you to confirm ticket details and ensure that you have a valid entry.
              </GlowingStarsDescription>
              <button
                className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center cursor-pointer"
                onClick={handleCheck}
              >
                <Icon />
              </button>
            </div>
          </GlowingStarsBackgroundCard>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
