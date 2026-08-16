import { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink, Building } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Headquarters in Makkah Al-Mukarramah coordinates (approx. Ring Road / Mecca)
const MAKKAH_HQ_COORDS = { lat: 21.3891, lng: 39.8579 };
const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAKKAH_HQ_COORDS.lat},${MAKKAH_HQ_COORDS.lng}`;

function InteractiveMapComponent() {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  return (
    <Map
      defaultCenter={MAKKAH_HQ_COORDS}
      defaultZoom={14}
      mapId="MAKKAH_HQ_MAP"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }}
      gestureHandling="cooperative"
      aria-label="خريطة موقع المهل للنقليات في مكة"
    >
      <AdvancedMarker
        ref={markerRef}
        position={MAKKAH_HQ_COORDS}
        onClick={() => setInfoOpen(!infoOpen)}
        title="مقر شركة المهل للنقليات - مكة المكرمة"
      >
        <Pin background="#f59e0b" glyphColor="#0f172a" borderColor="#0f172a" scale={1.2} />
      </AdvancedMarker>

      {infoOpen && (
        <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)}>
          <div className="p-2 text-right dir-rtl font-sans" dir="rtl">
            <h4 className="font-bold text-slate-900 text-sm mb-1">شركة المهل للنقليات</h4>
            <p className="text-xs text-slate-600 mb-2">مكة المكرمة - المقر الرئيسي للنقليات</p>
            <a
              href={GOOGLE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              <Navigation className="w-3 h-3" />
              <span>الحصول على الاتجاهات</span>
            </a>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
}

export default function LocationMapSection() {
  return (
    <section id="location" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration blur */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-800/40 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <MapPin className="w-4 h-4" />
            <span>موقعنا الفرعي والمقر الرئيسي</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            مقر الشركة في <span className="text-amber-500">مكة المكرمة</span>
          </h2>
          <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            يسعدنا استقبالكم في مقرنا الرئيسي في العاصمة المقدسة مكة المكرمة لتقديم أفضل خدمات نقل المعدات، البركسات، والحديد بأقصى سرعة وأعلى درجات الأمان.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Side Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-slate-800/80 border border-slate-700/60 p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-xl">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Building className="w-6 h-6 text-amber-500" />
                <span>تفاصيل العنوان والاتصال</span>
              </h3>

              <div className="space-y-6 text-slate-200">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-700/40">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-1">العنوان الرسمي</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      المملكة العربية السعودية - مكة المكرمة - المنطقة الصناعية / طريق الدائري
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-700/40">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-1">أوقات العمل والخدمة</h4>
                    <p className="text-slate-300 text-sm">
                      الخدمة متوفرة <span className="text-amber-400 font-bold">24 ساعة / 7 أيام</span> طوال الأسبوع لاستقبال طلبات النقليات العاجلة.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-700/40">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base mb-1">الهاتف المباشر والواتساب</h4>
                    <a
                      href="tel:+966500000000"
                      className="text-amber-400 font-bold text-lg hover:underline dir-ltr inline-block"
                    >
                      +966 50 000 0000
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row gap-3">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3.5 px-5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 text-center"
              >
                <Navigation className="w-5 h-5" />
                <span>الاتجاهات عبر خرائط جوجل</span>
              </a>
              <a
                href="https://maps.google.com/?q=21.3891,39.8579"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                title="فتح الخريطة في تطبيق آخر"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="sr-only">فتح خارجي</span>
              </a>
            </div>
          </div>

          {/* Map Display Container (7 cols) */}
          <div className="lg:col-span-7 h-[420px] md:h-[500px] w-full rounded-3xl overflow-hidden border border-slate-700 shadow-2xl relative bg-slate-950">
            {hasValidKey ? (
              <APIProvider apiKey={API_KEY} version="weekly">
                <InteractiveMapComponent />
              </APIProvider>
            ) : (
              /* Fallback to embedded Google Maps iframe centered on Makkah with guidance */
              <div className="w-full h-full relative">
                <iframe
                  title="موقع المهل للنقليات بمكة المكرمة"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118831.25852431718!2d39.774163999999995!3d21.3890824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21b4ced818775%3A0x98ab2469cf70c9ce!2sMakkah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) opacity(0.95)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl"
                />
                <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs px-3.5 py-2 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>مكة المكرمة - المقر الرئيسي</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
