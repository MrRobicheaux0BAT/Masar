
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import {
  Repeat,
  Sparkles,
  Calendar,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Globe
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const features = [
  {
    icon: Repeat,
    title: { en: "Auto-track Subs", ar: "تتبع الاشتراكات تلقائياً" },
    body: { en: "No more surprise renewals.", ar: "لا مزيد من التجديدات المفاجئة." },
    color: "bg-purple-500"
  },
  {
    icon: Sparkles,
    title: { en: "AI Money Coach", ar: "مدرب الأموال الذكي" },
    body: { en: "Plans tuned for Gulf salaries.", ar: "خطط مصممة لرواتب الخليج." },
    color: "bg-orange-500"
  },
  {
    icon: Calendar,
    title: { en: "Smart Calendar", ar: "التقويم الذكي" },
    body: { en: "See every bill at a glance.", ar: "اطلع على كل فاتورة بنظرة واحدة." },
    color: "bg-blue-500"
  },
  {
    icon: Shield,
    title: { en: "Private & Secure", ar: "خاص وآمن" },
    body: { en: "Data stays in GCC servers.", ar: "البيانات تبقى في خوادم دول الخليج." },
    color: "bg-green-500"
  }
];

export default function Home() {
  const { isArabic, toggleLanguage, t } = useLanguage();

  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.origin + createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Login error:", error);
      alert(t({ en: "Failed to login. Please try again.", ar: "فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى." }));
    }
  };

  const handleSignUp = async () => {
    try {
      await User.loginWithRedirect(window.location.origin + createPageUrl("Onboarding"));
    } catch (error) {
      console.error("Sign up error:", error);
      alert(t({ en: "Failed to sign up. Please try again.", ar: "فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى." }));
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
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

      {/* Header */}
      <header className="bg-red-600 neo-brutal-border border-b-4 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 neo-brutal-border neo-brutal-shadow flex items-center justify-center asymmetric-skew">
              <span className="neo-brutal-text text-black text-xl reverse-skew">M</span>
            </div>
            <h1 className="neo-brutal-text text-white text-2xl">MASAR</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="text-white hover:bg-red-700 neo-brutal-text text-sm"
            >
              <Globe className="w-4 h-4 mr-2" />
              {isArabic ? 'English' : 'العربية'}
            </Button>
            
            <Button 
              onClick={handleLogin}
              className="bg-yellow-400 hover:bg-yellow-500 text-black neo-brutal-border neo-brutal-shadow neo-brutal-text"
            >
              {isArabic ? 'تسجيل الدخول' : 'LOGIN'}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 py-20">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="neo-brutal-text text-5xl lg:text-7xl mb-6 asymmetric-skew">
              {isArabic ? 'تتبع. وفر. انمو.' : 'TRACK. SAVE. GROW.'}
            </h1>
            <p className="text-xl lg:text-2xl font-bold mb-8 leading-relaxed">
              {isArabic 
                ? 'الرفيق المالي المركز على قطر الذي يحافظ على كل فاتورة واشتراك وريال تحت السيطرة.'
                : 'The Qatar-centric finance companion that keeps every bill, subscription and riyal in check.'
              }
            </p>
            <Button 
              onClick={handleSignUp}
              className="bg-yellow-400 hover:bg-yellow-500 text-black neo-brutal-border neo-brutal-shadow neo-brutal-text text-xl px-8 py-6 transition-all duration-200 hover:translate-x-2 hover:translate-y-2 hover:shadow-none"
            >
              {isArabic ? 'ابدأ الآن' : 'GET STARTED'}
              <ArrowRight className={`w-6 h-6 ${isArabic ? 'mr-2' : 'ml-2'}`} />
            </Button>
          </div>
          
          <div className="lg:block hidden">
            <div className="bg-white neo-brutal-border neo-brutal-shadow p-8 asymmetric-skew">
              <div className="reverse-skew space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-100 neo-brutal-border border-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-bold">
                    {isArabic ? 'تم توفير 2,450 ريال هذا الشهر' : 'QAR 2,450 saved this month'}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-100 neo-brutal-border border-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span className="font-bold">
                    {isArabic ? '3 فواتير مستحقة الأسبوع القادم' : '3 bills due next week'}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-100 neo-brutal-border border-2">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                  <span className="font-bold">
                    {isArabic ? 'المدرب الذكي جاهز للمساعدة' : 'AI coach ready to help'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="bg-yellow-400 py-10 neo-brutal-border border-y-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 flex-wrap">
                <h2 className="neo-brutal-text text-3xl md:text-4xl text-black">
                    {t({ en: 'ALL FEATURES. ONE PRICE.', ar: 'كل الميزات. سعر واحد.' })}
                </h2>
                <div className="bg-white p-4 neo-brutal-border neo-brutal-shadow asymmetric-skew">
                    <p className="neo-brutal-text text-3xl md:text-4xl text-red-600 reverse-skew">
                        {t({ en: 'QAR 7/MONTH', ar: '٧ ر.ق/شهرياً' })}
                    </p>
                </div>
                <Link to={createPageUrl("Pricing")}>
                    <Button className="bg-red-600 hover:bg-red-700 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text text-lg px-6 py-3 transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                        {t({ en: 'SEE DETAILS', ar: 'عرض التفاصيل' })}
                        <ArrowRight className={`w-5 h-5 ${isArabic ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                </Link>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="neo-brutal-text text-4xl lg:text-5xl text-center mb-16 asymmetric-skew">
            {isArabic ? 'لماذا مسار؟' : 'WHY MASAR?'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="neo-brutal-border neo-brutal-shadow bg-white p-6 transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                <div className={`w-16 h-16 ${feature.color} neo-brutal-border neo-brutal-shadow-small flex items-center justify-center mb-4 asymmetric-skew`}>
                  <feature.icon className="w-8 h-8 text-white reverse-skew" />
                </div>
                <h3 className="neo-brutal-text text-xl mb-3">{t(feature.title)}</h3>
                <p className="text-gray-600 font-bold">{t(feature.body)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="neo-brutal-text text-4xl lg:text-5xl text-black mb-6 asymmetric-skew">
            {isArabic ? 'ابدأ رحلتك المالية اليوم' : 'START YOUR FINANCIAL JOURNEY TODAY'}
          </h2>
          <p className="text-xl font-bold text-black mb-8">
            {isArabic 
              ? 'انضم إلى آلاف القطريين والمقيمين الذين يديرون أموالهم بذكاء'
              : 'Join thousands of Qataris and residents managing their money smartly'
            }
          </p>
          <Button 
            onClick={handleSignUp}
            className="bg-red-600 hover:bg-red-700 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text text-xl px-8 py-6 transition-all duration-200 hover:translate-x-2 hover:translate-y-2 hover:shadow-none"
          >
            {isArabic ? 'إنشاء حساب مجاني' : 'CREATE FREE ACCOUNT'}
            <ArrowRight className={`w-6 h-6 ${isArabic ? 'mr-2' : 'ml-2'}`} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-400 neo-brutal-border border-2 border-white flex items-center justify-center">
                  <span className="neo-brutal-text text-black text-lg">M</span>
                </div>
                <h3 className="neo-brutal-text text-white text-xl">MASAR</h3>
              </div>
              <p className="text-gray-300 font-medium">
                {isArabic 
                  ? 'تطبيق إدارة الأموال المصمم خصيصاً لقطر'
                  : 'Qatar-centric money management app'
                }
              </p>
            </div>
            
            <div>
              <h4 className="neo-brutal-text text-white mb-4">
                {isArabic ? 'روابط سريعة' : 'QUICK LINKS'}
              </h4>
              <div className="space-y-2">
                <button 
                  onClick={handleLogin}
                  className="block text-gray-300 hover:text-white font-bold cursor-pointer"
                >
                  {isArabic ? 'تسجيل الدخول' : 'Login'}
                </button>
                <Link to={createPageUrl("Privacy")} className="block text-gray-300 hover:text-white font-bold">
                  {isArabic ? 'الخصوصية' : 'Privacy'}
                </Link>
                <Link to={createPageUrl("Contact")} className="block text-gray-300 hover:text-white font-bold">
                  {isArabic ? 'اتصل بنا' : 'Contact'}
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="neo-brutal-text text-white mb-4">
                {isArabic ? 'مصنوع في قطر' : 'MADE IN QATAR'}
              </h4>
              <p className="text-gray-300 font-medium">
                {isArabic 
                  ? 'بيانات آمنة في خوادم دول الخليج'
                  : 'Secure data in GCC servers'
                }
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 font-medium">
              © 2024 Masar. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
