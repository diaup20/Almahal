import { Shield, Zap, Target, Award } from 'lucide-react';

export default function WhyUsSection() {
  const reasons = [
    {
      icon: Zap,
      title: "السرعة في الإنجاز",
      description: "نمتلك أسطولاً حديثاً يضمن وصول شحناتك بأسرع وقت ممكن دون تأخير."
    },
    {
      icon: Shield,
      title: "أمان تام",
      description: "نطبق أعلى معايير السلامة والأمان لحماية شحناتك من أي أضرار أثناء النقل."
    },
    {
      icon: Target,
      title: "دقة في المواعيد",
      description: "الالتزام بالوقت هو من أهم أولوياتنا، نحن نصل إليك في الوقت المحدد تماماً."
    },
    {
      icon: Award,
      title: "احترافية عالية",
      description: "فريق عملنا مدرب ومؤهل للتعامل مع كافة أنواع الشحنات والمعدات المعقدة."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
            لماذا تختار <span className="text-amber-500">المهل للنقليات؟</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            نحن لا ننقل شحنتك فحسب، بل ننقل معها الطمأنينة والراحة، بفضل خبراتنا الطويلة في سوق النقليات.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 text-center hover:-translate-y-1 md:hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-amber-50 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <reason.icon className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4">{reason.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
