"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CipherTool } from "@/features/cipher";
import { OnboardingModal } from "@/features/onboarding";
import logo from "./favicon.ico";

export default function Home() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 font-sans">
      <header className="w-full max-w-4xl mx-auto px-6 pt-16 pb-8 text-center sm:text-left flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent sm:text-4xl">
              Sandesam
            </h1>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors duration-200 shadow-sm flex items-center justify-center"
              title="Show instructions"
              aria-label="Help / Instructions"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Secure your messages using the Caesar Cipher technique.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={logo}
            alt="Sandesam Logo"
            width={64}
            height={64}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain select-none transition-transform duration-500 hover:rotate-12 hover:scale-105"
            priority
          />
        </div>
      </header>

      <OnboardingModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pb-24 flex flex-col items-center">
        <CipherTool />

        <div className="mt-12 text-center max-w-lg">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
            Sandesam (സന്ദേശം) translates to "Message". The Caesar cipher is a simple encryption technique where each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.
          </p>
        </div>
      </main>
    </div>
  );
}
