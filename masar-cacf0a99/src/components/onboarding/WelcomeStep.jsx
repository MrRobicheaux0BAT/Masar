
import React from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function WelcomeStep() {
  const { t } = useLanguage();
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-yellow-400 neo-brutal-border neo-brutal-shadow mx-auto flex items-center justify-center asymmetric-skew">
        <span className="neo-brutal-text text-black text-3xl reverse-skew">M</span>
      </div>
      
      <div>
        <h1 className="neo-brutal-text text-4xl text-black mb-4 asymmetric-skew">
          WELCOME TO MASAR
        </h1>
        <p className="text-xl text-gray-600 font-bold leading-relaxed">
          Track every bill, plan your budget, and reach your goals—Arabic & English support included.
        </p>
      </div>

      <div className="bg-blue-50 neo-brutal-border neo-brutal-shadow-small p-6 asymmetric-skew">
        <div className="reverse-skew">
          <h3 className="neo-brutal-text text-lg mb-3">WHAT YOU'LL GET:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <span className="font-bold">Auto expense tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="font-bold">AI money coach</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="font-bold">Zakat calculations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <span className="font-bold">Smart reports</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 font-medium">
        This setup will take about 2 minutes to complete.
      </p>
    </div>
  );
}
