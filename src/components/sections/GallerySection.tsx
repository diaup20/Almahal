import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const fetchedImages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as GalleryImage[];
          setImages(fetchedImages);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-900">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {images.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-slate-800 cursor-pointer">
                <img 
                  src={image.imageUrl} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
