import { Helmet } from 'react-helmet-async';
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
  return (
    <>
      <Helmet>
        <title>المهل للنقليات وخدمات النقل في مكة | نقل معدات، بركسات، وحديد</title>
        <meta name="description" content="شركة المهل للنقليات في مكة المكرمة. نقدم حلول نقل احترافية وآمنة للأحمال، المعدات، البركسات، والحديد بأحدث الشاحنات. اتصل بنا الآن." />
        <meta name="keywords" content="نقليات مكة, نقل بركسات مكة, نقل حديد مكة, نقل معدات, نقل أحمال كبيرة, شركة نقل مكة" />
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
