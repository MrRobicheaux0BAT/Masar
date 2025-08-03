
import React, { useState, useEffect } from "react";
import { Expense, Subscription, User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday,
  startOfWeek,
  endOfWeek,
  addDays,
  addWeeks
} from "date-fns";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Calendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [expenses, setExpenses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      const [expenseData, subscriptionData] = await Promise.all([
        Expense.filter({ created_by: currentUser.email }, "-date", 100),
        Subscription.filter({ created_by: currentUser.email })
      ]);
      setExpenses(expenseData);
      setSubscriptions(subscriptionData);
    } catch (error) {
      console.error("Error loading calendar data:", error);
    }
    setIsLoading(false);
  };

  const navigatePeriod = (direction) => {
    const modifier = direction === 'next' ? 1 : -1;
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, modifier));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, modifier));
    } else if (view === 'day') {
      setCurrentDate(addDays(currentDate, modifier));
    }
  };

  const getEventsForDate = (date) => {
    const events = [];
    
    // Add expenses for this date
    expenses.forEach(expense => {
      if (isSameDay(new Date(expense.date), date)) {
        events.push({
          id: expense.id,
          type: 'expense',
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          color: 'bg-red-500'
        });
      }
    });

    // Add subscription due dates
    subscriptions.forEach(subscription => {
      if (isSameDay(new Date(subscription.next_billing_date), date)) {
        events.push({
          id: subscription.id,
          type: 'subscription',
          title: subscription.service_name,
          amount: subscription.amount,
          category: subscription.category,
          color: 'bg-blue-500'
        });
      }
    });

    return events;
  };

  const renderHeaderTitle = () => {
    if (view === 'month') {
      return format(currentDate, 'MMMM yyyy').toUpperCase();
    }
    if (view === 'week') {
      const weekStart = startOfWeek(currentDate);
      const weekEnd = endOfWeek(currentDate);
      if (weekStart.getMonth() === weekEnd.getMonth()) {
          return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'd, yyyy')}`.toUpperCase();
      }
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`.toUpperCase();
    }
    if (view === 'day') {
      return format(currentDate, 'MMMM d, yyyy').toUpperCase();
    }
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return (
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center neo-brutal-text text-sm bg-gray-200 neo-brutal-border">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map(day => {
          const events = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);
          
          return (
            <div
              key={day.toISOString()}
              className={`min-h-24 p-2 neo-brutal-border transition-all duration-200 hover:bg-gray-50 ${
                isCurrentMonth ? 'bg-white' : 'bg-gray-100'
              } ${isDayToday ? 'bg-yellow-100 border-yellow-400' : ''}`}
            >
              <div className={`text-sm font-bold mb-1 ${
                isCurrentMonth ? 'text-black' : 'text-gray-400'
              } ${isDayToday ? 'neo-brutal-text' : ''}`}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {events.slice(0, 2).map((event, index) => (
                  <div
                    key={index}
                    className={`${event.color} text-white text-xs p-1 neo-brutal-shadow-small cursor-pointer hover:opacity-80`}
                    onClick={() => navigate(createPageUrl(event.type === 'expense' ? 'AddExpense' : 'Subscriptions'))}
                  >
                    <div className="truncate font-bold">{event.title}</div>
                    <div>QAR {event.amount.toFixed(0)}</div>
                  </div>
                ))}
                {events.length > 2 && (
                  <div className="text-xs text-gray-500 font-bold">
                    +{events.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const days = eachDayOfInterval({ start: weekStart, end: endOfWeek(currentDate) });

    return (
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-2">
        {days.map(day => {
          const events = getEventsForDate(day);
          const isDayToday = isToday(day);
          return (
            <div key={day.toISOString()} className={`min-h-48 p-3 neo-brutal-border ${isDayToday ? 'bg-yellow-100' : 'bg-white'}`}>
              <div className={`text-center font-bold mb-3 pb-2 border-b-2 border-black ${isDayToday ? 'neo-brutal-text' : ''}`}>
                <p>{format(day, 'E')}</p>
                <p className="text-2xl">{format(day, 'd')}</p>
              </div>
              <div className="space-y-2">
                {events.map((event, index) => (
                   <div
                    key={index}
                    className={`${event.color} text-white text-xs p-2 neo-brutal-shadow-small cursor-pointer hover:opacity-80`}
                    onClick={() => navigate(createPageUrl(event.type === 'expense' ? 'AddExpense' : 'Subscriptions'))}
                  >
                    <div className="truncate font-bold">{event.title}</div>
                    <div>QAR {event.amount.toFixed(0)}</div>
                  </div>
                ))}
                {events.length === 0 && <p className="text-xs text-gray-400 text-center pt-4">No events</p>}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderDayView = () => {
    const events = getEventsForDate(currentDate);
    const isDayToday = isToday(currentDate);

    return (
      <div className={`p-4 neo-brutal-border ${isDayToday ? 'bg-yellow-100' : 'bg-white'}`}>
         {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event, index) => (
              <Card key={index} className={`neo-brutal-border neo-brutal-shadow-small ${event.color} text-white`}>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">{event.title}</p>
                      <p className="text-sm capitalize">{event.type}: {event.category}</p>
                    </div>
                    <p className="font-bold text-xl">QAR {event.amount.toFixed(2)}</p>
                  </div>
              </Card>
            ))}
          </div>
         ) : (
          <div className="text-center py-16">
            <h3 className="neo-brutal-text text-2xl text-gray-600 mb-2">ALL CLEAR!</h3>
            <p className="text-gray-500 font-medium">No expenses or bills scheduled for today.</p>
          </div>
         )}
      </div>
    );
  };

  const renderCalendarContent = () => {
    switch(view) {
      case 'day': return renderDayView();
      case 'week': return renderWeekView();
      case 'month':
      default: return renderMonthView();
    }
  }

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
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
          <div className="flex-1">
            <h1 className="neo-brutal-text text-4xl text-black asymmetric-skew">CALENDAR</h1>
            <p className="text-gray-600 font-bold">Track your expenses and bills</p>
          </div>
          
          {/* View Switcher */}
          <div className="flex gap-2">
            {['day', 'week', 'month'].map(viewType => (
              <Button
                key={viewType}
                variant={view === viewType ? "default" : "outline"}
                onClick={() => setView(viewType)}
                className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
              >
                {viewType.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <Card className="neo-brutal-border neo-brutal-shadow bg-white">
          {/* Calendar Header */}
          <div className="p-6 border-b-4 border-black flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigatePeriod('prev')}
                className="neo-brutal-border neo-brutal-shadow-small"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <h2 className="neo-brutal-text text-3xl">
                {renderHeaderTitle()}
              </h2>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigatePeriod('next')}
                className="neo-brutal-border neo-brutal-shadow-small"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <Button
              onClick={() => setCurrentDate(new Date())}
              className="bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text"
            >
              TODAY
            </Button>
          </div>

          {/* Legend */}
          <div className="p-4 border-b-2 border-black bg-gray-50">
            <div className="flex gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 neo-brutal-border border-2 border-black"></div>
                <span className="neo-brutal-text text-sm">SUBSCRIPTIONS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 neo-brutal-border border-2 border-black"></div>
                <span className="neo-brutal-text text-sm">EXPENSES</span>
              </div>
            </div>
          </div>

          {/* Calendar Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="neo-brutal-text">LOADING CALENDAR...</p>
              </div>
            ) : (
              renderCalendarContent()
            )}
          </div>
        </Card>
      </div>

       {/* FAB */}
        <Button
          onClick={() => navigate(createPageUrl('Receipts'))}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 rounded-full w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow"
          aria-label="Add Receipt"
        >
          <Camera className="w-8 h-8" />
        </Button>
    </div>
  );
}
