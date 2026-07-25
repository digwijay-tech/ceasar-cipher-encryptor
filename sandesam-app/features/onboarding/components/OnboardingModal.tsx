"use client";

import React, { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "sandesam_onboarding_seen";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    title: "Welcome to Sandesam",
    description:
      "Sandesam (സന്ദേശം) means \"Message\" in Malayalam. This app lets you encrypt and decrypt messages using the classic Caesar Cipher technique — simple, fun, and effective.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Encrypting a Message",
    description:
      "Select \"Encrypt\" mode, type your secret message, choose a shift key (1–25), and your encrypted message appears instantly. Copy it and share it with your recipient!",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Decrypting a Message",
    description:
      "Switch to \"Decrypt\" mode, paste the encrypted text, use the same shift key that was used to encrypt, and the original message is revealed.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
      </svg>
    ),
    title: "The Shift Key",
    description:
      "The shift key is your secret number. Both sender and receiver must agree on the same key. Use the slider to pick a value between 1 and 25. Keep it secret!",
  },
];

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (seen !== "true") {
        // Small delay so the page renders first
        const timer = setTimeout(() => setIsOpen(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable, skip
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (dontShowAgain) {
        try {
          localStorage.setItem(STORAGE_KEY, "true");
        } catch {
          // ignore
        }
      }
    }, 250);
  }, [dontShowAgain]);

  const handleGetStarted = useCallback(() => {
    // Always mark as seen when the user completes the walkthrough
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const currentStep = steps[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-250 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Sandesam"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-250 ${
          isClosing
            ? "scale-95 opacity-0"
            : "scale-100 opacity-100 animate-[modalIn_0.35s_ease-out]"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Step indicator dots */}
        <div className="flex justify-center gap-1.5 pt-6 pb-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeStep
                  ? "w-6 bg-white"
                  : "w-1.5 bg-zinc-600 hover:bg-zinc-500"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-8 pt-4 pb-6">
          {/* Icon + step number */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/10 text-white">
              {currentStep.icon}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              Step {activeStep + 1} of {steps.length}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
            {currentStep.title}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed text-zinc-400">
            {currentStep.description}
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 flex flex-col gap-4">
          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            {activeStep > 0 && (
              <button
                onClick={() => setActiveStep((s) => s - 1)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-zinc-700 text-zinc-300 hover:bg-white/5 transition-colors duration-150"
              >
                Back
              </button>
            )}
            <button
              onClick={
                isLastStep
                  ? handleGetStarted
                  : () => setActiveStep((s) => s + 1)
              }
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                isLastStep
                  ? "bg-white text-zinc-900 hover:bg-zinc-200 shadow-lg shadow-white/10"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
              }`}
            >
              {isLastStep ? "Get Started" : "Next"}
            </button>
          </div>

          {/* Don't show again */}
          <label className="flex items-center gap-2 cursor-pointer group self-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-4 h-4 rounded border border-zinc-600 bg-zinc-800 peer-checked:bg-white peer-checked:border-white transition-all duration-150 flex items-center justify-center">
                {dontShowAgain && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-zinc-900">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-150 select-none">
              Don&apos;t show this again
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
