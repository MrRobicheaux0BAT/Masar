
import React, { useState } from "react";
import { Expense } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Save, Receipt } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/components/providers/LanguageProvider";

const CATEGORIES = [
  { value: "food_dining", label: { en: "Food & Dining", ar: "الطعام والمطاعم" }, emoji: "🍽️" },
  { value: "transport", label: { en: "Transport", ar: "النقل" }, emoji: "🚗" },
  { value: "utilities", label: { en: "Utilities", ar: "المرافق" }, emoji: "⚡" },
  { value: "entertainment", label: { en: "Entertainment", ar: "الترفيه" }, emoji: "🎬" },
  { value: "shopping", label: { en: "Shopping", ar: "التسوق" }, emoji: "🛍️" },
  { value: "healthcare", label: { en: "Healthcare", ar: "الرعاية الصحية" }, emoji: "🏥" },
  { value: "education", label: { en: "Education", ar: "التعليم" }, emoji: "📚" },
  { value: "subscriptions", label: { en: "Subscriptions", ar: "الاشتراكات" }, emoji: "📱" },
  { value: "fuel", label: { en: "Fuel", ar: "الوقود" }, emoji: "⛽" },
  { value: "groceries", label: { en: "Groceries", ar: "البقالة" }, emoji: "🛒" },
  { value: "rent", label: { en: "Rent", ar: "الإيجار" }, emoji: "🏠" },
  { value: "telecom", label: { en: "Telecom", ar: "الاتصالات" }, emoji: "📞" },
  { value: "travel", label: { en: "Travel", ar: "السفر" }, emoji: "✈️" },
  { value: "charity_zakat", label: { en: "Charity/Zakat", ar: "الزكاة/الصدقة" }, emoji: "🤲" },
  { value: "remittances", label: { en: "Remittances", ar: "التحويلات" }, emoji: "💸" },
  { value: "other", label: { en: "Other", ar: "أخرى" }, emoji: "📋" }
];

const PAYMENT_METHODS = [
  { value: "cash", label: { en: "Cash", ar: "نقداً" } },
  { value: "card", label: { en: "Debit/Credit Card", ar: "بطاقة ائتمان/خصم" } },
  { value: "bank_transfer", label: { en: "Bank Transfer", ar: "تحويل بنكي" } },
  { value: "mobile_wallet", label: { en: "Mobile Wallet", ar: "محفظة إلكترونية" } }
];

export default function AddExpense() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: format(new Date(), "yyyy-MM-dd"),
    merchant: "",
    payment_method: "card",
    is_recurring: false,
    notes: ""
  });
  const { isArabic, t } = useLanguage();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount || !formData.category) {
      alert(t({ en: "Please fill in all required fields", ar: "يرجى ملء جميع الحقول المطلوبة" }));
      return;
    }

    setIsLoading(true);
    try {
      await Expense.create({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      
      // Dispatch custom event to notify dashboard of changes
      window.dispatchEvent(new CustomEvent('expense-added'));
      
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error creating expense:", error);
      alert(t({ en: "Failed to save expense. Please try again.", ar: "فشل في حفظ المصروف. يرجى المحاولة مرة أخرى." }));
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="neo-brutal-border neo-brutal-shadow-small hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="neo-brutal-text text-4xl text-black asymmetric-skew">
              {t({ en: 'ADD EXPENSE', ar: 'إضافة مصروف' })}
            </h1>
            <p className="text-gray-600 font-bold">
              {t({ en: 'Track your spending in QAR', ar: 'تتبع إنفاقك بالريال القطري' })}
            </p>
          </div>
        </div>

        <Card className="neo-brutal-border neo-brutal-shadow bg-white">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Expense Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="neo-brutal-text text-lg">
                {t({ en: 'EXPENSE TITLE *', ar: 'عنوان المصروف *' })}
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder={t({ en: "What did you spend on?", ar: "على ماذا أنفقت؟" })}
                className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
                required
              />
            </div>

            {/* Amount and Category Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="neo-brutal-text text-lg">
                  {t({ en: 'AMOUNT (QAR) *', ar: 'المبلغ (ريال قطري) *' })}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="0.00"
                  className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="neo-brutal-text text-lg">
                  {t({ en: 'CATEGORY *', ar: 'الفئة *' })}
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="neo-brutal-border neo-brutal-shadow-small text-lg p-4">
                    <SelectValue placeholder={t({ en: "Select category", ar: "اختر الفئة" })} />
                  </SelectTrigger>
                  <SelectContent className="neo-brutal-border">
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value} className="text-lg py-3 pr-3 pl-10">
                        <span className="flex items-center gap-2">
                          <span>{category.emoji}</span>
                          <span className="font-bold">{t(category.label)}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date and Merchant Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="neo-brutal-text text-lg">
                  {t({ en: 'DATE *', ar: 'التاريخ *' })}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="merchant" className="neo-brutal-text text-lg">
                  {t({ en: 'MERCHANT/STORE', ar: 'المتجر/التاجر' })}
                </Label>
                <Input
                  id="merchant"
                  value={formData.merchant}
                  onChange={(e) => handleInputChange("merchant", e.target.value)}
                  placeholder={t({ en: "Where did you shop?", ar: "أين تسوقت؟" })}
                  className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label className="neo-brutal-text text-lg">
                {t({ en: 'PAYMENT METHOD', ar: 'طريقة الدفع' })}
              </Label>
              <Select value={formData.payment_method} onValueChange={(value) => handleInputChange("payment_method", value)}>
                <SelectTrigger className="neo-brutal-border neo-brutal-shadow-small text-lg p-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method.value} value={method.value} className="text-lg py-3 pr-3 pl-10">
                      <span className="font-bold">{t(method.label)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recurring Toggle */}
            <div className="flex items-center justify-between p-4 neo-brutal-border neo-brutal-shadow-small bg-yellow-50">
              <div>
                <Label className="neo-brutal-text text-lg">
                  {t({ en: 'RECURRING EXPENSE', ar: 'مصروف متكرر' })}
                </Label>
                <p className="text-sm text-gray-600 font-medium">
                  {t({ en: 'Mark if this repeats monthly', ar: 'ضع علامة إذا كان يتكرر شهرياً' })}
                </p>
              </div>
              <Switch
                checked={formData.is_recurring}
                onCheckedChange={(checked) => handleInputChange("is_recurring", checked)}
                className="neo-brutal-border"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="neo-brutal-text text-lg">
                {t({ en: 'NOTES', ar: 'ملاحظات' })}
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder={t({ en: "Additional details...", ar: "تفاصيل إضافية..." })}
                className="neo-brutal-border neo-brutal-shadow-small text-lg p-4 h-24"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text text-xl py-6 transition-all duration-200 hover:translate-x-2 hover:translate-y-2 hover:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t({ en: 'SAVING...', ar: 'جاري الحفظ...' })}
                </div>
              ) : (
                <>
                  <Save className="w-6 h-6 mr-2" />
                  {t({ en: 'SAVE EXPENSE', ar: 'حفظ المصروف' })}
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
