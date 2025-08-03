import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const categoryColors = {
  food_dining: "bg-orange-500 text-white",
  transport: "bg-blue-500 text-white", 
  utilities: "bg-green-500 text-white",
  entertainment: "bg-purple-500 text-white",
  shopping: "bg-pink-500 text-white",
  healthcare: "bg-red-500 text-white",
  subscriptions: "bg-indigo-500 text-white",
  fuel: "bg-yellow-500 text-black",
  groceries: "bg-lime-500 text-black",
  rent: "bg-gray-500 text-white",
  charity_zakat: "bg-emerald-500 text-white",
  other: "bg-gray-400 text-white"
};

export default function RecentExpenses({ expenses, isLoading }) {
  if (isLoading) {
    return (
      <Card className="neo-brutal-border neo-brutal-shadow bg-white">
        <div className="p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="neo-brutal-border neo-brutal-shadow bg-white">
      <div className="p-6">
        <h3 className="neo-brutal-text text-2xl mb-6 asymmetric-skew">RECENT EXPENSES</h3>
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 font-bold">NO EXPENSES YET</p>
              <p className="text-sm text-gray-400 mt-2">Add your first expense to get started!</p>
            </div>
          ) : (
            expenses.map((expense) => (
              <div 
                key={expense.id}
                className="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors duration-200 neo-brutal-border border-2 border-transparent hover:border-black"
              >
                <div className="flex items-center gap-3">
                  <Badge 
                    className={`${categoryColors[expense.category] || categoryColors.other} neo-brutal-border border-2 border-black neo-brutal-shadow-small neo-brutal-text text-xs`}
                  >
                    {expense.category.replace(/_/g, ' ').toUpperCase()}
                  </Badge>
                  <div>
                    <p className="font-bold text-black">{expense.title}</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {format(new Date(expense.date), "MMM d, yyyy")}
                      {expense.merchant && ` • ${expense.merchant}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="neo-brutal-text text-lg text-black">
                    QAR {expense.amount.toFixed(2)}
                  </p>
                  {expense.is_recurring && (
                    <p className="text-xs text-purple-600 font-bold">RECURRING</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}