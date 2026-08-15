import { useEffect, useState } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { db, safeGetDocs } from '@/lib/firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
}

const defaultImages: GalleryImage[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'نقل معدات ثقيلة' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'نقل بركسات' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1593108620894-39f28df05370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'نقل بضائع' },
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1512403754473-27835f7b9984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'أسطول الشاحنات' },
];

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>(defaultImages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('order', 'asc'));
        const querySnapshot = await safeGetDocs(q);
        if (querySnapshot && !querySnapshot.empty) {
          const fetchedImages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as GalleryImage[];
          setImages(fetchedImages);
        }
      } catch {
        // Keep default gallery images when offline
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
            <span className="text-amber-500 font-bold uppercase tracking-wider text-sm">معرض الأعمال</span>
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 md:mb-6">
            جانب من مشاريعنا وأعمالنا
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            صور تبرز قدراتنا وإمكانياتنا في تنفيذ مختلف مهام النقل الصعبة والمعقدة.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="px-4 md:px-12 relative w-full" dir="ltr">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: true,
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="w-full pt-12 pb-16"
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 30
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40
                }
              }}
            >
              {images.map((image) => (
                <SwiperSlide key={image.id} className="w-[300px] md:w-[400px]">
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-slate-800 shadow-xl border border-slate-700/50" dir="rtl">
                    <img 
                      src={image.imageUrl} 
                      alt={image.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-300 flex items-end p-6">
                      <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-md border-r-4 border-amber-500 pr-3">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
