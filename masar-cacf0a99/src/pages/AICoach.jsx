import React, { useState, useRef, useEffect } from "react";
import { InvokeLLM } from "@/api/integrations";
import { User, Expense, Subscription, Account } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Bot, Send, CornerDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import ChatMessage from "../components/ai/ChatMessage";
import PresetPrompts from "../components/ai/PresetPrompts";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AICoach() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const messagesEndRef = useRef(null);
  const { isArabic, t } = useLanguage();

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    // Set initial welcome message based on language
    if (userData && messages.length === 0) {
      const welcomeMessage = {
        role: "assistant",
        content: isArabic 
          ? "مرحباً! أنا مسار، مدربك المالي الذكي. يمكنني رؤية بياناتك المالية ومساعدتك في اتخاذ قرارات أفضل. كيف يمكنني مساعدتك اليوم؟"
          : "Hello! I'm Masar, your AI Money Coach. I can see your financial data and help you make better decisions. How can I help you today?"
      };
      setMessages([welcomeMessage]);
    }
  }, [userData, isArabic]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadUserData = async () => {
    try {
      const user = await User.me();
      const [expenseData, subscriptionData, accountData] = await Promise.all([
        Expense.filter({ created_by: user.email }, "-date", 100),
        Subscription.filter({ created_by: user.email }),
        Account.filter({ created_by: user.email })
      ]);
      
      setUserData(user);
      setExpenses(expenseData);
      setSubscriptions(subscriptionData);
      setAccounts(accountData);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const generateFinancialContext = () => {
    if (!userData) return "";

    // Calculate financial metrics
    const currentMonth = new Date();
    const lastMonth = subMonths(currentMonth, 1);
    
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth(currentMonth) && expenseDate <= endOfMonth(currentMonth);
    });
    
    const lastMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth(lastMonth) && expenseDate <= endOfMonth(lastMonth);
    });

    const monthlySpending = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const lastMonthSpending = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
    const monthlySubscriptionCost = activeSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);

    // Category breakdown
    const categorySpending = currentMonthExpenses.reduce((acc, expense) => {
      const category = expense.category || 'other';
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {});

    const topCategories = Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category, amount]) => `${category.replace(/_/g, ' ')}: QAR ${amount.toFixed(2)}`)
      .join(', ');

    const contextLanguage = isArabic ? 'Arabic' : 'English';
    const responseInstruction = isArabic 
      ? 'Please respond in Arabic.'
      : 'Please respond in English.';

    return `
USER FINANCIAL PROFILE:
- Name: ${userData.full_name || 'Not provided'}
- Monthly Salary: QAR ${userData.salary || 'Not provided'}
- Side Income: QAR ${userData.side_income || 0}
- Current Total Balance: QAR ${totalBalance.toFixed(2)}
- Active Accounts: ${accounts.length} (${accounts.map(a => `${a.nickname}: QAR ${a.balance?.toFixed(2) || '0.00'}`).join(', ')})

CURRENT MONTH SPENDING (${format(currentMonth, 'MMMM yyyy')}):
- Total Spent: QAR ${monthlySpending.toFixed(2)}
- Last Month: QAR ${lastMonthSpending.toFixed(2)}
- Change: ${monthlySpending > lastMonthSpending ? '+' : ''}QAR ${(monthlySpending - lastMonthSpending).toFixed(2)}
- Top Categories: ${topCategories || 'No expenses yet'}

SUBSCRIPTIONS:
- Active Subscriptions: ${activeSubscriptions.length}
- Monthly Subscription Cost: QAR ${monthlySubscriptionCost.toFixed(2)}
- Services: ${activeSubscriptions.map(s => `${s.service_name} (QAR ${s.amount})`).join(', ') || 'None'}

RECENT TRANSACTIONS (Last 10):
${expenses.slice(0, 10).map(exp => 
  `- ${exp.title}: QAR ${exp.amount} (${exp.category?.replace(/_/g, ' ')}) on ${format(new Date(exp.date), 'dd MMM')}`
).join('\n') || 'No recent transactions.'}

You are Masar, an expert AI financial coach for users living in Qatar. Use the above real-time data to provide specific, actionable advice. Be encouraging and clear. Format your responses with markdown.
Today's date is ${format(new Date(), 'dd MMMM yyyy')}.
${responseInstruction}
`;
  };

  const handleSendMessage = async (message) => {
    const userMessage = { role: "user", content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const financialContext = generateFinancialContext();
      const fullPrompt = `${financialContext}\n\nUSER QUESTION: ${message}`;
      
      const response = await InvokeLLM({ prompt: fullPrompt });
      
      const assistantMessage = { role: "assistant", content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling LLM:", error);
      const errorMessage = { 
        role: "assistant", 
        content: isArabic 
          ? "عذراً، أواجه مشكلة في الاتصال. يرجى المحاولة مرة أخرى لاحقاً."
          : "Sorry, I'm having trouble connecting. Please try again later." 
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 lg:p-6 bg-white neo-brutal-border border-b-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="neo-brutal-border neo-brutal-shadow-small"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="neo-brutal-text text-3xl lg:text-4xl text-black asymmetric-skew">
              {t({ en: 'AI COACH', ar: 'المدرب الذكي' })}
            </h1>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                <p className="text-sm text-gray-600 font-bold">
                  {isLoading ? t({ en: 'Thinking...', ar: 'يفكر...' }) : t({ en: 'Online', ar: 'متصل' })}
                </p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && <ChatMessage message={{ role: "assistant", isLoading: true }} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t-4 border-black">
        <div className="max-w-3xl mx-auto">
            {!isLoading && messages.length <= 1 && (
                <PresetPrompts onPromptClick={handleSendMessage} />
            )}
            <div className="relative">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if(input.trim() && !isLoading) handleSendMessage(input);
                        }
                    }}
                    placeholder={t({ 
                      en: "Ask about your spending, budget, or get savings advice...", 
                      ar: "اسأل عن إنفاقك أو ميزانيتك أو احصل على نصائح للادخار..." 
                    })}
                    className="w-full p-4 pr-20 neo-brutal-border neo-brutal-shadow-small text-lg resize-none"
                    rows={2}
                    disabled={isLoading}
                />
                <Button
                    onClick={() => {if(input.trim() && !isLoading) handleSendMessage(input)}}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-3 bottom-3 bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow"
                    size="icon"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}