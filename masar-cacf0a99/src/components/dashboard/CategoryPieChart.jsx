
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { subDays } from "date-fns";
import { useLanguage } from "@/components/providers/LanguageProvider";

const CATEGORY_COLORS = {
  food: "#ef4444",
  food_dining: "#ef4444",
  groceries: "#22c55e",
  transport: "#3b82f6", 
  utilities: "#10b981",
  entertainment: "#8b5cf6",
  shopping: "#ec4899",
  healthcare: "#f59e0b",
  subscriptions: "#6366f1",
  fuel: "#eab308",
  rent: "#6b7280",
  charity_zakat: "#059669",
  bills: "#f97316",
  other: "#9ca3af"
};

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function CategoryPieChart({ expenses, isLoading }) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <Card className="neo-brutal-border neo-brutal-shadow bg-white">
        <div className="p-6">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Card>
    );
  }

  // Get last 30 days expenses
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentExpenses = expenses.filter(expense => 
    new Date(expense.date) >= thirtyDaysAgo
  );

  // Group by category - handle both receipt categories and expense categories
  const categoryData = recentExpenses.reduce((acc, expense) => {
    let category = expense.category || 'other';
    
    // Normalize category names from receipts to match expense categories
    const categoryMapping = {
      'Food': 'food_dining',
      'Groceries': 'groceries',
      'Transport': 'transport',
      'Shopping': 'shopping',
      'Bills': 'utilities',
      'Other': 'other'
    };
    
    // If it's a receipt category, map it to expense category
    if (categoryMapping[category]) {
      category = categoryMapping[category];
    }
    
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {});

  // Convert to chart data
  const chartData = Object.entries(categoryData)
    .map(([category, amount]) => ({
      name: category.replace(/_/g, ' ').toUpperCase(),
      value: amount,
      color: CATEGORY_COLORS[category] || CATEGORY_COLORS.other
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // Top 8 categories

  if (chartData.length === 0) {
    return (
      <Card className="neo-brutal-border neo-brutal-shadow bg-white">
        <div className="p-6 text-center">
          <h3 className="neo-brutal-text text-2xl mb-4 asymmetric-skew">{t({en: 'SPENDING BREAKDOWN', ar: 'تفاصيل الإنفاق'})}</h3>
          <div className="py-12">
            <p className="text-gray-500 font-bold text-lg">{t({en: 'NO EXPENSES IN LAST 30 DAYS', ar: 'لا توجد مصاريف في آخر 30 يومًا'})}</p>
            <p className="text-sm text-gray-400 mt-2">{t({en: 'Add some expenses to see the breakdown', ar: 'أضف بعض المصاريف لرؤية التفاصيل'})}</p>
          </div>
        </div>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white neo-brutal-border neo-brutal-shadow-small p-3">
          <p className="neo-brutal-text text-sm">{data.name}</p>
          <p className="font-bold">QAR {data.value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="neo-brutal-border neo-brutal-shadow bg-white">
      <div className="p-6">
        <h3 className="neo-brutal-text text-2xl mb-6 asymmetric-skew">
          {t({en: 'SPENDING BREAKDOWN (30 DAYS)', ar: 'تفاصيل الإنفاق (آخر 30 يومًا)'})}
        </h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                stroke="#000000"
                strokeWidth={3}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value, entry) => (
                  <span className="font-bold text-sm">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 font-bold">
            {t({en: 'TOTAL LAST 30 DAYS:', ar: 'إجمالي آخر 30 يومًا:'})} QAR {chartData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  );
}
