
import React, { useState, useEffect } from "react";
import { Subscription, Account, Expense } from "@/api/entities";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Edit, Trash2, Wallet, Bell, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format, addDays, isBefore, isEqual } from "date-fns";
import { useLanguage } from "@/components/providers/LanguageProvider";

const CATEGORIES = ["streaming", "software", "fitness", "news", "utilities", "telecom", "cloud_storage", "gaming", "other"];
const BILLING_CYCLES = ["weekly", "monthly", "quarterly", "yearly"];

export default function Subscriptions() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      const [subscriptionData, accountData] = await Promise.all([
        Subscription.filter({ created_by: currentUser.email }, "-next_billing_date"),
        Account.filter({ created_by: currentUser.email })
      ]);
      setSubscriptions(subscriptionData);
      setAccounts(accountData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleOpenModal = (sub = null) => {
    if (sub) {
      setEditingSubscription({
        ...sub, 
        next_billing_date: format(new Date(sub.next_billing_date), 'yyyy-MM-dd')
      });
    } else {
      setEditingSubscription({
        service_name: "",
        amount: "",
        billing_cycle: "monthly",
        next_billing_date: format(new Date(), 'yyyy-MM-dd'),
        category: "other",
        status: "active",
        auto_deduct: false,
        account_id: accounts.length > 0 ? accounts[0].id : "",
        reminder_enabled: true,
        reminder_days: 3
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingSubscription.service_name || !editingSubscription.amount) {
      alert("Please fill in all required fields."); // Consider translating this alert too if needed
      return;
    }
    
    if (editingSubscription.auto_deduct && !editingSubscription.account_id) {
      alert("Please select an account for auto-deduction."); // Consider translating this alert too if needed
      return;
    }

    const dataToSave = {
      ...editingSubscription,
      amount: parseFloat(editingSubscription.amount)
    };

    try {
      if (editingSubscription.id) {
        await Subscription.update(editingSubscription.id, dataToSave);
      } else {
        const currentUser = await User.me();
        await Subscription.create({ ...dataToSave, created_by: currentUser.email });
      }
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      console.error("Failed to save subscription:", error);
      alert("Error saving subscription."); // Consider translating this alert too if needed
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this subscription?")) { // Consider translating this confirmation too if needed
        try {
            await Subscription.delete(id);
            setIsModalOpen(false);
            loadData();
        } catch (error) {
            console.error("Failed to delete subscription:", error);
            alert("Error deleting subscription."); // Consider translating this alert too if needed
        }
    }
  };

  // Process auto-deductions and reminders
  const processSubscriptionTasks = async () => {
    const today = new Date();
    
    for (const subscription of subscriptions) {
      const dueDate = new Date(subscription.next_billing_date);
      const reminderDate = addDays(dueDate, -subscription.reminder_days || -3);
      
      // Send reminder if enabled and due
      if (subscription.reminder_enabled && 
          (isEqual(today, reminderDate) || isBefore(reminderDate, today)) && 
          subscription.last_reminder_sent !== format(today, 'yyyy-MM-dd')) {
        
        // Update last reminder sent date
        await Subscription.update(subscription.id, {
          ...subscription,
          last_reminder_sent: format(today, 'yyyy-MM-dd')
        });
        
        // Show reminder (in a real app, this would be a notification)
        alert(`⏰ ${t({ en: 'Reminder', ar: 'تذكير' })}: ${subscription.service_name} ${t({ en: 'subscription of QAR', ar: 'اشتراك بقيمة' })} ${subscription.amount} ${t({ en: 'is due on', ar: 'مستحق في' })} ${format(dueDate, 'MMM dd, yyyy')}`);
      }
      
      // Process auto-deduction if due and enabled
      if (subscription.auto_deduct && 
          subscription.account_id && 
          (isEqual(today, dueDate) || isBefore(dueDate, today))) {
        
        const account = accounts.find(acc => acc.id === subscription.account_id);
        if (account && account.balance >= subscription.amount) {
          // Deduct from account
          await Account.update(account.id, {
            balance: account.balance - subscription.amount
          });
          
          // Create expense record
          await Expense.create({
            title: `${subscription.service_name} ${t({ en: 'Subscription', ar: 'اشتراك' })}`,
            amount: subscription.amount,
            category: "subscriptions",
            date: format(today, 'yyyy-MM-dd'),
            merchant: subscription.service_name,
            payment_method: "card",
            notes: `${t({ en: 'Auto-deducted subscription payment', ar: 'دفع اشتراك مخصوم تلقائيًا' })}`,
            account_id: subscription.account_id
          });
          
          // Update next billing date
          const nextDate = addDays(dueDate, subscription.billing_cycle === 'monthly' ? 30 : 
                                           subscription.billing_cycle === 'yearly' ? 365 : 
                                           subscription.billing_cycle === 'weekly' ? 7 : 90);
          
          await Subscription.update(subscription.id, {
            ...subscription,
            next_billing_date: format(nextDate, 'yyyy-MM-dd')
          });
          
          alert(`✅ ${t({ en: 'Auto-deducted QAR', ar: 'تم خصم تلقائيًا' })} ${subscription.amount} ${t({ en: 'for', ar: 'لـ' })} ${subscription.service_name} ${t({ en: 'from', ar: 'من' })} ${account.nickname}`);
        } else {
          alert(`❌ ${t({ en: 'Insufficient funds in', ar: 'أموال غير كافية في' })} ${account?.nickname || t({ en: 'selected account', ar: 'الحساب المحدد' })} ${t({ en: 'for', ar: 'لـ' })} ${subscription.service_name} ${t({ en: 'auto-deduction', ar: 'الخصم التلقائي' })}`);
        }
      }
    }
    
    loadData(); // Refresh data after processing
  };

  // Check for tasks on load (in real app, this would be a background job)
  useEffect(() => {
    if (subscriptions.length > 0 && accounts.length > 0) {
      processSubscriptionTasks();
    }
  }, [subscriptions.length, accounts.length]);

  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const upcomingSubs = subscriptions.filter(s => {
      const nextDate = new Date(s.next_billing_date);
      const today = new Date();
      const thirtyDaysFromNow = addDays(today, 30);
      return s.status === 'active' && nextDate >= today && nextDate <= thirtyDaysFromNow;
  });
  const historySubs = subscriptions.filter(s => s.status === 'cancelled' || new Date(s.next_billing_date) < new Date());

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(createPageUrl("Dashboard"))}
              className="neo-brutal-border neo-brutal-shadow-small hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="neo-brutal-text text-4xl text-black asymmetric-skew">
                {t({ en: 'SUBSCRIPTIONS', ar: 'الاشتراكات' })}
              </h1>
              <p className="text-gray-600 font-bold">
                {t({ en: 'Track your recurring payments', ar: 'تتبع مدفوعاتك المتكررة' })}
              </p>
            </div>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-purple-500 hover:bg-purple-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text">
            <Plus className="w-4 h-4 mr-2" />
            {t({ en: 'ADD SUBSCRIPTION', ar: 'إضافة اشتراك' })}
          </Button>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3 neo-brutal-border neo-brutal-shadow-small p-1">
            <TabsTrigger value="active" className="neo-brutal-text">{t({ en: 'ACTIVE', ar: 'نشط' })}</TabsTrigger>
            <TabsTrigger value="upcoming" className="neo-brutal-text">{t({ en: 'UPCOMING (30D)', ar: 'قريبًا (30 يومًا)' })}</TabsTrigger>
            <TabsTrigger value="history" className="neo-brutal-text">{t({ en: 'HISTORY', ar: 'السجل' })}</TabsTrigger>
          </TabsList>
          
          <Card className="mt-4 neo-brutal-border neo-brutal-shadow bg-white p-6">
            <TabsContent value="active"><SubscriptionTable subscriptions={activeSubs} accounts={accounts} onEdit={handleOpenModal} t={t} /></TabsContent>
            <TabsContent value="upcoming"><SubscriptionTable subscriptions={upcomingSubs} accounts={accounts} onEdit={handleOpenModal} t={t} /></TabsContent>
            <TabsContent value="history"><SubscriptionTable subscriptions={historySubs} accounts={accounts} onEdit={handleOpenModal} t={t} /></TabsContent>
          </Card>
        </Tabs>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="neo-brutal-border neo-brutal-shadow max-w-2xl">
            <DialogHeader>
              <DialogTitle className="neo-brutal-text text-2xl">
                {editingSubscription?.id ? t({ en: 'EDIT', ar: 'تعديل' }) : t({ en: 'ADD', ar: 'إضافة' })} {t({ en: 'SUBSCRIPTION', ar: 'اشتراك' })}
              </DialogTitle>
            </DialogHeader>
            {editingSubscription && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                  <Label className="neo-brutal-text">{t({ en: 'Service Name', ar: 'اسم الخدمة' })}</Label>
                  <Input value={editingSubscription.service_name} onChange={(e) => setEditingSubscription({...editingSubscription, service_name: e.target.value})} className="neo-brutal-border"/>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label className="neo-brutal-text">{t({ en: 'Amount (QAR)', ar: 'المبلغ (ريال قطري)' })}</Label>
                      <Input type="number" value={editingSubscription.amount} onChange={(e) => setEditingSubscription({...editingSubscription, amount: e.target.value})} className="neo-brutal-border"/>
                  </div>
                  <div className="space-y-2">
                      <Label className="neo-brutal-text">{t({ en: 'Billing Cycle', ar: 'دورة الفوترة' })}</Label>
                      <Select value={editingSubscription.billing_cycle} onValueChange={(v) => setEditingSubscription({...editingSubscription, billing_cycle: v})}>
                          <SelectTrigger className="neo-brutal-border"><SelectValue/></SelectTrigger>
                          <SelectContent>{BILLING_CYCLES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                  </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label className="neo-brutal-text">{t({ en: 'Next Billing Date', ar: 'تاريخ الفوترة التالي' })}</Label>
                      <Input type="date" value={editingSubscription.next_billing_date} onChange={(e) => setEditingSubscription({...editingSubscription, next_billing_date: e.target.value})} className="neo-brutal-border"/>
                  </div>
                   <div className="space-y-2">
                      <Label className="neo-brutal-text">{t({ en: 'Category', ar: 'الفئة' })}</Label>
                      <Select value={editingSubscription.category} onValueChange={(v) => setEditingSubscription({...editingSubscription, category: v})}>
                          <SelectTrigger className="neo-brutal-border"><SelectValue/></SelectTrigger>
                          <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
                      </Select>
                  </div>
              </div>

              {/* Auto-deduct Settings */}
              <div className="bg-blue-50 neo-brutal-border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="neo-brutal-text">{t({ en: 'AUTO-DEDUCT', ar: 'خصم تلقائي' })}</Label>
                    <p className="text-sm text-gray-600 font-medium">{t({ en: 'Automatically deduct from account on due date', ar: 'خصم تلقائي من الحساب في تاريخ الاستحقاق' })}</p>
                  </div>
                  <Switch
                    checked={editingSubscription.auto_deduct}
                    onCheckedChange={(checked) => setEditingSubscription({...editingSubscription, auto_deduct: checked})}
                  />
                </div>
                
                {editingSubscription.auto_deduct && (
                  <div className="space-y-2">
                    <Label className="neo-brutal-text">{t({ en: 'SELECT ACCOUNT', ar: 'تحديد الحساب' })}</Label>
                    <Select value={editingSubscription.account_id} onValueChange={(v) => setEditingSubscription({...editingSubscription, account_id: v})}>
                      <SelectTrigger className="neo-brutal-border">
                        <SelectValue placeholder={t({ en: 'Choose account for auto-deduction', ar: 'اختر حسابًا للخصم التلقائي' })} />
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

              {/* Reminder Settings */}
              <div className="bg-yellow-50 neo-brutal-border p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="neo-brutal-text">{t({ en: 'REMINDERS', ar: 'تذكيرات' })}</Label>
                    <p className="text-sm text-gray-600 font-medium">{t({ en: 'Get notified before due date', ar: 'احصل على إشعار قبل تاريخ الاستحقاق' })}</p>
                  </div>
                  <Switch
                    checked={editingSubscription.reminder_enabled}
                    onCheckedChange={(checked) => setEditingSubscription({...editingSubscription, reminder_enabled: checked})}
                  />
                </div>
                
                {editingSubscription.reminder_enabled && (
                  <div className="space-y-2">
                    <Label className="neo-brutal-text">{t({ en: 'DAYS BEFORE DUE DATE', ar: 'أيام قبل تاريخ الاستحقاق' })}</Label>
                    <Select value={editingSubscription.reminder_days?.toString()} onValueChange={(v) => setEditingSubscription({...editingSubscription, reminder_days: parseInt(v)})}>
                      <SelectTrigger className="neo-brutal-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">{t({ en: '1 day before', ar: 'قبل يوم واحد' })}</SelectItem>
                        <SelectItem value="3">{t({ en: '3 days before', ar: 'قبل 3 أيام' })}</SelectItem>
                        <SelectItem value="7">{t({ en: '1 week before', ar: 'قبل أسبوع واحد' })}</SelectItem>
                        <SelectItem value="14">{t({ en: '2 weeks before', ar: 'قبل أسبوعين' })}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
            )}
            <DialogFooter className="sm:justify-between">
                <div>
                    {editingSubscription?.id && (
                        <Button variant="destructive" onClick={() => handleDelete(editingSubscription.id)} className="neo-brutal-border neo-brutal-shadow-small"><Trash2 className="w-4 h-4 mr-2"/>{t({ en: 'DELETE', ar: 'حذف' })}</Button>
                    )}
                </div>
                <div className="flex gap-2">
                   <DialogClose asChild><Button type="button" variant="secondary" className="neo-brutal-border neo-brutal-shadow-small">{t({ en: 'CANCEL', ar: 'إلغاء' })}</Button></DialogClose>
                   <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow-small">{t({ en: 'SAVE', ar: 'حفظ' })}</Button>
                </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function SubscriptionTable({ subscriptions, accounts, onEdit, t }) {
    if (subscriptions.length === 0) {
        return <p className="text-center text-gray-500 font-bold py-8">{t({ en: 'No subscriptions in this category.', ar: 'لا توجد اشتراكات في هذه الفئة.' })}</p>
    }
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b-4 border-black">
                        <th className="p-3 text-left neo-brutal-text">{t({ en: 'SERVICE', ar: 'الخدمة' })}</th>
                        <th className="p-3 text-left neo-brutal-text">{t({ en: 'AMOUNT', ar: 'المبلغ' })}</th>
                        <th className="p-3 text-left neo-brutal-text">{t({ en: 'NEXT DUE', ar: 'تاريخ الاستحقاق التالي' })}</th>
                        <th className="p-3 text-left neo-brutal-text">{t({ en: 'PAYMENT', ar: 'الدفع' })}</th>
                        <th className="p-3 text-left neo-brutal-text">{t({ en: 'ACTIONS', ar: 'الإجراءات' })}</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map(sub => {
                        const account = accounts.find(acc => acc.id === sub.account_id);
                        return (
                            <tr key={sub.id} className="border-b-2 border-gray-200">
                                <td className="p-3">
                                  <div>
                                    <div className="font-bold">{sub.service_name}</div>
                                    <div className="text-sm text-gray-600 capitalize">{sub.category} • {sub.billing_cycle}</div>
                                  </div>
                                </td>
                                <td className="p-3 font-bold">QAR {sub.amount.toFixed(2)}</td>
                                <td className="p-3">
                                  <div>
                                    <div className="font-medium">{format(new Date(sub.next_billing_date), 'dd MMM yyyy')}</div>
                                    {sub.reminder_enabled && (
                                      <div className="text-xs text-blue-600 flex items-center gap-1">
                                        <Bell className="w-3 h-3" />
                                        {sub.reminder_days}{t({ en: 'd reminder', ar: 'أيام تذكير' })}
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="p-3">
                                  {sub.auto_deduct ? (
                                    <div className="flex items-center gap-2 text-green-600">
                                      <CreditCard className="w-4 h-4" />
                                      <div className="text-sm">
                                        <div className="font-bold">{t({ en: 'Auto', ar: 'تلقائي' })}</div>
                                        <div>{account?.nickname || t({ en: 'Unknown', ar: 'غير معروف' })}</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-600 text-sm font-medium">{t({ en: 'Manual', ar: 'يدوي' })}</div>
                                  )}
                                </td>
                                <td className="p-3">
                                    <Button size="sm" variant="outline" onClick={() => onEdit(sub)} className="neo-brutal-border neo-brutal-shadow-small">
                                        <Edit className="w-4 h-4"/>
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

