import React from 'react';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, safeGetDoc } from '@/lib/firebase';
import { Loader2, Save, Globe, Type, AlignLeft, Search, Link as LinkIcon, Share2, Image as ImageIcon } from 'lucide-react';

export default function AdminSEO() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    title: 'المهل للنقليات - أفضل خدمات النقل المبرد والجاف',
    description: 'نحن في المهل للنقليات نقدم أفضل خدمات النقل المبرد والجاف لجميع أنحاء المملكة بأعلى معايير الجودة والسرعة.',
    keywords: 'نقل, مبرد, جاف, المهل, نقليات, شحن, لوجستيات, السعودية',
    canonicalUrl: 'https://almahal.vercel.app',
    ogTitle: 'المهل للنقليات',
    ogDescription: 'نحن في المهل للنقليات نقدم أفضل خدمات النقل لجميع أنحاء المملكة.',
    ogImage: '',
  });

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const docRef = doc(db, 'settings', 'seo');
        const docSnap = await safeGetDoc(docRef);
        if (docSnap && docSnap.exists()) {
          setFormData(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch {
        // Keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchSEO();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus('idle');
    try {
      await setDoc(doc(db, 'settings', 'seo'), formData, { merge: true });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error saving SEO settings:", error);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-amber-100 p-3 rounded-xl">
          <Globe className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">محركات البحث (SEO)</h1>
          <p className="text-slate-500 font-medium mt-1">اضبط الكلمات المفتاحية والروابط ومظهر المشاركة على وسائل التواصل.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSave} className="p-8 space-y-10">
          {status === 'success' && (
            <div className="bg-green-50 text-green-600 p-4 rounded-xl font-bold border border-green-100">
              تم حفظ إعدادات محركات البحث بنجاح
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold border border-red-100">
              حدث خطأ أثناء الحفظ
            </div>
          )}
          
          {/* Section 1: Basic SEO */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">أساسيات محركات البحث</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-500" /> عنوان الموقع (Title)
                </label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
                  placeholder="مثال: المهل للنقليات - خيارك الأول للنقل"
                />
                <p className="text-xs text-slate-500 mt-2">يظهر كعنوان رئيسي لصفحتك في نتائج بحث جوجل وعلامات تبويب المتصفح.</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-amber-500" /> وصف الموقع (Meta Description)
                </label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 resize-none"
                  placeholder="اكتب وصفاً جذاباً لشركتك والخدمات التي تقدمها..."
                />
                <p className="text-xs text-slate-500 mt-2">الوصف الذي يظهر أسفل العنوان في نتائج البحث. يُنصح ألا يتجاوز 160 حرفاً.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-500" /> الكلمات المفتاحية (Keywords)
                </label>
                <textarea 
                  rows={2}
                  value={formData.keywords}
                  onChange={e => setFormData({...formData, keywords: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 resize-none"
                  placeholder="نقل, شحن, لوجستيات, مبرد..."
                />
                <p className="text-xs text-slate-500 mt-2">افصل بين الكلمات بفاصلة ( , ). تساعد جوجل على فهم مجال موقعك.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-amber-500" /> الرابط الأساسي (Canonical URL)
                </label>
                <input 
                  type="url" 
                  value={formData.canonicalUrl}
                  onChange={e => setFormData({...formData, canonicalUrl: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 text-left"
                  dir="ltr"
                  placeholder="https://yourdomain.com"
                />
                <p className="text-xs text-slate-500 mt-2">لتجنب تكرار المحتوى في جوجل، ضع رابط موقعك الرسمي هنا.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Open Graph / Social Media */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-amber-500" />
              الشبكات الاجتماعية (OpenGraph)
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-500" /> عنوان المشاركة (OG Title)
                </label>
                <input 
                  type="text" 
                  value={formData.ogTitle}
                  onChange={e => setFormData({...formData, ogTitle: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
                  placeholder="عنوان الموقع عند مشاركته في تويتر وواتساب"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-amber-500" /> وصف المشاركة (OG Description)
                </label>
                <textarea 
                  rows={2}
                  value={formData.ogDescription}
                  onChange={e => setFormData({...formData, ogDescription: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 resize-none"
                  placeholder="الوصف المختصر عند مشاركة الرابط"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-500" /> رابط صورة المشاركة (OG Image URL)
                </label>
                <input 
                  type="url" 
                  value={formData.ogImage}
                  onChange={e => setFormData({...formData, ogImage: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 text-left"
                  dir="ltr"
                  placeholder="https://yourdomain.com/image.jpg"
                />
                <p className="text-xs text-slate-500 mt-2">ضع رابطاً مباشراً للصورة التي تريد أن تظهر عند مشاركة موقعك (يُفضل أبعاد 1200x630).</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button 
              type="submit"
              disabled={saving}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-xl flex items-center gap-2 disabled:opacity-70 transition-colors"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
              حفظ الإعدادات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
