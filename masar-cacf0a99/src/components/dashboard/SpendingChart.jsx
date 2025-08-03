import React from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, subWeeks } from "date-fns";

export default function SpendingChart({ expenses, isLoading }) {
  if (isLoading) {
    return (
      <Card className="neo-brutal-border neo-brutal-shadow bg-white">
        <div className="p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Card>
    );
  }

  // Generate last 7 days data
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const chartData = daysInWeek.map(day => {
    const dayExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return format(expenseDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    });
    
    const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      day: format(day, 'EEE'),
      amount: total,
      fullDate: format(day, 'yyyy-MM-dd')
    };
  });

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <Card className="neo-brutal-border neo-brutal-shadow bg-white">
      <div className="p-6">
        <h3 className="neo-brutal-text text-2xl mb-6 asymmetric-skew">WEEKLY SPENDING</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 'bold', fill: '#000' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 'bold', fill: '#000' }}
                tickFormatter={(value) => `QAR ${value}`}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 font-bold">
            TOTAL THIS WEEK: QAR {chartData.reduce((sum, day) => sum + day.amount, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  );
}