import React from 'react';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, safeGetDoc } from '@/lib/firebase';
import { Loader2, Save, Phone, MessageCircle, MapPin, Building2 } from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    phone: '',
    whatsapp: '',
    address: '',
    mapUrl: '',
    email: 'info@almohal.com',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'siteInfo');
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
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus('idle');
    try {
      await setDoc(doc(db, 'settings', 'siteInfo'), formData);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black text-slate-900 mb-8">إعدادات الموقع</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSave} className="p-8 space-y-6">
          {status === 'success' && (
            <div className="bg-green-50 text-green-600 p-4 rounded-xl font-bold border border-green-100">
              تم حفظ الإعدادات بنجاح
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold border border-red-100">
              حدث خطأ أثناء الحفظ
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" /> رقم الجوال
              </label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 text-left"
                dir="ltr"
                placeholder="+966 5X XXX XXXX"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-500" /> رقم الواتساب
              </label>
              <input 
                type="text" 
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 text-left"
                dir="ltr"
                placeholder="9665XXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-500" /> البريد الإلكتروني
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 text-left"
                dir="ltr"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" /> العنوان التفصيلي
              </label>
              <textarea 
                rows={2}
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 resize-none"
                placeholder="مكة المكرمة - شارع الحج..."
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit"
              disabled={saving}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-xl flex items-center gap-2 disabled:opacity-70 transition-colors"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
