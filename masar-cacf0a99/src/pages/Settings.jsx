
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Expense, Subscription, Account, Receipt, Deal, SideIncome } from "@/api/entities";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, LogOut, User as UserIcon, Globe, Trash2, Loader2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/components/providers/LanguageProvider";


export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      setIsLoading(true);
      try {
        await User.logout();
        // Force a redirect to the home page for a clean state after logout.
        window.location.href = createPageUrl("Home");
      } catch (error) {
        console.error("Error logging out:", error);
        // Fallback redirect in case of error.
        window.location.href = createPageUrl("Home");
      }
      setIsLoading(false);
    }
  };

  const handleDeleteAllData = async () => {
    setIsDeleting(true);
    try {
      const currentUser = await User.me();
      const [expenses, subscriptions, accounts, receipts, deals, sideIncomes] = await Promise.all([
        Expense.filter({ created_by: currentUser.email }),
        Subscription.filter({ created_by: currentUser.email }),
        Account.filter({ created_by: currentUser.email }),
        Receipt.filter({ created_by: currentUser.email }),
        Deal.filter({ created_by: currentUser.email }),
        SideIncome.filter({ created_by: currentUser.email })
      ]);

      const deletionPromises = [
        ...expenses.map(item => Expense.delete(item.id)),
        ...subscriptions.map(item => Subscription.delete(item.id)),
        ...accounts.map(item => Account.delete(item.id)),
        ...receipts.map(item => Receipt.delete(item.id)),
        ...deals.map(item => Deal.delete(item.id)),
        ...sideIncomes.map(item => SideIncome.delete(item.id)),
      ];
    
      await Promise.all(deletionPromises);
    
      alert("All app data has been removed successfully!");
      navigate(createPageUrl("Dashboard"));

    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete all data. Please try again.");
    }
    setIsDeleting(false);
  };

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
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
          <div>
            <h1 className="neo-brutal-text text-4xl text-black asymmetric-skew">SETTINGS</h1>
            <p className="text-gray-600 font-bold">Manage your account and preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserIcon className="w-6 h-6 text-gray-600" />
              <h2 className="neo-brutal-text text-xl text-black">ACCOUNT INFORMATION</h2>
            </div>
            
            {user && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-bold text-gray-600 uppercase">Full Name</label>
                  <p className="neo-brutal-text text-lg">{user.full_name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600 uppercase">Email</label>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Danger Zone */}
          <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
            <h2 className="neo-brutal-text text-xl text-red-600 mb-4">DANGER ZONE</h2>
            <div className="space-y-6">
              
              <div className="bg-orange-50 neo-brutal-border border-orange-500 p-4">
                <h3 className="neo-brutal-text text-lg text-orange-700 mb-2">LOGOUT</h3>
                <p className="text-orange-600 font-medium mb-4">
                  Sign out of your Masar account on this device.
                </p>
                <Button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-700 text-white neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  LOGOUT
                </Button>
              </div>

              <div className="bg-red-50 neo-brutal-border border-red-500 p-4">
                <h3 className="neo-brutal-text text-lg text-red-700 mb-2">RESET APP DATA</h3>
                <p className="text-red-600 font-medium mb-4">
                  Permanently delete all your accounts, transactions, receipts, and other data. This cannot be undone.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full bg-red-600 hover:bg-red-700 text-white neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
                      disabled={isDeleting}
                    >
                      {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                      DELETE ALL DATA
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="neo-brutal-border neo-brutal-shadow">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="neo-brutal-text text-2xl">ARE YOU SURE?</AlertDialogTitle>
                      <AlertDialogDescription className="text-lg text-gray-700 font-bold">
                        This will permanently delete ALL data including expenses, subscriptions, receipts, and accounts. This action is irreversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAllData} className="bg-red-600 hover:bg-red-700 neo-brutal-border neo-brutal-shadow-small neo-brutal-text">
                        Yes, delete everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
