
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check, Star, Shield, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

const features = [
  {
    icon: Zap,
    title: { en: "Auto Expense Tracking", ar: "تتبع المصاريف التلقائي" },
    description: { en: "Automatically categorize and track all your spending", ar: "تصنيف وتتبع جميع مصاريفك تلقائياً" }
  },
  {
    icon: Star,
    title: { en: "AI Money Coach", ar: "مدرب الأموال الذكي" },
    description: { en: "Get personalized financial advice tailored to Gulf culture", ar: "احصل على نصائح مالية مخصصة لثقافة الخليج" }
  },
  {
    icon: Shield,
    title: { en: "Zakat Calculator", ar: "حاسبة الزكاة" },
    description: { en: "Automatic Zakat calculations based on Islamic principles", ar: "حسابات زكاة تلقائية وفقاً للمبادئ الإسلامية" }
  },
  {
    icon: Globe,
    title: { en: "Arabic & English", ar: "العربية والإنجليزية" },
    description: { en: "Full bilingual support for both languages", ar: "دعم كامل للغتين العربية والإنجليزية" }
  }
];

const includedFeatures = {
  en: [
    "Unlimited expense tracking",
    "Multiple bank account management",
    "Subscription tracking & alerts",
    "Receipt scanning with AI",
    "Smart financial reports",
    "Calendar view for bills",
    "Community deals sharing",
    "Qatar-specific features",
    "24/7 customer support",
    "Data security & privacy"
  ],
  ar: [
    "تتبع مصاريف غير محدود",
    "إدارة حسابات بنكية متعددة",
    "تتبع الاشتراكات والتنبيهات",
    "مسح الإيصالات بالذكاء الاصطناعي",
    "تقارير مالية ذكية",
    "عرض التقويم للفواتير",
    "مشاركة عروض المجتمع",
    "ميزات خاصة بقطر",
    "دعم العملاء على مدار الساعة",
    "أمان البيانات والخصوصية"
  ]
};

