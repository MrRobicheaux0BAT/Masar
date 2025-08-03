
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Wallet } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ProfileStep({ userData, updateUserData }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="neo-brutal-text text-3xl text-black mb-2 asymmetric-skew">
          TELL US ABOUT YOU
        </h2>
        <p className="text-gray-600 font-bold">
          This helps us provide personalized financial advice
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="neo-brutal-text text-lg flex items-center gap-2">
            <User className="w-5 h-5" />
            FULL NAME *
          </Label>
          <Input
            id="full_name"
            value={userData.full_name || ""}
            onChange={(e) => updateUserData("full_name", e.target.value)}
            placeholder="Enter your full name"
            className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary" className="neo-brutal-text text-lg flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            MONTHLY SALARY (QAR) *
          </Label>
          <Input
            id="salary"
            type="number"
            step="100"
            min="0"
            value={userData.salary}
            onChange={(e) => updateUserData("salary", e.target.value)}
            placeholder="e.g. 15000"
            className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="side_income" className="neo-brutal-text text-lg">
            AVERAGE SIDE INCOME (QAR/MONTH)
          </Label>
          <Input
            id="side_income"
            type="number"
            step="100"
            min="0"
            value={userData.side_income}
            onChange={(e) => updateUserData("side_income", e.target.value)}
            placeholder="e.g. 2000 (optional)"
            className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
          />
          <p className="text-sm text-gray-500 font-medium">
            Include freelancing, investments, or other regular income
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 neo-brutal-border neo-brutal-shadow-small p-4 asymmetric-skew">
        <div className="reverse-skew">
          <p className="text-sm text-gray-700 font-bold">
            💡 <strong>Why we ask:</strong> Your income helps our AI coach provide better budgeting advice and goal planning tailored for Qatar.
          </p>
        </div>
      </div>
    </div>
  );
}
