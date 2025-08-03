
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/components/providers/LanguageProvider"; // Changed import path as per outline

const formatBalance = (amount) => {
  if (!amount && amount !== 0) return "0.00";
  
  // For large numbers, use K/M notation
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  
  return amount.toFixed(2);
};

const getAccountIcon = (bank) => {
  const icons = {
    'QNB': '🏛️',
    'CBQ': '🏦',
    'QIB': '🕌',
    'Doha Bank': '🏢',
    'ADCB': '🏛️',
    'FAB': '🏦',
    'Other': '💳'
  };
  return icons[bank] || '💳';
};

export default function AccountsOverview({ accounts, isLoading }) {
  const [showBalances, setShowBalances] = React.useState(true);
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <Card className="neo-brutal-border neo-brutal-shadow bg-white">
        <div className="p-6">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-16 w-full" />
        </div>
      </Card>
    );
  }

  const totalBalance = accounts.reduce((sum, account) => sum + (account.balance || 0), 0);

  return (
    <Card className="neo-brutal-border neo-brutal-shadow bg-white">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6 text-blue-500" />
            <h3 className="neo-brutal-text text-xl asymmetric-skew">{t({en: 'WALLETS & ACCOUNTS', ar: 'المحافظ والحسابات'})}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalances(!showBalances)}
              className="neo-brutal-border neo-brutal-shadow-small"
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Link to={createPageUrl("Accounts")}>
              <Button 
                size="sm" 
                className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow-small neo-brutal-text text-xs px-3 py-2"
              >
                <Plus className="w-3 h-3 mr-1" />
                {t({en: 'ADD ACCOUNT', ar: 'إضافة حساب'})}
              </Button>
            </Link>
          </div>
        </div>

        {accounts.length === 0 ? (
          <div className="text-center py-8">
            <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-bold text-lg">{t({en: 'NO ACCOUNTS YET', ar: 'لا توجد حسابات بعد'})}</p>
            <p className="text-sm text-gray-400 mt-1">{t({en: 'Add your first account to get started', ar: 'أضف حسابك الأول للبدء'})}</p>
            <Link to={createPageUrl("Accounts")}>
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text">
                <Plus className="w-4 h-4 mr-2" />
                {t({en: 'ADD FIRST ACCOUNT', ar: 'إضافة الحساب الأول'})}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              {accounts.slice(0, 6).map((account) => (
                <div
                  key={account.id}
                  className="bg-blue-500 text-white p-4 neo-brutal-border neo-brutal-shadow-small hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 min-h-[120px] flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getAccountIcon(account.bank)}</span>
                        <p className="neo-brutal-text text-sm truncate">{account.bank}</p>
                      </div>
                      <p className="neo-brutal-text text-base truncate">{account.nickname}</p>
                      <p className="text-xs opacity-90 truncate">{account.account_type}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-baseline justify-between">
                      <span className="neo-brutal-text text-xs">QAR</span>
                      <p className="neo-brutal-text text-lg font-black truncate ml-2">
                        {showBalances ? formatBalance(account.balance) : "****"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {accounts.length > 6 && (
              <div className="text-center mb-6">
                <Link to={createPageUrl("Accounts")}>
                  <Button variant="outline" className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text">
                    {t({en: `VIEW ALL ${accounts.length} ACCOUNTS`, ar: `عرض كل الحسابات (${accounts.length})`})}
                  </Button>
                </Link>
              </div>
            )}

            {/* Total Balance Bar */}
            <div className="bg-yellow-400 text-black p-4 neo-brutal-border neo-brutal-shadow-small">
              <div className="flex items-center justify-between">
                <h4 className="neo-brutal-text text-lg">{t({en: 'TOTAL CASH', ar: 'إجمالي النقد'})}</h4>
                <div className="text-right">
                  <p className="neo-brutal-text text-2xl font-black">
                    {t({en: 'QAR', ar: 'ر.ق'})} {showBalances ? formatBalance(totalBalance) : "****"}
                  </p>
                  {showBalances && totalBalance >= 1000 && (
                    <p className="text-xs font-bold opacity-75">
                      ({totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
