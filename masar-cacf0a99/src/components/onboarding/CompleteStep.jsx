
import React from "react";
import { CheckCircle, Smartphone, Brain, BarChart3 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function CompleteStep({ user }) {
  const { t } = useLanguage();
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-500 neo-brutal-border neo-brutal-shadow mx-auto flex items-center justify-center rounded-full">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
      
      <div>
        <h1 className="neo-brutal-text text-4xl text-black mb-4 asymmetric-skew">
          YOU'RE ALL SET!
        </h1>
        <p className="text-xl text-gray-600 font-bold">
          Masar is ready to help you master your money in Qatar
        </p>
      </div>

      <div className="bg-green-50 neo-brutal-border neo-brutal-shadow-small p-6 asymmetric-skew">
        <div className="reverse-skew">
          <h3 className="neo-brutal-text text-lg mb-4">WHAT'S NEXT:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-left">
              <Smartphone className="w-6 h-6 text-green-600" />
              <span className="font-bold">Start logging your first expenses</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <Brain className="w-6 h-6 text-green-600" />
              <span className="font-bold">Chat with your AI money coach</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <span className="font-bold">View your spending insights</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 font-medium mb-2">
          💡 <strong>Pro Tip:</strong> Enable notifications to get alerts about upcoming bills and subscription renewals.
        </p>
      </div>
    </div>
  );
}
