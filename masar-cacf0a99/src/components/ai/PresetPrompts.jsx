import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";

const presets = {
  en: [
    "Analyze my spending this month vs last month",
    "How can I optimize my budget based on my patterns?",
    "Calculate my Zakat obligation",
    "What are my biggest expense categories?",
    "Should I cancel any subscriptions?",
    "How much can I save monthly with my current income?",
    "Create a savings plan for my goals",
    "Review my account balances and suggest improvements"
  ],
  ar: [
    "حلل إنفاقي هذا الشهر مقابل الشهر الماضي",
    "كيف يمكنني تحسين ميزانيتي بناءً على أنماطي؟",
    "احسب التزام الزكاة الخاص بي",
    "ما هي أكبر فئات الإنفاق لدي؟",
    "هل يجب أن ألغي أي اشتراكات؟",
    "كم يمكنني توفير شهرياً مع دخلي الحالي؟",
    "أنشئ خطة ادخار لأهدافي",
    "راجع أرصدة حساباتي واقترح تحسينات"
  ]
};

const colors = ["bg-red-500", "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-indigo-500", "bg-pink-500", "bg-teal-500"];

export default function PresetPrompts({ onPromptClick, disabled }) {
  const { isArabic } = useLanguage();
  const currentPresets = presets[isArabic ? 'ar' : 'en'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {currentPresets.map((prompt, index) => (
        <Button
          key={prompt}
          onClick={() => onPromptClick(prompt)}
          disabled={disabled}
          className={`${colors[index % colors.length]} hover:bg-opacity-90 text-white neo-brutal-border neo-brutal-shadow-small neo-brutal-text text-xs h-auto min-h-[60px] p-3 transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none whitespace-normal text-left leading-tight`}
        >
          <span className="block w-full break-words hyphens-auto">
            {prompt}
          </span>
        </Button>
      ))}
    </div>
  );
}