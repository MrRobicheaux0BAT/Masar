

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  Plus, 
  CreditCard, 
  Bot, 
  Menu,
  X,
  Settings,
  Calendar,
  Wallet,
  Repeat,
  Banknote,
  Sparkles,
  Tag,
  Bell,
  LogOut,
  User as UserIcon,
  Camera,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/api/entities";
import { LanguageProvider, useLanguage } from "@/components/providers/LanguageProvider";

const navigationItems = [
  { 
    title: { en: "Dashboard", ar: "لوحة التحكم" }, 
    url: createPageUrl("Dashboard"), 
    icon: LayoutDashboard, 
    color: "bg-red-500" 
  },
  { 
    title: { en: "Receipts", ar: "الإيصالات" }, 
    url: createPageUrl("Receipts"), 
    icon: Camera, 
    color: "bg-green-500" 
  },
  { 
    title: { en: "Calendar", ar: "التقويم" }, 
    url: createPageUrl("Calendar"), 
    icon: Calendar, 
    color: "bg-indigo-500" 
  },
  { 
    title: { en: "Subscriptions", ar: "الاشتراكات" }, 
    url: createPageUrl("Subscriptions"), 
    icon: Repeat, 
    color: "bg-purple-500" 
  },
  { 
    title: { en: "Accounts", ar: "الحسابات" }, 
    url: createPageUrl("Accounts"), 
    icon: Wallet, 
    color: "bg-blue-500" 
  },
  { 
    title: { en: "Income", ar: "الدخل" }, 
    url: createPageUrl("Income"), 
    icon: Banknote, 
    color: "bg-teal-500" 
  },
  { 
    title: { en: "AI Coach", ar: "المدرب الذكي" }, 
    url: createPageUrl("AICoach"), 
    icon: Sparkles, 
    color: "bg-orange-500" 
  },
  { 
    title: { en: "Deals", ar: "العروض" }, 
    url: createPageUrl("Deals"), 
    icon: Tag, 
    color: "bg-pink-500" 
  },
];

const PUBLIC_PAGES = ["Home", "Onboarding", "Privacy", "Contact"];

