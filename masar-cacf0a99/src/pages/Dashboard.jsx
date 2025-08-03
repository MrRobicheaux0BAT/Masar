
import React, { useState, useEffect } from "react";
import { User, Expense, Subscription, Account } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, Camera } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/components/providers/LanguageProvider";

import AccountsOverview from "../components/dashboard/AccountsOverview";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import CalendarMini from "../components/dashboard/CalendarMini";
import UpcomingBills from "../components/dashboard/UpcomingBills";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isArabic, t } = useLanguage();

  useEffect(() => {
    checkUserAndLoadData();
  }, []);

  // Listen for custom events when receipts/expenses are added
  useEffect(() => {
    const handleDataUpdate = () => {
      if (user) {
        loadData(user);
      }
    };

    // Listen for custom events from other pages
    window.addEventListener('receipt-uploaded', handleDataUpdate);
    window.addEventListener('expense-added', handleDataUpdate);
    
    return () => {
      window.removeEventListener('receipt-uploaded', handleDataUpdate);
      window.removeEventListener('expense-added', handleDataUpdate);
    };
  }, [user]);

  const checkUserAndLoadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      if (!currentUser.onboarding_completed) {
        navigate(createPageUrl("Onboarding"));
        return;
      }
      
      await loadData(currentUser);
    } catch (error) {
      console.error("Error checking user:", error);
    }
    setIsLoading(false);
  };

  const loadData = async (currentUser) => {
    try {
      const [expenseData, subscriptionData, accountData] = await Promise.all([
        Expense.filter({ created_by: currentUser.email }, "-date", 100),
        Subscription.filter({ created_by: currentUser.email }, "-next_billing_date", 20),
        Account.filter({ created_by: currentUser.email })
      ]);
      
      setExpenses(expenseData);
      setSubscriptions(subscriptionData);
      setAccounts(accountData);
      
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="neo-brutal-text text-xl">
            {t({ en: 'LOADING DASHBOARD...', ar: 'جاري تحميل لوحة التحكم...' })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="neo-brutal-text text-4xl lg:text-5xl text-black mb-2 asymmetric-skew">
              {t({ en: 'DASHBOARD', ar: 'لوحة التحكم' })}
            </h1>
            <p className="text-gray-600 font-bold text-lg">
              {t({ 
                en: `Welcome back, ${user.full_name || 'User'}!`, 
                ar: `مرحباً بعودتك، ${user.full_name || 'المستخدم'}!` 
              })}
            </p>
          </div>
          
          <Link to={createPageUrl("AddExpense")}>
            <Button className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text text-lg px-8 py-4">
              <Plus className="w-6 h-6 mr-2" />
              {t({ en: 'ADD EXPENSE', ar: 'إضافة مصروف' })}
            </Button>
          </Link>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
            <AccountsOverview accounts={accounts} isLoading={isLoading} />
            <CategoryPieChart expenses={expenses} isLoading={isLoading} />
            <CalendarMini expenses={expenses} subscriptions={subscriptions} isLoading={isLoading} />
            <UpcomingBills subscriptions={subscriptions} isLoading={isLoading} />
        </div>
      </div>
      
       {/* FAB */}
        <Button
          onClick={() => navigate(createPageUrl('Receipts'))}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 rounded-full w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow"
          aria-label={t({ en: 'Add Receipt', ar: 'إضافة إيصال' })}
        >
          <Camera className="w-8 h-8" />
        </Button>
    </div>
  );
}
