
import React, { useState, useEffect, useRef } from "react";
import { Receipt, Expense, Account } from "@/api/entities";
import { User } from "@/api/entities";
import { UploadFile, ExtractDataFromUploadedFile } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Camera, Plus, Trash2, Save, Loader2, ArrowLeft, Wallet, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { useLanguage } from "@/components/providers/LanguageProvider";

const CATEGORIES = ["Food", "Groceries", "Transport", "Shopping", "Bills", "Other"];

export default function Receipts() {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false); // New state for upload process
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const fileInputRef = useRef(null);

  const { isArabic, t } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      const [receiptData, accountData] = await Promise.all([
        Receipt.filter({ created_by: currentUser.email }, "-created_date"),
        Account.filter({ created_by: currentUser.email })
      ]);
      setReceipts(receiptData);
      setAccounts(accountData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };
  
  const handleFileUpload = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    if (accounts.length === 0) {
      alert(t({ en: "Please add an account before uploading receipts.", ar: "الرجاء إضافة حساب قبل رفع الإيصالات." }));
      // Clear the file input in case user tries again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Default to the first account available
    const accountToDeductFrom = accounts[0];
    const selectedAccountId = accountToDeductFrom.id;

    setIsUploading(true);
    try {
      // 1. Upload the file
      const { file_url } = await UploadFile({ file: file });

      // 2. Call OCR to extract data
      const extractionResult = await ExtractDataFromUploadedFile({
        file_url: file_url,
        json_schema: {
          type: "object",
          properties: {
            merchant: { type: "string" },
            amount: { type: "number" },
            date: { type: "string", format: "date" },
            category: { type: "string" } // Added category to schema for better extraction
          }
        }
      });
      
      let extractedAmount = 0;
      let extractedMerchant = "Unknown Merchant";
      let extractedDate = new Date().toISOString().split('T')[0];
      let extractedCategory = "Other"; // Default

      if (extractionResult.status === "success" && extractionResult.output) {
         extractedMerchant = extractionResult.output.merchant || extractedMerchant;
         extractedAmount = extractionResult.output.amount || extractedAmount;
         extractedDate = extractionResult.output.date || extractedDate;
         // Check if extracted category is one of our predefined categories
         if (extractionResult.output.category && CATEGORIES.includes(extractionResult.output.category)) {
           extractedCategory = extractionResult.output.category;
         }
      }
      
      // 3. Create the receipt record
      await Receipt.create({
        file_url,
        merchant: extractedMerchant,
        amount: extractedAmount,
        date: extractedDate,
        category: extractedCategory,
        account_id: selectedAccountId
      });

      // 4. Create corresponding expense record
      await Expense.create({
        title: t({ en: `Receipt from ${extractedMerchant}`, ar: `إيصال من ${extractedMerchant}` }),
        amount: extractedAmount,
        category: extractedCategory.toLowerCase().replace(' ', '_'), // Ensure category is lowercase and snake_case for expense
        date: extractedDate,
        merchant: extractedMerchant,
        payment_method: "card", // Default since it's from receipt
        notes: t({ en: `Auto-created from receipt upload`, ar: `تم الإنشاء تلقائيا من رفع الإيصال` }),
        account_id: selectedAccountId
      });

      // 5. Update account balance (deduct the amount)
      if (accountToDeductFrom) {
        const newBalance = (accountToDeductFrom.balance || 0) - extractedAmount;
        await Account.update(selectedAccountId, { balance: newBalance });
      }

      // 6. Dispatch custom event to notify dashboard of changes
      window.dispatchEvent(new CustomEvent('receipt-uploaded'));

      // 7. Reset and reload
      loadData();

      alert(t({
        en: `Receipt processed successfully! QAR ${extractedAmount.toFixed(2)} deducted from ${accountToDeductFrom?.nickname}.`,
        ar: `تمت معالجة الإيصال بنجاح! تم خصم ${extractedAmount.toFixed(2)} ريال قطري من ${accountToDeductFrom?.nickname}.`
      }));

    } catch (error) {
      console.error("Error processing receipt:", error);
      alert(t({ en: "Failed to process receipt. Please try again.", ar: "فشل معالجة الإيصال. الرجاء المحاولة مرة أخرى." }));
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  const openDetailModal = (receipt) => {
    setEditingReceipt({ ...receipt, date: receipt.date ? format(new Date(receipt.date), 'yyyy-MM-dd') : '' });
    setIsDetailModalOpen(true);
  };

  const handleUpdateReceipt = async () => {
     if (!editingReceipt) return;
     
     try {
       await Receipt.update(editingReceipt.id, {
          merchant: editingReceipt.merchant,
          amount: parseFloat(editingReceipt.amount) || 0,
          date: editingReceipt.date,
          category: editingReceipt.category
       });
       
       setIsDetailModalOpen(false);
       loadData();
     } catch (error) {
       console.error("Error updating receipt:", error);
       alert("Failed to update receipt."); // No translation needed here as per outline
     }
  };

  const handleDeleteReceipt = async () => {
    if (!editingReceipt) return;
    if (confirm(t({en: "Are you sure you want to delete this receipt?", ar: "هل أنت متأكد أنك تريد حذف هذا الإيصال؟"}))) {
        try {
          await Receipt.delete(editingReceipt.id);
          setIsDetailModalOpen(false);
          loadData();
        } catch (error) {
          console.error("Error deleting receipt:", error);
          alert("Failed to delete receipt."); // No translation needed here as per outline
        }
    }
  };

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
                {t({ en: 'RECEIPTS', ar: 'الإيصالات' })}
              </h1>
              <p className="text-gray-600 font-bold">
                {t({ en: 'Upload and track your receipts', ar: 'ارفع وتتبع إيصالاتك' })}
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text"
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t({ en: 'UPLOADING...', ar: 'جاري الرفع...' })}
              </div>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                {t({ en: 'UPLOAD RECEIPT', ar: 'رفع إيصال' })}
              </>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="neo-brutal-text">{t({ en: 'LOADING RECEIPTS...', ar: 'جاري تحميل الإيصالات...' })}</p>
            </div>
          ) : receipts.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="w-24 h-24 text-gray-400 mx-auto mb-4" />
              <h3 className="neo-brutal-text text-2xl text-gray-600 mb-2">
                {t({ en: 'NO RECEIPTS YET', ar: 'لا توجد إيصالات بعد' })}
              </h3>
              <p className="text-gray-500 font-medium mb-6">
                {t({ en: 'Upload your first receipt to get started', ar: 'ارفع إيصالك الأول للبدء' })}
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text"
              >
                <Upload className="w-5 h-5 mr-2" />
                {t({ en: 'UPLOAD FIRST RECEIPT', ar: 'رفع أول إيصال' })}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                  <thead>
                      <tr className="border-b-4 border-black">
                          <th className="p-3 text-left neo-brutal-text">{t({ en: 'IMAGE', ar: 'الصورة' })}</th>
                          <th className="p-3 text-left neo-brutal-text">{t({ en: 'MERCHANT', ar: 'التاجر' })}</th>
                          <th className="p-3 text-left neo-brutal-text">{t({ en: 'AMOUNT', ar: 'المبلغ' })}</th>
                          <th className="p-3 text-left neo-brutal-text">{t({ en: 'DATE', ar: 'التاريخ' })}</th>
                          <th className="p-3 text-left neo-brutal-text">{t({ en: 'ACCOUNT', ar: 'الحساب' })}</th>
                          <th className="p-3 text-left neo-brutal-text">{t({ en: 'CATEGORY', ar: 'الفئة' })}</th>
                      </tr>
                  </thead>
                  <tbody>
                      {receipts.map(receipt => {
                        const account = accounts.find(acc => acc.id === receipt.account_id);
                        return (
                          <tr key={receipt.id} onClick={() => openDetailModal(receipt)} className="border-b-2 border-gray-200 hover:bg-gray-50 cursor-pointer">
                              <td className="p-3">
                                <img src={receipt.thumbnail_url || receipt.file_url} alt={receipt.merchant} className="w-12 h-12 object-cover neo-brutal-border"/>
                              </td>
                              <td className="p-3 font-bold">{receipt.merchant}</td>
                              <td className="p-3 font-bold text-blue-600">-QAR {receipt.amount?.toFixed(2)}</td>
                              <td className="p-3">{receipt.date ? format(new Date(receipt.date), 'dd MMM yyyy') : '-'}</td>
                              <td className="p-3">
                                {account ? (
                                  <div className="flex items-center gap-2">
                                    <Wallet className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium">{account.nickname}</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">
                                    {t({ en: 'Unknown Account', ar: 'حساب غير معروف' })}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 capitalize">
                                {t({ 
                                  en: receipt.category, 
                                  ar: receipt.category === 'Food' ? 'طعام' : 
                                      receipt.category === 'Groceries' ? 'بقالة' : 
                                      receipt.category === 'Transport' ? 'نقل' : 
                                      receipt.category === 'Shopping' ? 'تسوق' : 
                                      receipt.category === 'Bills' ? 'فواتير' : 'أخرى' 
                                })}
                              </td>
                          </tr>
                        );
                      })}
                  </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Receipt Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          {editingReceipt && (
          <DialogContent className="neo-brutal-border neo-brutal-shadow max-w-lg">
            <DialogHeader>
              <DialogTitle className="neo-brutal-text text-2xl">{t({en: 'RECEIPT DETAIL', ar: 'تفاصيل الإيصال'})}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <img src={editingReceipt.file_url} alt="Receipt" className="w-full neo-brutal-border"/>
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="neo-brutal-text">{t({en: 'Merchant', ar: 'التاجر'})}</Label>
                    <Input value={editingReceipt.merchant} onChange={(e) => setEditingReceipt({...editingReceipt, merchant: e.target.value})} className="neo-brutal-border"/>
                  </div>
                  <div className="space-y-2">
                    <Label className="neo-brutal-text">{t({en: 'Amount', ar: 'المبلغ'})}</Label>
                    <Input type="number" value={editingReceipt.amount} onChange={(e) => setEditingReceipt({...editingReceipt, amount: e.target.value})} className="neo-brutal-border"/>
                  </div>
                   <div className="space-y-2">
                    <Label className="neo-brutal-text">{t({en: 'Date', ar: 'التاريخ'})}</Label>
                    <Input type="date" value={editingReceipt.date} onChange={(e) => setEditingReceipt({...editingReceipt, date: e.target.value})} className="neo-brutal-border"/>
                  </div>
                   <div className="space-y-2">
                    <Label className="neo-brutal-text">{t({en: 'Category', ar: 'الفئة'})}</Label>
                     <Select value={editingReceipt.category} onValueChange={(v) => setEditingReceipt({...editingReceipt, category: v})}>
                        <SelectTrigger className="neo-brutal-border"><SelectValue/></SelectTrigger>
                        <SelectContent>{CATEGORIES.map(c => 
                            <SelectItem key={c} value={c}>
                                {t({ 
                                  en: c, 
                                  ar: c === 'Food' ? 'طعام' : 
                                      c === 'Groceries' ? 'بقالة' : 
                                      c === 'Transport' ? 'نقل' : 
                                      c === 'Shopping' ? 'تسوق' : 
                                      c === 'Bills' ? 'فواتير' : 'أخرى' 
                                })}
                            </SelectItem>
                        )}</SelectContent>
                    </Select>
                  </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
                <Button variant="destructive" onClick={handleDeleteReceipt} className="neo-brutal-border neo-brutal-shadow-small"><Trash2 className="w-4 h-4 mr-2"/>{t({en: 'DELETE', ar: 'حذف'})}</Button>
                <Button onClick={handleUpdateReceipt} className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow-small"><Save className="w-4 h-4 mr-2"/>{t({en: 'SAVE', ar: 'حفظ'})}</Button>
            </DialogFooter>
          </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