function LayoutContent({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const { isArabic, toggleLanguage, t } = useLanguage();

  React.useEffect(() => {
      // Close mobile menu on page change
      setIsMobileMenuOpen(false);
      
      const fetchUser = async () => {
          try {
              const currentUser = await User.me();
              setUser(currentUser);
          } catch (e) {
              setUser(null);
          }
      };
      fetchUser();
  }, [location]);
  
  const handleLogout = async () => {
    try {
      await User.logout();
      // Force a redirect to the home page for a clean state after logout.
      window.location.href = createPageUrl("Home");
    } catch (error) {
      console.error("Error logging out:", error);
      // Fallback redirect in case of error.
      window.location.href = createPageUrl("Home");
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  // Conditionally render layout
  if (PUBLIC_PAGES.includes(currentPageName)) {
    return <>{children}</>;
  }

  const currentPage = navigationItems.find(item => location.pathname.startsWith(item.url.split('?')[0]));
  const pageTitle = currentPage ? t(currentPage.title) : t({ en: 'Dashboard', ar: 'لوحة التحكم' });

  return (
    <div className={`min-h-screen ${isArabic ? 'rtl' : 'ltr'}`}>
      <style>
        {`
          :root {
            --masar-maroon: #800020;
            --masar-gold: #FFD700;
            --masar-black: #000000;
            --masar-white: #FFFFFF;
            --masar-gray: #F5F5F5;
          }
          
          .neo-brutal-shadow { box-shadow: 6px 6px 0px var(--masar-black); }
          .neo-brutal-shadow-small { box-shadow: 3px 3px 0px var(--masar-black); }
          .neo-brutal-border { border: 4px solid var(--masar-black); }
          .neo-brutal-text { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em; }
          .asymmetric-skew { transform: skew(-2deg); }
          .reverse-skew { transform: skew(2deg); }
        `}
      </style>

      <div className="flex">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:flex flex-col w-64 bg-red-600 min-h-screen neo-brutal-border border-r-4 relative">
          <div className="p-6 border-b-4 border-black bg-red-700">
             <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-400 neo-brutal-border neo-brutal-shadow flex items-center justify-center asymmetric-skew">
                    <span className="neo-brutal-text text-black text-xl reverse-skew">M</span>
                </div>
                <div>
                    <h1 className="neo-brutal-text text-white text-2xl">MASAR</h1>
                </div>
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={toggleLanguage} 
              className="text-white hover:bg-red-600 neo-brutal-text text-xs w-full justify-start p-2"
            >
              <Globe className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
              {isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
            </Button>
          </div>

          <div className="flex-grow p-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                className={`flex items-center gap-3 p-3 neo-brutal-border neo-brutal-shadow-small transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
                  location.pathname.startsWith(item.url.split('?')[0])
                    ? `${item.color} text-white` 
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="neo-brutal-text text-base">
                  {t(item.title)}
                </span>
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Mobile Bottom Bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white neo-brutal-border border-t-4 z-50">
            <div className="flex justify-around">
                {navigationItems.filter(item => !["AI Coach", "Deals"].includes(t(item.title))).slice(0, 5).map(item => (
                     <Link key={item.url} to={item.url} className={`flex-1 flex flex-col items-center justify-center p-2 ${location.pathname.startsWith(item.url.split('?')[0]) ? 'bg-yellow-300' : ''}`}>
                         <item.icon className={`w-6 h-6 mb-1 ${location.pathname.startsWith(item.url.split('?')[0]) ? 'text-black' : 'text-gray-600'}`} />
                         <span className="text-xs font-bold">{t(item.title)}</span>
                     </Link>
                ))}
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex-1 flex flex-col items-center justify-center p-2">
                            <Menu className="w-6 h-6 mb-1 text-gray-600" />
                            <span className="text-xs font-bold">{isArabic ? 'المزيد' : 'More'}</span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mb-2 neo-brutal-border neo-brutal-shadow">
                        <DropdownMenuItem asChild><Link to={createPageUrl("AICoach")} className="neo-brutal-text flex items-center gap-2"><Sparkles className="w-4 h-4"/>{isArabic ? 'المدرب الذكي' : 'AI Coach'}</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link to={createPageUrl("Deals")} className="neo-brutal-text flex items-center gap-2"><Tag className="w-4 h-4"/>{isArabic ? 'العروض' : 'Deals'}</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link to={createPageUrl("Settings")} className="neo-brutal-text flex items-center gap-2"><Settings className="w-4 h-4"/>{isArabic ? 'الإعدادات' : 'Settings'}</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="neo-brutal-text flex items-center gap-2 text-red-600"><LogOut className="w-4 h-4"/>{isArabic ? 'تسجيل الخروج' : 'Logout'}</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
        
        <div className="flex-1 flex flex-col">
             {/* Desktop Top Bar */}
              <header className="hidden lg:flex bg-white neo-brutal-border border-b-4 p-4 items-center justify-between">
                <h1 className="neo-brutal-text text-3xl text-black asymmetric-skew">{pageTitle}</h1>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="neo-brutal-border neo-brutal-shadow-small">
                    <Bell className="w-5 h-5"/>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 p-2 neo-brutal-border neo-brutal-shadow-small">
                        <Avatar className="w-8 h-8 neo-brutal-border">
                            <AvatarImage src={user?.avatar_url} />
                            <AvatarFallback className="neo-brutal-text bg-yellow-400">{getInitials(user?.full_name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-bold hidden md:inline">{user?.full_name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={`${isArabic ? 'ml-4' : 'mr-4'} neo-brutal-border neo-brutal-shadow`}>
                      <DropdownMenuLabel className="neo-brutal-text">{user?.full_name}</DropdownMenuLabel>
                      <DropdownMenuLabel className="font-normal text-xs text-gray-500 -mt-2">{user?.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl("Settings")} className="flex items-center gap-2 cursor-pointer">
                          <Settings className="w-4 h-4"/> 
                          <span>{isArabic ? 'الإعدادات' : 'Settings'}</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-red-500 flex items-center gap-2 cursor-pointer">
                        <LogOut className="w-4 h-4"/>
                        <span>{isArabic ? 'تسجيل الخروج' : 'Logout'}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </header>

            {/* Mobile Header */}
              <header className="lg:hidden bg-red-600 neo-brutal-border border-b-4 p-4 flex items-center justify-between">
                <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-400 neo-brutal-border flex items-center justify-center">
                    <span className="neo-brutal-text text-black text-base">M</span>
                  </div>
                   <h1 className="neo-brutal-text text-white text-xl">MASAR</h1>
                </Link>
                 <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="text-white hover:bg-red-700 neo-brutal-text text-xs px-2"
                >
                  {isArabic ? 'EN' : 'AR'}
                </Button>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 pb-20 lg:pb-0 overflow-y-auto">
              {children}
            </main>
        </div>
      </div>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <LayoutContent children={children} currentPageName={currentPageName} />
    </LanguageProvider>
  );
}

