import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-6 px-4 md:px-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-10 text-center md:text-right">
          
          {/* Brand & Logo */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img 
              src="/logo.png" 
              alt="المهل للنقليات" 
              referrerPolicy="no-referrer"
              className="h-14 w-14 md:h-16 md:w-16 object-cover rounded-xl border border-amber-500/30 shadow-lg" 
            />
            <div>
              <h2 className="text-2xl md:text-xl font-bold text-white tracking-tight mb-1">المهل للنقليات</h2>
              <p className="text-sm md:text-xs text-amber-500 font-medium">الخيار الأول لخدمات النقل في مكة</p>
            </div>
          </div>
          
          {/* Quick Contact & Social */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-slate-400 text-sm max-w-xs">نحن نقدم حلول نقل احترافية وآمنة للأحمال والمعدات الكبيرة.</p>
            <div className="flex gap-4">
              <a href="tel:+9665XXXXXXXX" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all cursor-pointer">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:info@almohal.com" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all cursor-pointer">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#contact" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all cursor-pointer">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1 underline decoration-amber-500/50">موقعنا</span>
              <span className="text-slate-300 text-sm">مكة المكرمة – شارع الحج</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-800"></div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1 underline decoration-amber-500/50">اتصل بنا</span>
              <span className="text-slate-300 text-sm" dir="ltr">+966 5X XXX XXXX</span>
            </div>
          </div>
          
          <div className="text-slate-500 text-sm text-center lg:text-left">
            © {new Date().getFullYear()} شركة المهل للنقليات. جميع الحقوق محفوظة.
          </div>
        </div>
      </div>
    </footer>
  );
}
