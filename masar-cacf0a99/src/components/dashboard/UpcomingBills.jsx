
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calendar, Repeat, ArrowRight } from "lucide-react";
import { format, isWithinInterval, addDays } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function UpcomingBills({ subscriptions, isLoading }) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <Card className="neo-brutal-border neo-brutal-shadow bg-white">
        <div className="p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 border-2 border-gray-200">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-6 w-24 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const upcomingBills = subscriptions
    .filter(sub => sub.status === 'active')
    .sort((a, b) => new Date(a.next_billing_date) - new Date(b.next_billing_date))
    .slice(0, 5);

  const getUrgencyColor = (date) => {
    const today = new Date();
    const billDate = new Date(date);
    
    if (isWithinInterval(billDate, { start: today, end: addDays(today, 3) })) {
      return "bg-red-500 text-white";
    } else if (isWithinInterval(billDate, { start: today, end: addDays(today, 7) })) {
      return "bg-yellow-500 text-black";
    }
    return "bg-gray-200 text-black";
  };

  return (
    <Card className="neo-brutal-border neo-brutal-shadow bg-white">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h3 className="neo-brutal-text text-xl asymmetric-skew">{t({en: 'UPCOMING BILLS', ar: 'الفواتير القادمة'})}</h3>
        </div>
        
        <div className="space-y-3">
          {upcomingBills.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-bold">{t({en: 'NO UPCOMING BILLS', ar: 'لا توجد فواتير قادمة'})}</p>
              <p className="text-sm text-gray-400 mt-1">{t({en: 'Add subscriptions to track them', ar: 'أضف اشتراكات لتتبعها'})}</p>
            </div>
          ) : (
            upcomingBills.map((bill) => (
              <div 
                key={bill.id}
                className="p-4 neo-brutal-border neo-brutal-shadow-small bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-black text-lg">{bill.service_name}</h4>
                  <Badge 
                    className={`${getUrgencyColor(bill.next_billing_date)} neo-brutal-border border-2 border-black neo-brutal-text text-xs`}
                  >
                    {format(new Date(bill.next_billing_date), "MMM d")}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 font-medium capitalize">
                    {bill.category.replace(/_/g, ' ')} • {t({en: bill.billing_cycle, ar: bill.billing_cycle === 'monthly' ? 'شهري' : bill.billing_cycle})}
                  </p>
                  <p className="neo-brutal-text text-lg text-black">
                    {t({en: 'QAR', ar: 'ر.ق'})} {bill.amount.toFixed(2)}
                  </p>
                </div>
                {bill.status === 'trial' && (
                  <p className="text-xs text-orange-600 font-bold mt-1">
                    {t({en: 'TRIAL ENDS:', ar: 'تنتهي الفترة التجريبية:'})} {format(new Date(bill.trial_ends), "MMM d")}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
