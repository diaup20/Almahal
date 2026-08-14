import { MessageCircle, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 left-4 md:left-6 z-40 flex flex-col gap-3 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <a
        href="https://wa.me/9665XXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="h-12 px-4 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        aria-label="تواصل معنا عبر واتساب"
      >
        <span className="font-bold text-sm">واتساب</span>
        <MessageCircle className="w-5 h-5" />
      </a>
      <a
        href="tel:+9665XXXXXXXX"
        className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 md:hidden"
        aria-label="اتصل بنا"
      >
        <span className="font-bold text-sm">اتصال</span>
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
