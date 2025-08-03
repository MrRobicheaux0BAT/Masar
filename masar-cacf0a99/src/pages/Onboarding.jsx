import React, { useState, useEffect } from "react";
import { User, Account, SideIncome } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

import WelcomeStep from "../components/onboarding/WelcomeStep";
import ProfileStep from "../components/onboarding/ProfileStep";
import AccountsStep from "../components/onboarding/AccountsStep";
import CompleteStep from "../components/onboarding/CompleteStep";

const STEPS = [
  { id: "welcome", title: "Welcome", component: WelcomeStep },
  { id: "profile", title: "Profile", component: ProfileStep },
  { id: "accounts", title: "Accounts", component: AccountsStep },
  { id: "complete", title: "Complete", component: CompleteStep }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    full_name: "",
    salary: "",
    side_income: ""
  });
  const [accounts, setAccounts] = useState([
    { bank: "QNB", account_type: "Current", nickname: "Main Account", balance: "0" }
  ]);
  const [sideIncomes, setSideIncomes] = useState([]);

  // Check if user is logged in and get their data
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        
        // Pre-fill user data if available
        if (currentUser.full_name) {
          setUserData(prev => ({
            ...prev,
            full_name: currentUser.full_name,
            salary: currentUser.salary || "",
            side_income: currentUser.side_income || ""
          }));
        }
        
        // Check if onboarding already completed
        if (currentUser.onboarding_completed) {
          navigate(createPageUrl("Dashboard"));
        }
      } catch (error) {
        console.error("Error checking user:", error);
        // If user not logged in, redirect to login
        await User.login();
      }
    };
    
    checkUser();
  }, [navigate]);

  const updateUserData = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    setIsLoading(true);
    try {
      // Update user profile
      await User.updateMyUserData({
        salary: parseFloat(userData.salary) || 0,
        side_income: parseFloat(userData.side_income) || 0,
        onboarding_completed: true
      });

      // Create accounts
      for (const account of accounts) {
        if (account.nickname && account.balance) {
          await Account.create({
            bank: account.bank,
            account_type: account.account_type,
            nickname: account.nickname,
            balance: parseFloat(account.balance) || 0
          });
        }
      }

      // Create side income sources
      for (const income of sideIncomes) {
        if (income.source && income.amount) {
          await SideIncome.create({
            source: income.source,
            amount: parseFloat(income.amount) || 0
          });
        }
      }

      // Navigate to dashboard
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error completing onboarding:", error);
      alert("Failed to complete setup. Please try again.");
    }
    setIsLoading(false);
  };

  // Show loading while checking user
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="neo-brutal-text text-xl">LOADING MASAR...</p>
        </div>
      </div>
    );
  }

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 neo-brutal-border neo-brutal-shadow mx-auto mb-4 flex items-center justify-center asymmetric-skew">
            <span className="neo-brutal-text text-black text-2xl reverse-skew">M</span>
          </div>
          <h1 className="neo-brutal-text text-3xl text-black mb-2">MASAR SETUP</h1>
          <p className="text-gray-600 font-bold">Let's get you started in Qatar</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-black ${
                  index <= currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-black'
                } neo-brutal-shadow-small transition-all duration-300`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="neo-brutal-text text-sm">{index + 1}</span>
                )}
              </div>
            ))}
          </div>
          <div className="bg-gray-200 h-2 neo-brutal-border">
            <div 
              className="bg-green-500 h-2 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="neo-brutal-border neo-brutal-shadow bg-white p-8 mb-6">
          <CurrentStepComponent
            userData={userData}
            updateUserData={updateUserData}
            accounts={accounts}
            setAccounts={setAccounts}
            sideIncomes={sideIncomes}
            setSideIncomes={setSideIncomes}
            isLoading={isLoading}
            user={user}
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK
          </Button>

          {currentStep === STEPS.length - 1 ? (
            <Button
              onClick={completeOnboarding}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text transition-all duration-200 hover:translate-x-2 hover:translate-y-2 hover:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  SETTING UP...
                </div>
              ) : (
                <>
                  FINISH SETUP
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text transition-all duration-200 hover:translate-x-2 hover:translate-y-2 hover:shadow-none"
            >
              CONTINUE
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}