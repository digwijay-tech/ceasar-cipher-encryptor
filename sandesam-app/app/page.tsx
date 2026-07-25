import React from "react";
import Image from "next/image";
import { CipherTool } from "@/features/cipher";
import { OnboardingModal } from "@/features/onboarding";
import logo from "./favicon.ico";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50 font-sans">
      <header className="w-full max-w-4xl mx-auto px-6 pt-16 pb-8 text-center sm:text-left flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent sm:text-4xl">
            Sandesam
          </h1>
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

      <OnboardingModal />

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
