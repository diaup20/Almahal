import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Phone, MapPin, Mail, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'نقل معدات',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', serviceType: 'نقل معدات', message: '' });
    } catch (error) {
      console.error('Error sending message: ', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          
          {/* Contact Info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="w-12 h-1 bg-amber-500 rounded-full" />
              <span className="text-amber-600 font-bold uppercase tracking-wider text-sm">تواصل معنا</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 md:mb-6">
              نحن هنا لخدمتك دائماً
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-8 md:mb-10">
              لا تتردد في التواصل معنا للاستفسار عن خدماتنا أو لطلب تسعيرة خاصة بمشروعك. فريقنا جاهز للرد على جميع استفساراتك.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold mb-1">رقم الهاتف الجوال</p>
                  <p className="text-lg font-black text-slate-900" dir="ltr">+966 5X XXX XXXX</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold mb-1">موقعنا</p>
                  <p className="text-lg font-black text-slate-900">مكة المكرمة – شارع الحج</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold mb-1">البريد الإلكتروني</p>
                  <p className="text-lg font-black text-slate-900">info@almohal.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-2xl font-bold text-white mb-8 relative z-10">اطلب تسعيرة الآن</h3>
            
            {submitStatus === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center relative z-10">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  <Send className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">تم الإرسال بنجاح!</h4>
                <p className="text-slate-300">سنتواصل معك في أقرب وقت ممكن.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 text-amber-500 font-bold text-sm hover:text-amber-400"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-2">الاسم الكريم</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-slate-300 mb-2">رقم الجوال</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-left"
                    placeholder="05X XXX XXXX"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-bold text-slate-300 mb-2">نوع الخدمة</label>
                  <select
                    id="serviceType"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors appearance-none"
                  >
                    <option value="نقل بركسات">نقل بركسات</option>
                    <option value="نقل معدات">نقل معدات</option>
                    <option value="نقل حديد">نقل حديد</option>
                    <option value="نقل صبيات">نقل صبيات</option>
                    <option value="نقل مكيفات">نقل مكيفات</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-300 mb-2">تفاصيل الطلب (اختياري)</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg py-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>إرسال الطلب</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm mt-2">حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر الهاتف.</p>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
