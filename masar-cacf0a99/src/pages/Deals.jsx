import React, { useState, useEffect } from "react";
import { Deal, User } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ThumbsUp, ArrowLeft, Plus, Image as ImageIcon, Calendar, MapPin, User as UserIcon, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { useLanguage } from "@/components/providers/LanguageProvider";

const CATEGORIES = ["all", "food", "fashion", "tech", "grocery", "services", "entertainment", "other"];

export default function Deals() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newDeal, setNewDeal] = useState({
    title: "",
    description: "",
    merchant: "",
    location: "",
    category: "other",
    expires_at: ""
  });
  const { isArabic, t } = useLanguage();

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    setIsLoading(true);
    try {
      const data = await Deal.list("-created_date", 50);
      setDeals(data);
    } catch (error) {
      console.error("Error loading deals:", error);
    }
    setIsLoading(false);
  };
  
  const handleUpvote = async (deal) => {
    try {
      const updatedDeal = await Deal.update(deal.id, { upvotes: (deal.upvotes || 0) + 1 });
      setDeals(deals.map(d => d.id === deal.id ? { ...updatedDeal, upvotes: updatedDeal.upvotes } : d));
    } catch (error) {
      console.error("Error upvoting deal:", error);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitDeal = async () => {
    if (!newDeal.title || !newDeal.merchant || !newDeal.category) {
      alert(t({ en: "Please fill in all required fields", ar: "يرجى ملء جميع الحقول المطلوبة" }));
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = null;
      
      if (selectedFile) {
        const { file_url } = await UploadFile({ file: selectedFile });
        imageUrl = file_url;
      }

      await Deal.create({
        ...newDeal,
        image_url: imageUrl,
        upvotes: 0
      });

      setNewDeal({
        title: "",
        description: "",
        merchant: "",
        location: "",
        category: "other",
        expires_at: ""
      });
      setSelectedFile(null);
      setIsModalOpen(false);
      loadDeals();
    } catch (error) {
      console.error("Error creating deal:", error);
      alert(t({ en: "Failed to post deal. Please try again.", ar: "فشل في نشر العرض. يرجى المحاولة مرة أخرى." }));
    }
    setIsSubmitting(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Filter and search deals
  const filteredDeals = deals.filter(deal => {
    // Category filter
    const categoryMatch = filter === "all" || deal.category === filter;
    
    // Search filter
    const searchMatch = !searchQuery || 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.location && deal.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (deal.description && deal.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="hidden lg:inline-flex neo-brutal-border neo-brutal-shadow-small"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="neo-brutal-text text-4xl text-black asymmetric-skew">
              {t({ en: 'COMMUNITY DEALS', ar: 'عروض المجتمع' })}
            </h1>
            <p className="text-gray-600 font-bold">
              {t({ en: 'Share and discover the best offers in Qatar', ar: 'شارك واكتشف أفضل العروض في قطر' })}
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t({ en: 'POST DEAL', ar: 'نشر عرض' })}
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t({ 
                en: "Search deals, merchants, locations...", 
                ar: "ابحث في العروض والتجار والمواقع..." 
              })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 neo-brutal-border neo-brutal-shadow-small text-lg p-4"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Search Results Counter */}
          {searchQuery && (
            <p className="text-sm text-gray-600 font-medium mt-2">
              {t({ 
                en: `Found ${filteredDeals.length} deal${filteredDeals.length !== 1 ? 's' : ''} matching "${searchQuery}"`,
                ar: `تم العثور على ${filteredDeals.length} عرض يطابق "${searchQuery}"`
              })}
            </p>
          )}
        </div>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-8">
            {CATEGORIES.map(category => (
                <Button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`neo-brutal-border neo-brutal-shadow neo-brutal-text ${filter === category ? 'bg-yellow-400 text-black' : 'bg-white text-black'}`}
                >
                    {t({ 
                      en: category.toUpperCase(), 
                      ar: category === 'all' ? 'الكل' : 
                          category === 'food' ? 'طعام' : 
                          category === 'fashion' ? 'أزياء' : 
                          category === 'tech' ? 'تقنية' : 
                          category === 'grocery' ? 'بقالة' : 
                          category === 'services' ? 'خدمات' : 
                          category === 'entertainment' ? 'ترفيه' : 'أخرى' 
                    })}
                </Button>
            ))}
        </div>

        {/* Deals Grid */}
        {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="neo-brutal-text">{t({ en: 'LOADING DEALS...', ar: 'جاري تحميل العروض...' })}</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDeals.map(deal => (
                    <Card key={deal.id} className="neo-brutal-border neo-brutal-shadow bg-white flex flex-col">
                        <CardHeader>
                            {deal.image_url && (
                              <div className="aspect-video bg-gray-100 neo-brutal-border mb-4">
                                <img src={deal.image_url} alt={deal.title} className="w-full h-full object-cover"/>
                              </div>
                            )}
                            <CardTitle className="neo-brutal-text text-lg">{deal.title}</CardTitle>
                            <div className="space-y-2">
                              <p className="font-bold text-gray-800 flex items-center gap-1">
                                <span>📍</span> {deal.merchant}
                              </p>
                              {deal.location && (
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {deal.location}
                                </p>
                              )}
                              {deal.expires_at && (
                                <p className="text-sm text-orange-600 font-bold flex items-center gap-1">
                                  <Calendar className="w-3 h-3" /> 
                                  {t({ en: 'Expires:', ar: 'ينتهي:' })} {format(new Date(deal.expires_at), "dd MMM yyyy")}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <UserIcon className="w-3 h-3" />
                                {t({ en: 'Posted', ar: 'نُشر في' })} {format(new Date(deal.created_date), "dd MMM")}
                              </p>
                            </div>
                        </CardHeader>
                        {deal.description && (
                          <CardContent className="flex-grow">
                            <p className="text-sm text-gray-700">{deal.description}</p>
                          </CardContent>
                        )}
                        <CardFooter className="flex justify-between items-center bg-gray-50 p-4 border-t-4 border-black">
                            <span className="neo-brutal-text text-sm bg-pink-500 text-white p-2 neo-brutal-border">
                              {t({ 
                                en: deal.category.toUpperCase(), 
                                ar: deal.category === 'food' ? 'طعام' : 
                                    deal.category === 'fashion' ? 'أزياء' : 
                                    deal.category === 'tech' ? 'تقنية' : 
                                    deal.category === 'grocery' ? 'بقالة' : 
                                    deal.category === 'services' ? 'خدمات' : 
                                    deal.category === 'entertainment' ? 'ترفيه' : 'أخرى'
                              })}
                            </span>
                             <Button onClick={() => handleUpvote(deal)} variant="outline" className="neo-brutal-border neo-brutal-shadow-small">
                                 <ThumbsUp className="w-4 h-4 mr-2"/>
                                 <span className="font-bold">{deal.upvotes || 0}</span>
                             </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        )}
        
        {filteredDeals.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <h3 className="neo-brutal-text text-2xl text-gray-600 mb-2">
                {searchQuery 
                  ? t({ en: 'NO DEALS MATCH YOUR SEARCH', ar: 'لا توجد عروض تطابق بحثك' })
                  : t({ en: 'NO DEALS FOUND', ar: 'لم يتم العثور على عروض' })
                }
              </h3>
              <p className="text-gray-500 font-medium">
                {searchQuery 
                  ? t({ 
                      en: `Try searching for something else or clear your search to see all deals`, 
                      ar: `جرب البحث عن شيء آخر أو امسح البحث لرؤية جميع العروض` 
                    })
                  : t({ en: 'Be the first to post a deal in this category!', ar: 'كن أول من ينشر عرضاً في هذه الفئة!' })
                }
              </p>
              {searchQuery ? (
                <Button
                  onClick={clearSearch}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text"
                >
                  <X className="w-4 h-4 mr-2" />
                  {t({ en: 'CLEAR SEARCH', ar: 'مسح البحث' })}
                </Button>
              ) : (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow neo-brutal-text"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t({ en: 'POST FIRST DEAL', ar: 'نشر أول عرض' })}
                </Button>
              )}
            </div>
        )}

        {/* Post Deal Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="neo-brutal-border neo-brutal-shadow max-w-lg">
            <DialogHeader>
              <DialogTitle className="neo-brutal-text text-2xl">
                {t({ en: 'POST NEW DEAL', ar: 'نشر عرض جديد' })}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="neo-brutal-text">
                  {t({ en: 'Deal Title *', ar: 'عنوان العرض *' })}
                </Label>
                <Input
                  value={newDeal.title}
                  onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                  placeholder={t({ en: "e.g. 50% off at Carrefour", ar: "مثال: خصم 50% في كارفور" })}
                  className="neo-brutal-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="neo-brutal-text">
                  {t({ en: 'Description', ar: 'الوصف' })}
                </Label>
                <Textarea
                  value={newDeal.description}
                  onChange={(e) => setNewDeal({...newDeal, description: e.target.value})}
                  placeholder={t({ en: "Tell us more about this deal...", ar: "أخبرنا المزيد عن هذا العرض..." })}
                  className="neo-brutal-border"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="neo-brutal-text">
                    {t({ en: 'Merchant *', ar: 'التاجر *' })}
                  </Label>
                  <Input
                    value={newDeal.merchant}
                    onChange={(e) => setNewDeal({...newDeal, merchant: e.target.value})}
                    placeholder={t({ en: "e.g. Carrefour", ar: "مثال: كارفور" })}
                    className="neo-brutal-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="neo-brutal-text">
                    {t({ en: 'Category *', ar: 'الفئة *' })}
                  </Label>
                  <Select
                    value={newDeal.category}
                    onValueChange={(value) => setNewDeal({...newDeal, category: value})}
                  >
                    <SelectTrigger className="neo-brutal-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.filter(c => c !== 'all').map(category => (
                        <SelectItem key={category} value={category}>
                          {t({ 
                            en: category.charAt(0).toUpperCase() + category.slice(1), 
                            ar: category === 'food' ? 'طعام' : 
                                category === 'fashion' ? 'أزياء' : 
                                category === 'tech' ? 'تقنية' : 
                                category === 'grocery' ? 'بقالة' : 
                                category === 'services' ? 'خدمات' : 
                                category === 'entertainment' ? 'ترفيه' : 'أخرى' 
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="neo-brutal-text">
                    {t({ en: 'Location', ar: 'الموقع' })}
                  </Label>
                  <Input
                    value={newDeal.location}
                    onChange={(e) => setNewDeal({...newDeal, location: e.target.value})}
                    placeholder={t({ en: "e.g. City Center Mall", ar: "مثال: سيتي سنتر مول" })}
                    className="neo-brutal-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="neo-brutal-text">
                    {t({ en: 'Expires On', ar: 'ينتهي في' })}
                  </Label>
                  <Input
                    type="date"
                    value={newDeal.expires_at}
                    onChange={(e) => setNewDeal({...newDeal, expires_at: e.target.value})}
                    className="neo-brutal-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="neo-brutal-text">
                  {t({ en: 'Deal Image', ar: 'صورة العرض' })}
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="deal-image"
                  />
                  <label
                    htmlFor="deal-image"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 neo-brutal-border neo-brutal-shadow-small cursor-pointer hover:bg-gray-200"
                  >
                    <ImageIcon className="w-4 h-4" />
                    {t({ en: 'Choose Image', ar: 'اختر صورة' })}
                  </label>
                  {selectedFile && (
                    <span className="text-sm text-gray-600 font-bold">
                      {selectedFile.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
              >
                {t({ en: 'CANCEL', ar: 'إلغاء' })}
              </Button>
              <Button
                onClick={handleSubmitDeal}
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white neo-brutal-border neo-brutal-shadow-small neo-brutal-text"
              >
                {isSubmitting 
                  ? t({ en: "POSTING...", ar: "جاري النشر..." }) 
                  : t({ en: "POST DEAL", ar: "نشر العرض" })
                }
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}