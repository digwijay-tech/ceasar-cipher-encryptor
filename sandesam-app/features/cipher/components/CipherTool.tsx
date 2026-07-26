"use client";

import React, { useState, useEffect } from "react";
import { encryptMessage, decryptMessage, generateSecretCode } from "../utils/cipher";

export function CipherTool() {
  const [inputText, setInputText] = useState("");
  const [shift, setShift] = useState(7);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [secretCode, setSecretCode] = useState(() => generateSecretCode());

  let result = "";
  let errorMsg = "";

  if (mode === "encrypt") {
    if (inputText) {
      result = encryptMessage(inputText + secretCode, shift);
    }
  } else {
    if (inputText && secretCode) {
      if (secretCode.length !== 4) {
        errorMsg = "Secret code must be exactly 4 letters.";
      } else {
        const decrypted = decryptMessage(inputText, shift);
        if (decrypted.length >= 4) {
          const suffix = decrypted.slice(-4);
          if (suffix.toLowerCase() === secretCode.toLowerCase()) {
            result = decrypted.slice(0, -4);
          } else {
            errorMsg = "the code is not the same";
          }
        } else {
          errorMsg = "the code is not the same";
        }
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  const handleModeChange = (newMode: "encrypt" | "decrypt") => {
    if (newMode !== mode) {
      setMode(newMode);
      setInputText("");
      setShift(7);
      setSecretCode(newMode === "encrypt" ? generateSecretCode() : "");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl transition-all duration-300">
      <div className="flex flex-col gap-6">
        {/* Toggle Mode */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
          <button
            onClick={() => handleModeChange("encrypt")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              mode === "encrypt"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            Encrypt
          </button>
          <button
            onClick={() => handleModeChange("decrypt")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              mode === "decrypt"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            Decrypt
          </button>
        </div>

        {/* Input Text Area */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {mode === "encrypt" ? "Message to Encrypt" : "Message to Decrypt"}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              mode === "encrypt"
                ? "Enter your secret message here..."
                : "Enter the ciphered message here..."
            }
            className="w-full h-32 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all duration-200 resize-none font-sans"
          />
        </div>

        {/* Shift Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Shift key</span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">Number of letters to shift</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="range"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => setShift(Number(e.target.value))}
              className="accent-zinc-900 dark:accent-zinc-100 h-1.5 flex-1 sm:w-32 sm:flex-none rounded-lg bg-zinc-200 dark:bg-zinc-800 cursor-pointer"
            />
            <span className="w-8 text-right font-mono text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {shift}
            </span>
          </div>
        </div>

        {/* Secret Code Section */}
        {mode === "encrypt" ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Secret Code</span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">4-letter code stitched before encrypting</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-mono text-sm font-bold tracking-wider text-zinc-800 dark:text-zinc-200 select-all">
                {secretCode}
              </span>
              <button
                onClick={() => setSecretCode(generateSecretCode())}
                className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 shadow-sm"
                title="Regenerate secret code"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              4-Letter Secret Code
            </label>
            <input
              type="text"
              maxLength={4}
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase())}
              placeholder="Enter 4-letter secret code"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all duration-200 font-mono text-sm tracking-wider"
            />
          </div>
        )}

        {/* Result Area */}
        {result && !errorMsg && (
          <div className="flex flex-col gap-2 animate-fadeIn">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Output Result
            </label>
            <div className="relative group">
              <div className="w-full min-h-24 px-4 py-3 pr-12 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-850 font-mono text-sm text-zinc-900 dark:text-zinc-100 break-all select-all whitespace-pre-wrap">
                {result}
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
                title="Copy to clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m10.5 8.25V4.875C15.75 4.17 15.18 3.6 14.475 3.6H5.25m10.5 13.5h3.375c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9M19.5 12h-3.375a1.125 1.125 0 0 0-1.125 1.125V15.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Verification Failure Message */}
        {errorMsg && (
          <div className="flex flex-col gap-2 animate-fadeIn">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Decryption Status
            </label>
            <div className="w-full px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 font-sans text-sm text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