export default function Pricing() {
  const { isArabic, toggleLanguage, t } = useLanguage();

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
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Home')}>
              <Button variant="ghost" className="text-white hover:bg-red-700 neo-brutal-text">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t({ en: 'BACK TO HOME', ar: 'العودة للرئيسية' })}
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-400 neo-brutal-border neo-brutal-shadow flex items-center justify-center asymmetric-skew">
                <span className="neo-brutal-text text-black text-xl reverse-skew">M</span>
              </div>
              <h1 className="neo-brutal-text text-white text-2xl">MASAR</h1>
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="text-white hover:bg-red-700 neo-brutal-text text-sm"
          >
            <Globe className="w-4 h-4 mr-2" />
            {isArabic ? 'English' : 'العربية'}
          </Button>
        </div>
      </header>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="neo-brutal-text text-5xl lg:text-7xl text-black mb-6 asymmetric-skew">
              {t({ en: 'SIMPLE PRICING', ar: 'تسعير بسيط' })}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 font-bold mb-8 max-w-3xl mx-auto leading-relaxed">
              {t({ 
                en: 'Everything you need to manage your money in Qatar. One simple price, no hidden fees.',
                ar: 'كل ما تحتاجه لإدارة أموالك في قطر. سعر بسيط واحد، بدون رسوم خفية.'
              })}
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto mb-16">
            <Card className="neo-brutal-border neo-brutal-shadow bg-white text-center overflow-hidden">
              <div className="p-8">
                <h3 className="neo-brutal-text text-3xl text-black mb-4">
                  {t({ en: 'MASAR', ar: 'مسار' })}
                </h3>
                
                {/* Price */}
                <div className="mb-8">
                  <span className="neo-brutal-text text-6xl text-red-600">QAR 7</span>
                  <span className="neo-brutal-text text-xl text-gray-600 block mt-2">
                    {t({ en: 'PER MONTH', ar: 'في الشهر' })}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8 text-left">
                  {includedFeatures[isArabic ? 'ar' : 'en'].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="font-bold text-gray-800">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text text-xl py-6 mb-4">
                  {t({ en: 'START FREE TRIAL', ar: 'ابدأ التجربة المجانية' })}
                </Button>
                
                <p className="text-sm text-gray-500 font-medium">
                  {t({ 
                    en: '7-day free trial • Cancel anytime • No setup fees',
                    ar: 'تجربة مجانية لمدة 7 أيام • إلغاء في أي وقت • بدون رسوم إعداد'
                  })}
                </p>
              </div>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="neo-brutal-text text-4xl lg:text-5xl text-center mb-12 asymmetric-skew">
              {t({ en: 'POWERFUL FEATURES', ar: 'ميزات قوية' })}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="neo-brutal-border neo-brutal-shadow bg-white p-6">
                  <div className="w-16 h-16 bg-blue-500 neo-brutal-border neo-brutal-shadow-small flex items-center justify-center asymmetric-skew">
                    <feature.icon className="w-8 h-8 text-white reverse-skew" />
                  </div>
                  <h3 className="neo-brutal-text text-xl mb-3">{t(feature.title)}</h3>
                  <p className="text-gray-600 font-bold leading-relaxed">{t(feature.description)}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="neo-brutal-text text-4xl text-center mb-12 asymmetric-skew">
              {t({ en: 'FREQUENTLY ASKED', ar: 'الأسئلة الشائعة' })}
            </h2>
            
            <div className="space-y-6">
              <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
                <h3 className="neo-brutal-text text-xl mb-3">
                  {t({ en: 'IS THERE A FREE TRIAL?', ar: 'هل توجد تجربة مجانية؟' })}
                </h3>
                <p className="text-gray-700 font-bold">
                  {t({ 
                    en: 'Yes! You get a 7-day free trial to test all features. No credit card required to start.',
                    ar: 'نعم! تحصل على تجربة مجانية لمدة 7 أيام لاختبار جميع الميزات. لا نحتاج بطاقة ائتمان للبدء.'
                  })}
                </p>
              </Card>

              <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
                <h3 className="neo-brutal-text text-xl mb-3">
                  {t({ en: 'CAN I CANCEL ANYTIME?', ar: 'هل يمكنني الإلغاء في أي وقت؟' })}
                </h3>
                <p className="text-gray-700 font-bold">
                  {t({ 
                    en: 'Absolutely! You can cancel your subscription anytime with no penalties or hidden fees.',
                    ar: 'بالطبع! يمكنك إلغاء اشتراكك في أي وقت بدون غرامات أو رسوم خفية.'
                  })}
                </p>
              </Card>

              <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
                <h3 className="neo-brutal-text text-xl mb-3">
                  {t({ en: 'IS MY DATA SECURE?', ar: 'هل بياناتي آمنة؟' })}
                </h3>
                <p className="text-gray-700 font-bold">
                  {t({ 
                    en: 'Yes! All your data is encrypted and stored securely on GCC servers with bank-level security.',
                    ar: 'نعم! جميع بياناتك مشفرة ومخزنة بشكل آمن على خوادم دول الخليج بأمان مصرفي.'
                  })}
                </p>
              </Card>

              <Card className="neo-brutal-border neo-brutal-shadow bg-white p-6">
                <h3 className="neo-brutal-text text-xl mb-3">
                  {t({ en: 'WHAT PAYMENT METHODS DO YOU ACCEPT?', ar: 'ما طرق الدفع المقبولة؟' })}
                </h3>
                <p className="text-gray-700 font-bold">
                  {t({ 
                    en: 'We accept all major credit cards, debit cards, and local payment methods in Qatar.',
                    ar: 'نقبل جميع بطاقات الائتمان الرئيسية وبطاقات الخصم وطرق الدفع المحلية في قطر.'
                  })}
                </p>
              </Card>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-yellow-400 neo-brutal-border neo-brutal-shadow p-8 mt-16 text-center asymmetric-skew">
            <div className="reverse-skew">
              <h2 className="neo-brutal-text text-4xl text-black mb-4">
                {t({ en: 'READY TO START?', ar: 'جاهز للبدء؟' })}
              </h2>
              <p className="text-xl font-bold text-black mb-6">
                {t({ 
                  en: 'Join thousands of users managing their money smartly with Masar',
                  ar: 'انضم إلى آلاف المستخدمين الذين يديرون أموالهم بذكاء مع مسار'
                })}
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text text-xl px-8 py-6">
                {t({ en: 'GET STARTED NOW', ar: 'ابدأ الآن' })}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-400 neo-brutal-border border-2 border-white flex items-center justify-center">
              <span className="neo-brutal-text text-black text-lg">M</span>
            </div>
            <h3 className="neo-brutal-text text-white text-xl">MASAR</h3>
          </div>
          <p className="text-gray-300 font-medium">
            © 2024 Masar. {t({ en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' })}
          </p>
        </div>
      </footer>
    </div>
  );
}
