import { useEffect, useState } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { db, safeGetDocs } from '@/lib/firebase';
import { ArrowLeft, Box, Settings, Zap, Wind, Truck, PackageOpen } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

const defaultServices: Service[] = [
  { id: '1', title: 'نقل البركسات', description: 'نقل وتركيب البركسات والمكاتب المتنقلة بأحجامها المختلفة بأمان تام.', iconName: 'Box' },
  { id: '2', title: 'نقل الحديد', description: 'نقل الحديد والمواد الإنشائية الطويلة بمركبات مجهزة وبأعلى درجات الأمان.', iconName: 'Truck' },
  { id: '3', title: 'نقل الصبيات', description: 'نقل الكتل الخرسانية والصبيات الجاهزة بحذر واحترافية إلى مواقع العمل.', iconName: 'PackageOpen' },
  { id: '4', title: 'نقل المولدات', description: 'نقل المولدات الكهربائية الثقيلة والمعدات الحساسة بأسطول حديث ومجهز.', iconName: 'Zap' },
  { id: '5', title: 'نقل المكيفات الكبيرة', description: 'حلول متخصصة لنقل وحدات التكييف المركزية والتجارية للمشاريع الكبرى.', iconName: 'Wind' },
  { id: '6', title: 'نقل المعدات', description: 'خدمات نقل المعدات الثقيلة والآليات الخاصة بالمقاولات والمصانع.', iconName: 'Settings' },
];

const getIcon = (name: string) => {
  switch (name) {
    case 'Box': return Box;
    case 'Truck': return Truck;
    case 'PackageOpen': return PackageOpen;
    case 'Zap': return Zap;
    case 'Wind': return Wind;
    case 'Settings': return Settings;
    default: return Truck;
  }
};

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, 'services'), orderBy('order', 'asc'));
        const querySnapshot = await safeGetDocs(q);
        if (querySnapshot && !querySnapshot.empty) {
          const fetchedServices = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Service[];
          setServices(fetchedServices);
        }
      } catch {
        // Keep defaultServices when offline or Firestore backend is unreachable
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
            <span className="text-amber-600 font-bold uppercase tracking-wider text-sm">خدماتنا</span>
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 md:mb-6">
            حلول نقل متكاملة لتلبية جميع احتياجاتك
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            نحن نقدم مجموعة واسعة من خدمات النقل المتخصصة، مصممة لتوفير أقصى درجات الأمان والكفاءة لشحناتك.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const Icon = getIcon(service.iconName);
              const isPrimary = idx === 0;
              return (
                <div 
                  key={service.id} 
                  className={`bg-white p-6 rounded-xl border-b-4 shadow-sm flex flex-col justify-between transition-transform hover:-translate-y-1 ${
                    isPrimary ? 'border-amber-500' : 'border-slate-900'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <a href="#contact" className="text-amber-600 font-bold text-xs mt-4 hover:underline flex items-center gap-1 w-fit">
                    <span>طلب الخدمة</span>
                    <ArrowLeft className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
