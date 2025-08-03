
import React, { useState, useEffect } from "react";
import { Account } from "@/api/entities";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Edit3, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

const BANKS = ["QNB", "CBQ", "QIB", "Doha Bank", "ADCB", "FAB", "Other"];
const ACCOUNT_TYPES = ["Current", "Savings", "Credit Card", "Mobile Wallet", "Cash"];

export default function Accounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bank: "QNB",
    account_type: "Current",
    nickname: "",
    balance: "0"
  });
  const { t } = useLanguage();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me(); // Fetch current user
      const data = await Account.filter({ created_by: currentUser.email }); // Filter accounts by user email
      setAccounts(data);
    } catch (error) {
      console.error("Error loading accounts:", error);
      // Optionally show a user-friendly error message
    }
    setIsLoading(false);
  };

  const handleAddAccount = async () => {
    if (!newAccount.nickname.trim()) {
      alert(t({en: "Please enter an account nickname", ar: "يرجى إدخال اسم مستعار للحساب"}));
      return;
    }

    try {
      const currentUser = await User.me(); // Get current user for created_by
      await Account.create({
        ...newAccount,
        balance: parseFloat(newAccount.balance) || 0,
        created_by: currentUser.email // Add created_by field
      });
      
      setNewAccount({
        bank: "QNB",
        account_type: "Current", 
        nickname: "",
        balance: "0"
      });
      setShowAddForm(false);
      loadAccounts();
    } catch (error) {
      console.error("Error creating account:", error);
      alert(t({en: "Failed to add account. Please try again.", ar: "فشل إضافة الحساب. الرجاء المحاولة مرة أخرى."}));
    }
  };

  const handleUpdateAccount = async (id, updatedData) => {
    try {
      await Account.update(id, {
        ...updatedData,
        balance: parseFloat(updatedData.balance) || 0
      });
      setEditingId(null);
      loadAccounts();
    } catch (error) {
      console.error("Error updating account:", error);
      alert(t({en: "Failed to update account. Please try again.", ar: "فشل تحديث الحساب. الرجاء المحاولة مرة أخرى."}));
    }
  };

  const handleDeleteAccount = async (id) => {
    if (confirm(t({en: "Are you sure you want to delete this account?", ar: "هل أنت متأكد أنك تريد حذف هذا الحساب؟"}))) {
      try {
        await Account.delete(id);
        loadAccounts();
      } catch (error) {
        console.error("Error deleting account:", error);
        alert(t({en: "Failed to delete account. Please try again.", ar: "فشل حذف الحساب. الرجاء المحاولة مرة أخرى."}));
      }
    }
  };

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="neo-brutal-text text-4xl text-black asymmetric-skew">{t({en: 'ACCOUNTS', ar: 'الحسابات'})}</h1>
            <p className="text-gray-600 font-bold">{t({en: 'Manage your bank accounts and wallets', ar: 'إدارة حساباتك البنكية ومحافظك'})}</p>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t({en: 'ADD ACCOUNT', ar: 'إضافة حساب'})}
          </Button>
        </div>

        {/* Add Account Form */}
        {showAddForm && (
          <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6 mb-6">
            <h3 className="neo-brutal-text text-xl mb-4">{t({en: 'ADD NEW ACCOUNT', ar: 'إضافة حساب جديد'})}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="neo-brutal-text">{t({en: 'BANK', ar: 'البنك'})}</Label>
                <Select 
                  value={newAccount.bank} 
                  onValueChange={(value) => setNewAccount({...newAccount, bank: value})}
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
                <Label className="neo-brutal-text">{t({en: 'TYPE', ar: 'النوع'})}</Label>
                <Select 
                  value={newAccount.account_type} 
                  onValueChange={(value) => setNewAccount({...newAccount, account_type: value})}
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
                <Label className="neo-brutal-text">{t({en: 'NICKNAME', ar: 'الاسم المستعار'})}</Label>
                <Input
                  value={newAccount.nickname}
                  onChange={(e) => setNewAccount({...newAccount, nickname: e.target.value})}
                  placeholder={t({en: "e.g. Main Account", ar: "مثال: الحساب الرئيسي"})}
                  className="neo-brutal-border neo-brutal-shadow-small"
                />
              </div>

              <div className="space-y-2">
                <Label className="neo-brutal-text">{t({en: 'BALANCE (QAR)', ar: 'الرصيد (ريال قطري)'})}</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({...newAccount, balance: e.target.value})}
                  placeholder="0.00"
                  className="neo-brutal-border neo-brutal-shadow-small"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                onClick={handleAddAccount}
                className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
              >
                <Save className="w-4 h-4 mr-2" />
                {t({en: 'SAVE ACCOUNT', ar: 'حفظ الحساب'})}
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
              >
                <X className="w-4 h-4 mr-2" />
                {t({en: 'CANCEL', ar: 'إلغاء'})}
              </Button>
            </div>
          </Card>
        )}

        {/* Accounts List */}
        <div className="space-y-4">
          {isLoading ? (
            <Card className="neo-brutal-border neo-brutal-shadow bg-white p-8 text-center">
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="neo-brutal-text">{t({en: 'LOADING ACCOUNTS...', ar: 'جاري تحميل الحسابات...'})}</p>
            </Card>
          ) : accounts.length === 0 ? (
            <Card className="neo-brutal-border neo-brutal-shadow bg-white p-8 text-center">
              <h3 className="neo-brutal-text text-2xl text-gray-600 mb-2">{t({en: 'NO ACCOUNTS YET', ar: 'لا توجد حسابات بعد'})}</h3>
              <p className="text-gray-500 font-medium">{t({en: 'Add your first account to get started', ar: 'أضف حسابك الأول للبدء'})}</p>
            </Card>
          ) : (
            accounts.map((account) => (
              <AccountRow
                key={account.id}
                account={account}
                isEditing={editingId === account.id}
                onEdit={() => setEditingId(account.id)}
                onSave={(updatedData) => handleUpdateAccount(account.id, updatedData)}
                onCancel={() => setEditingId(null)}
                onDelete={() => handleDeleteAccount(account.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function AccountRow({ account, isEditing, onEdit, onSave, onCancel, onDelete }) {
  const [editData, setEditData] = useState(account);
  const { t } = useLanguage();

  return (
    <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
      {isEditing ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="neo-brutal-text">{t({en: 'BANK', ar: 'البنك'})}</Label>
            <Select 
              value={editData.bank} 
              onValueChange={(value) => setEditData({...editData, bank: value})}
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
            <Label className="neo-brutal-text">{t({en: 'TYPE', ar: 'النوع'})}</Label>
            <Select 
              value={editData.account_type} 
              onValueChange={(value) => setEditData({...editData, account_type: value})}
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
            <Label className="neo-brutal-text">{t({en: 'NICKNAME', ar: 'الاسم المستعار'})}</Label>
            <Input
              value={editData.nickname}
              onChange={(e) => setEditData({...editData, nickname: e.target.value})}
              className="neo-brutal-border neo-brutal-shadow-small"
            />
          </div>

          <div className="space-y-2">
            <Label className="neo-brutal-text">{t({en: 'BALANCE (QAR)', ar: 'الرصيد (ريال قطري)'})}</Label>
            <Input
              type="number"
              step="0.01"
              value={editData.balance}
              onChange={(e) => setEditData({...editData, balance: e.target.value})}
              className="neo-brutal-border neo-brutal-shadow-small"
            />
          </div>

          <div className="md:col-span-2 flex gap-3 mt-4">
            <Button
              onClick={() => onSave(editData)}
              className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
            >
              <Save className="w-4 h-4 mr-2" />
              {t({en: 'SAVE', ar: 'حفظ'})}
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
            >
              <X className="w-4 h-4 mr-2" />
              {t({en: 'CANCEL', ar: 'إلغاء'})}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 neo-brutal-border neo-brutal-shadow-small flex items-center justify-center">
              <span className="neo-brutal-text text-white text-sm">
                {account.bank.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="neo-brutal-text text-xl">{account.nickname}</h3>
              <p className="text-gray-600 font-bold">
                {account.bank} • {account.account_type}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="neo-brutal-text text-2xl text-black">
                QAR {account.balance?.toFixed(2) || '0.00'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
                className="neo-brutal-border neo-brutal-shadow-small"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                className="neo-brutal-border neo-brutal-shadow-small text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
