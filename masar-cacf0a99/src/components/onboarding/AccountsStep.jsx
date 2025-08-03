
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, CreditCard } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const BANKS = ["QNB", "CBQ", "QIB", "Doha Bank", "ADCB", "FAB", "Other"];
const ACCOUNT_TYPES = ["Current", "Savings", "Credit Card", "Mobile Wallet", "Cash"];

export default function AccountsStep({ accounts, setAccounts }) {
  const addAccount = () => {
    setAccounts(prev => [...prev, {
      bank: "QNB",
      account_type: "Current", 
      nickname: "",
      balance: "0"
    }]);
  };

  const updateAccount = (index, field, value) => {
    setAccounts(prev => prev.map((account, i) => 
      i === index ? { ...account, [field]: value } : account
    ));
  };

  const removeAccount = (index) => {
    if (accounts.length > 1) {
      setAccounts(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="neo-brutal-text text-3xl text-black mb-2 asymmetric-skew">
          ADD YOUR ACCOUNTS
        </h2>
        <p className="text-gray-600 font-bold">
          Track balances across all your Qatar bank accounts
        </p>
      </div>

      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div key={index} className="bg-gray-50 neo-brutal-border neo-brutal-shadow-small p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="neo-brutal-text text-lg">ACCOUNT {index + 1}</span>
              </div>
              {accounts.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAccount(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="neo-brutal-text">BANK</Label>
                <Select 
                  value={account.bank} 
                  onValueChange={(value) => updateAccount(index, "bank", value)}
                >
                  <SelectTrigger className="neo-brutal-border neo-brutal-shadow-small">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BANKS.map(bank => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="neo-brutal-text">TYPE</Label>
                <Select 
                  value={account.account_type} 
                  onValueChange={(value) => updateAccount(index, "account_type", value)}
                >
                  <SelectTrigger className="neo-brutal-border neo-brutal-shadow-small">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOUNT_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="neo-brutal-text">NICKNAME</Label>
                <Input
                  value={account.nickname}
                  onChange={(e) => updateAccount(index, "nickname", e.target.value)}
                  placeholder="e.g. Main Account"
                  className="neo-brutal-border neo-brutal-shadow-small"
                />
              </div>

              <div className="space-y-2">
                <Label className="neo-brutal-text">CURRENT BALANCE (QAR)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={account.balance}
                  onChange={(e) => updateAccount(index, "balance", e.target.value)}
                  placeholder="0.00"
                  className="neo-brutal-border neo-brutal-shadow-small"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={addAccount}
        variant="outline"
        className="w-full neo-brutal-border neo-brutal-shadow-small neo-brutal-text transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        <Plus className="w-4 h-4 mr-2" />
        ADD ANOTHER ACCOUNT
      </Button>

      <div className="bg-blue-50 neo-brutal-border neo-brutal-shadow-small p-4 asymmetric-skew">
        <div className="reverse-skew">
          <p className="text-sm text-gray-700 font-bold">
            🔒 <strong>Your data is secure:</strong> Account balances are stored locally and encrypted. We never access your actual bank accounts.
          </p>
        </div>
      </div>
    </div>
  );
}
