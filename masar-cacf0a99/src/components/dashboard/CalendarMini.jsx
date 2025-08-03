
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Dot } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, isToday, addDays } from 'date-fns';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { ar } from 'date-fns/locale';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function CalendarMini({ expenses, subscriptions, isLoading }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isArabic, t } = useLanguage();

  const getEventsForDate = (date) => {
    const expenseEvents = expenses.filter(e => isSameDay(new Date(e.date), date));
    const subscriptionEvents = subscriptions.filter(s => isSameDay(new Date(s.next_billing_date), date));
    return expenseEvents.length > 0 || subscriptionEvents.length > 0;
  };
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  
  let days = eachDayOfInterval({
    start: calendarStart,
    end: addDays(calendarStart, 34) // Ensure 5 rows
  });

  const weekDays = isArabic 
    ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'] // Sun, Mon, Tue, Wed, Thu, Fri, Sat
    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="neo-brutal-text text-xl asymmetric-skew">{format(currentDate, 'MMMM yyyy', { locale: isArabic ? ar : undefined }).toUpperCase()}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="neo-brutal-border neo-brutal-shadow-small" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="neo-brutal-border neo-brutal-shadow-small" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {weekDays.map(day => <div key={day} className="font-bold text-sm text-gray-500">{day}</div>)}
        {days.map(day => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const hasEvent = getEventsForDate(day);
          const isDayToday = isToday(day);

          return (
            <div key={day.toString()} className="relative flex justify-center items-center">
              <button
                className={`w-8 h-8 rounded-full transition-colors duration-200 flex justify-center items-center relative
                  ${isCurrentMonth ? 'text-black' : 'text-gray-300'} 
                  ${isDayToday ? 'bg-yellow-400 font-bold' : ''}
                  ${!isDayToday && isCurrentMonth ? 'hover:bg-gray-100' : ''}
                `}
              >
                {format(day, 'd')}
                {hasEvent && <Dot className={`absolute -bottom-2 w-6 h-6 ${isDayToday ? 'text-black' : 'text-blue-500'}`} />}
              </button>
            </div>
          )
        })}
      </div>
    </Card>
  );
}
