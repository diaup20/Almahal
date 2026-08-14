import { ArrowLeft, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] lg:h-screen w-full flex items-center justify-start overflow-hidden bg-slate-900 pt-16">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-slate-800" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1e293b 0%, #0f172a 100%)', opacity: 0.8 }} />
      <div className="absolute inset-0 bg-gradient-to-l from-slate-900/20 via-slate-900/60 to-slate-900 z-10" />
      
      {/* Background Graphic */}
      <div className="hidden lg:flex absolute left-20 top-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-slate-700/30 rounded-2xl border border-slate-500/30 z-0 items-center justify-center">
         <div className="text-slate-500 italic text-6xl opacity-20 transform -rotate-12">AL MAHAL</div>
      </div>

      <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-20">
        <div className="max-w-2xl">
          <div className="bg-amber-500/10 border-r-4 border-amber-500 text-amber-500 px-4 py-1 text-sm mb-4 inline-block font-bold">
            نقل ثقيل - مكة المكرمة
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6">
            المهل للنقليات وخدمات النقل <br />
            <span className="text-amber-500">في قلب مكة</span>
          </h1>
          
          <p className="text-slate-300 text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-lg leading-relaxed">
            حلول نقل احترافية وآمنة للأحمال والمعدات والمواد الكبيرة. نضمن لك وصول شحناتك بأمان وفي الوقت المحدد.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/9665XXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-500 text-slate-900 px-8 py-3 rounded-lg font-bold text-lg flex justify-center items-center gap-2 hover:bg-amber-400 transition-colors"
            >
              <span>تواصل عبر واتساب</span>
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="#contact" 
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-bold text-lg text-center transition-colors"
            >
              اطلب خدمة نقل
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
