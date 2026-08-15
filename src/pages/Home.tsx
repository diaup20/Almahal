import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { db, safeGetDoc } from '@/lib/firebase';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import GallerySection from '@/components/sections/GallerySection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';

export default function Home() {
  const [seo, setSeo] = useState({
    title: 'المهل للنقليات وخدمات النقل في مكة | نقل معدات، بركسات، وحديد',
    description: 'شركة المهل للنقليات في مكة المكرمة. نقدم حلول نقل احترافية وآمنة للأحمال، المعدات، البركسات، والحديد بأحدث الشاحنات. اتصل بنا الآن.',
    keywords: 'نقليات مكة, نقل بركسات مكة, نقل حديد مكة, نقل معدات, نقل أحمال كبيرة, شركة نقل مكة',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
  });

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const docRef = doc(db, 'settings', 'seo');
        const docSnap = await safeGetDoc(docRef);
        if (docSnap && docSnap.exists()) {
          setSeo(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch {
        // Fallback default SEO is already set
      }
    };
    fetchSEO();
  }, []);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        {seo.ogTitle && <meta property="og:title" content={seo.ogTitle} />}
        {seo.ogDescription && <meta property="og:description" content={seo.ogDescription} />}
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="font-sans antialiased text-slate-900 min-h-screen" dir="rtl">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <WhyUsSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
}
