import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, CreditCard, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuickStats({ monthlyTotal, percentageChange, subscriptionCount, isLoading }) {
  const stats = [
    {
      title: "THIS MONTH",
      value: `QAR ${monthlyTotal.toFixed(2)}`,
      icon: Wallet,
      trend: percentageChange,
      color: "bg-blue-500"
    },
    {
      title: "ACTIVE SUBS",
      value: subscriptionCount,
      icon: CreditCard,
      color: "bg-red-500"
    },
    {
      title: "AVG/DAY",
      value: `QAR ${(monthlyTotal / new Date().getDate()).toFixed(2)}`,
      icon: Calendar,
      color: "bg-green-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="neo-brutal-border neo-brutal-shadow p-6">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index}
          className={`${stat.color} neo-brutal-border neo-brutal-shadow text-white overflow-hidden transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
        >
          <div className="p-6 asymmetric-skew">
            <div className="reverse-skew">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-8 h-8" />
                {stat.trend !== undefined && (
                  <div className="flex items-center gap-1">
                    {stat.trend >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-bold">
                      {Math.abs(stat.trend).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
              <p className="neo-brutal-text text-sm mb-2">{stat.title}</p>
              <p className="neo-brutal-text text-2xl lg:text-3xl">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}