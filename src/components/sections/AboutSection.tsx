import { CheckCircle2, ShieldCheck, Clock, Users } from 'lucide-react';

export default function AboutSection() {
  const features = [
    { icon: Clock, text: "التزام تام بالمواعيد" },
    { icon: ShieldCheck, text: "أمان عالي للشحنات" },
    { icon: Users, text: "فريق عمل محترف" },
    { icon: CheckCircle2, text: "معدات حديثة" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="w-12 h-1 bg-amber-500 rounded-full" />
              <span className="text-amber-600 font-bold uppercase tracking-wider text-sm">نبذة عنا</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              نحن نقدم أفضل خدمات النقل <span className="text-amber-500">منذ سنوات</span>
            </h2>
            
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              شركة "المهل للنقليات" هي إحدى الشركات الرائدة في مجال النقل البري في مكة المكرمة. نحن متخصصون في تقديم خدمات نقل آمنة وسريعة للمعدات الثقيلة، البركسات، الصبيات، والمواد الإنشائية الكبيرة. 
              نسعى دائماً لتلبية احتياجات عملائنا بأعلى معايير الجودة والاحترافية.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <feature.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="font-bold text-slate-800 text-sm md:text-base">{feature.text}</span>
                </div>
              ))}
            </div>

            <a 
              href="#services" 
              className="inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-amber-500 pb-1 hover:text-amber-600 transition-colors text-sm md:text-base"
            >
              استكشف خدماتنا
            </a>
          </div>

          {/* Image */}
          <div className="relative mt-8 md:mt-0">
            <div className="hidden md:block absolute inset-0 bg-amber-500 rounded-3xl translate-x-4 translate-y-4 -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="شاحنات المهل للنقليات" 
              className="rounded-2xl md:rounded-3xl shadow-xl w-full object-cover h-[350px] md:h-[500px]"
            />
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 left-4 md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl flex items-center gap-3 md:gap-4">
              <div className="text-amber-500">
                <span className="text-4xl md:text-5xl font-black">10+</span>
              </div>
              <div>
                <p className="text-slate-500 text-xs md:text-sm font-bold">سنوات من</p>
                <p className="text-slate-900 font-black text-base md:text-lg">الخبرة والتميز</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
