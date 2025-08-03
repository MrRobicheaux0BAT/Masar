import React, { useState, useEffect } from "react";
import { User, SideIncome, Account } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Trash2, Save, Calendar, Wallet, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format, addMonths, isSameDay, startOfDay } from "date-fns";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Income() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [salary, setSalary] = useState("");
  const [salaryDate, setSalaryDate] = useState("");
  const [salaryAccountId, setSalaryAccountId] = useState("");
  const [autoAddSalary, setAutoAddSalary] = useState(false);
  const [sideIncomes, setSideIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isManualAddOpen, setIsManualAddOpen] = useState(false);
  const [manualAmount, setManualAmount] = useState("");
  const [manualAccountId, setManualAccountId] = useState("");
  const { isArabic, t } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        setSalary(currentUser.salary?.toString() || "");
        setSalaryDate(currentUser.salary_date?.toString() || "");
        setSalaryAccountId(currentUser.salary_account_id || "");
        setAutoAddSalary(currentUser.auto_add_salary || false);

        const [incomeData, accountData] = await Promise.all([
          SideIncome.filter({ created_by: currentUser.email }),
          Account.filter({ created_by: currentUser.email })
        ]);
        
        setSideIncomes(incomeData.map(i => ({ ...i, amount: i.amount.toString() })));
        setAccounts(accountData);
        
        // Set default manual account
        if (accountData.length > 0 && !manualAccountId) {
          setManualAccountId(accountData[0].id);
        }

      } catch (error) {
        console.error("Error loading income data:", error);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Check for automatic salary addition on component load
  useEffect(() => {
    if (user && accounts.length > 0 && autoAddSalary && salaryDate && salaryAccountId) {
      checkAndAddSalary();
    }
  }, [user, accounts, autoAddSalary, salaryDate, salaryAccountId]);

  const checkAndAddSalary = async () => {
    if (!user || !autoAddSalary || !salaryDate || !salaryAccountId || !salary) return;

    const today = new Date();
    const salaryDay = parseInt(salaryDate);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Create salary date for current month
    const salaryDateThisMonth = new Date(currentYear, currentMonth, salaryDay);
    
    // Check if today is salary day and we haven't added salary this month
    const lastSalaryAdded = user.last_salary_added ? new Date(user.last_salary_added) : null;
    const shouldAddSalary = isSameDay(today, salaryDateThisMonth) && 
                           (!lastSalaryAdded || 
                            lastSalaryAdded.getMonth() !== currentMonth || 
                            lastSalaryAdded.getFullYear() !== currentYear);

    if (shouldAddSalary) {
      try {
        const selectedAccount = accounts.find(acc => acc.id === salaryAccountId);
        if (selectedAccount) {
          // Add salary to account
          await Account.update(salaryAccountId, {
            balance: (selectedAccount.balance || 0) + parseFloat(salary)
          });

          // Update user's last salary added date
          await User.updateMyUserData({
            last_salary_added: format(today, 'yyyy-MM-dd')
          });

          alert(t({ 
            en: `💰 Salary of QAR ${salary} has been automatically added to ${selectedAccount.nickname}!`,
            ar: `💰 تمت إضافة راتب ${salary} ريال قطري تلقائيًا إلى ${selectedAccount.nickname}!`
          }));
          
          // Reload data to reflect changes
          const updatedAccounts = await Account.filter({ created_by: user.email });
          setAccounts(updatedAccounts);
        }
      } catch (error) {
        console.error("Error adding automatic salary:", error);
        alert(t({ en: "Failed to add automatic salary.", ar: "فشل في إضافة الراتب تلقائيًا." }));
      }
    }
  };

  const handleSalarySave = async () => {
    try {
      await User.updateMyUserData({ 
        salary: parseFloat(salary) || 0,
        salary_date: salaryDate ? parseInt(salaryDate) : null,
        salary_account_id: salaryAccountId || null,
        auto_add_salary: autoAddSalary
      });
      alert(t({ en: "Salary settings updated!", ar: "تم تحديث إعدادات الراتب!" }));
      
      // Reload user data
      const updatedUser = await User.me();
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update salary:", error);
      alert(t({ en: "Error saving salary settings.", ar: "خطأ في حفظ إعدادات الراتب." }));
    }
  };

  const handleManualAdd = async () => {
    if (!manualAmount || !manualAccountId) {
      alert(t({ en: "Please enter amount and select account.", ar: "الرجاء إدخال المبلغ واختيار الحساب." }));
      return;
    }

    try {
      const selectedAccount = accounts.find(acc => acc.id === manualAccountId);
      if (selectedAccount) {
        await Account.update(manualAccountId, {
          balance: (selectedAccount.balance || 0) + parseFloat(manualAmount)
        });

        alert(t({ 
          en: `✅ QAR ${manualAmount} added to ${selectedAccount.nickname}!`,
          ar: `✅ تم إضافة ${manualAmount} ريال قطري إلى ${selectedAccount.nickname}!`
        }));
        
        // Reset and close modal
        setManualAmount("");
        setIsManualAddOpen(false);
        
        // Reload accounts
        const updatedAccounts = await Account.filter({ created_by: user.email });
        setAccounts(updatedAccounts);
      }
    } catch (error) {
      console.error("Error adding manual amount:", error);
      alert(t({ en: "Failed to add amount.", ar: "فشل في إضافة المبلغ." }));
    }
  };

  const addSideIncome = () => {
    setSideIncomes([...sideIncomes, { source: "", amount: "" }]);
  };

  const updateSideIncome = (index, field, value) => {
    const newIncomes = [...sideIncomes];
    newIncomes[index][field] = value;
    setSideIncomes(newIncomes);
  };
  
  const saveSideIncome = async (index) => {
    const income = sideIncomes[index];
    if (!income.source || !income.amount) {
        alert(t({ en: "Please fill in both source and amount.", ar: "الرجاء ملء كل من المصدر والمبلغ." }));
        return;
    }
    
    const dataToSave = {
        source: income.source,
        amount: parseFloat(income.amount) || 0,
        created_by: user.email
    };

    try {
        if (income.id) {
            await SideIncome.update(income.id, dataToSave);
        } else {
            await SideIncome.create(dataToSave);
            const incomeData = await SideIncome.filter({ created_by: user.email });
            setSideIncomes(incomeData.map(i => ({ ...i, amount: i.amount.toString() })));
        }
        alert(t({ en: "Side income saved!", ar: "تم حفظ الدخل الإضافي!" }));
    } catch (error) {
        console.error("Error saving side income:", error);
        alert(t({ en: "Failed to save side income.", ar: "فشل في حفظ الدخل الإضافي." }));
    }
  };

  const removeSideIncome = async (index) => {
    const income = sideIncomes[index];
    if (income.id) {
        if (confirm(t({ en: "Are you sure you want to delete this income source?", ar: "هل أنت متأكد أنك تريد حذف مصدر الدخل هذا؟" }))) {
            await SideIncome.delete(income.id);
            try {
              const incomeData = await SideIncome.filter({ created_by: user.email });
              setSideIncomes(incomeData.map(i => ({ ...i, amount: i.amount.toString() })));
            } catch (error) {
              console.error("Error re-loading income data after deletion:", error);
              setSideIncomes(sideIncomes.filter((_, i) => i !== index));
            }
        }
    } else {
        setSideIncomes(sideIncomes.filter((_, i) => i !== index));
    }
  };
  
  if (isLoading) {
      return <div className="p-8">{t({ en: "Loading...", ar: "جاري التحميل..." })}</div>;
  }

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
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
              <h1 className="neo-brutal-text text-4xl text-black asymmetric-skew">
                {t({ en: 'INCOME', ar: 'الدخل' })}
              </h1>
              <p className="text-gray-600 font-bold">
                {t({ en: 'Manage your salary and side incomes', ar: 'إدارة راتبك ودخلك الإضافي' })}
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsManualAddOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t({ en: 'ADD MONEY', ar: 'إضافة أموال' })}
          </Button>
        </div>

        {/* Salary Card */}
        <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6 mb-8">
          <h2 className="neo-brutal-text text-2xl text-black mb-4">
            {t({ en: 'MONTHLY SALARY', ar: 'الراتب الشهري' })}
          </h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="neo-brutal-text">
                  {t({ en: 'SALARY AMOUNT (QAR)', ar: 'مبلغ الراتب (ريال قطري)' })}
                </Label>
                <Input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder={t({ en: "e.g. 15000", ar: "مثال: 15000" })}
                  className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="neo-brutal-text">
                  {t({ en: 'SALARY DATE (DAY OF MONTH)', ar: 'تاريخ الراتب (يوم من الشهر)' })}
                </Label>
                <Select value={salaryDate} onValueChange={setSalaryDate}>
                  <SelectTrigger className="neo-brutal-border neo-brutal-shadow-small text-lg p-4">
                    <SelectValue placeholder={t({ en: "Select day", ar: "اختر اليوم" })} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        {isArabic 
                          ? `${day} من كل شهر` 
                          : `${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} of every month`
                        }
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Auto-deposit Settings */}
            <div className="bg-blue-50 neo-brutal-border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="neo-brutal-text">
                    {t({ en: 'AUTO-DEPOSIT SALARY', ar: 'إيداع الراتب تلقائياً' })}
                  </Label>
                  <p className="text-sm text-gray-600 font-medium">
                    {t({ en: 'Automatically add salary to account on salary date', ar: 'إضافة الراتب تلقائياً للحساب في تاريخ الراتب' })}
                  </p>
                </div>
                <Switch
                  checked={autoAddSalary}
                  onCheckedChange={setAutoAddSalary}
                />
              </div>
              
              {autoAddSalary && (
                <div className="space-y-2">
                  <Label className="neo-brutal-text">
                    {t({ en: 'DEPOSIT TO ACCOUNT', ar: 'الإيداع في الحساب' })}
                  </Label>
                  <Select value={salaryAccountId} onValueChange={setSalaryAccountId}>
                    <SelectTrigger className="neo-brutal-border">
                      <SelectValue placeholder={t({ en: "Choose account for salary deposit", ar: "اختر حساب لإيداع الراتب" })} />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map(account => (
                        <SelectItem key={account.id} value={account.id}>
                          <div className="flex items-center gap-2">
                            <Wallet className="w-4 h-4" />
                            <span>{account.nickname} - QAR {account.balance?.toFixed(2)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Button
              onClick={handleSalarySave}
              className="bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text w-full"
            >
              <Save className="w-5 h-5 mr-2" />
              {t({ en: 'SAVE SALARY SETTINGS', ar: 'حفظ إعدادات الراتب' })}
            </Button>
          </div>
        </Card>

        {/* Side Incomes Card */}
        <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
          <h2 className="neo-brutal-text text-2xl text-black mb-4">
            {t({ en: 'SIDE INCOME SOURCES', ar: 'مصادر الدخل الإضافي' })}
          </h2>
          <div className="space-y-4">
            {sideIncomes.map((income, index) => (
              <div key={income.id || `new-${index}`} className="flex items-end gap-2 p-3 neo-brutal-border bg-gray-50">
                <div className="flex-grow space-y-2">
                  <Label className="neo-brutal-text text-sm">
                    {t({ en: 'SOURCE', ar: 'المصدر' })}
                  </Label>
                  <Input
                    value={income.source}
                    onChange={(e) => updateSideIncome(index, 'source', e.target.value)}
                    placeholder={t({ en: "e.g. Freelance Project", ar: "مثال: مشروع مستقل" })}
                    className="neo-brutal-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="neo-brutal-text text-sm">
                    {t({ en: 'AMOUNT (QAR)', ar: 'المبلغ (ريال قطري)' })}
                  </Label>
                  <Input
                    type="number"
                    value={income.amount}
                    onChange={(e) => updateSideIncome(index, 'amount', e.target.value)}
                    placeholder={t({ en: "e.g. 2000", ar: "مثال: 2000" })}
                    className="neo-brutal-border w-40"
                  />
                </div>
                <Button onClick={() => saveSideIncome(index)} size="icon" className="bg-green-500 hover:bg-green-600 neo-brutal-border h-10 w-10"><Save className="w-4 h-4"/></Button>
                <Button onClick={() => removeSideIncome(index)} size="icon" variant="destructive" className="bg-red-500 hover:bg-red-600 neo-brutal-border h-10 w-10"><Trash2 className="w-4 h-4"/></Button>
              </div>
            ))}
          </div>
          <Button
            onClick={addSideIncome}
            variant="outline"
            className="w-full mt-4 neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t({ en: 'ADD INCOME SOURCE', ar: 'إضافة مصدر دخل' })}
          </Button>
        </Card>

        {/* Manual Add Money Modal */}
        <Dialog open={isManualAddOpen} onOpenChange={setIsManualAddOpen}>
          <DialogContent className="neo-brutal-border neo-brutal-shadow">
            <DialogHeader>
              <DialogTitle className="neo-brutal-text text-2xl">
                {t({ en: 'ADD MONEY TO ACCOUNT', ar: 'إضافة أموال للحساب' })}
              </DialogTitle>
              <p className="text-sm text-gray-600 font-medium">
                {t({ en: 'Manually add money to any of your accounts', ar: 'أضف الأموال يدوياً إلى أي من حساباتك' })}
              </p>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="neo-brutal-text">
                  {t({ en: 'AMOUNT (QAR)', ar: 'المبلغ (ريال قطري)' })}
                </Label>
                <Input
                  type="number"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                  placeholder={t({ en: "e.g. 5000", ar: "مثال: 5000" })}
                  className="neo-brutal-border neo-brutal-shadow-small text-lg p-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="neo-brutal-text">
                  {t({ en: 'ADD TO ACCOUNT', ar: 'الإضافة إلى الحساب' })}
                </Label>
                <Select value={manualAccountId} onValueChange={setManualAccountId}>
                  <SelectTrigger className="neo-brutal-border neo-brutal-shadow-small">
                    <SelectValue placeholder={t({ en: "Select account", ar: "اختر حساب" })} />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        <div className="flex justify-between w-full">
                          <span>{account.nickname}</span>
                          <span className="text-gray-500 ml-4">QAR {account.balance?.toFixed(2) || '0.00'}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text">
                  {t({ en: 'CANCEL', ar: 'إلغاء' })}
                </Button>
              </DialogClose>
              <Button 
                onClick={handleManualAdd}
                className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {t({ en: 'ADD MONEY', ar: 'إضافة أموال' })}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}