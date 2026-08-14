import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoImg from '../../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'نبذة عنا', path: '/#about' },
    { name: 'الخدمات', path: '/#services' },
    { name: 'المعرض', path: '/#gallery' },
    { name: 'تواصل معنا', path: '/#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center justify-center bg-slate-900/80 border-b border-slate-700 backdrop-blur-md',
        isScrolled ? 'h-16 md:h-20 shadow-lg' : 'h-20 md:h-24'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-3 z-50">
          <img 
            src={logoImg} 
            alt="المهل للنقليات" 
            referrerPolicy="no-referrer"
            className={cn(
              "object-cover rounded-xl border border-amber-500/30 shadow-lg transition-all duration-300",
              isScrolled ? "h-11 w-11 md:h-12 md:w-12" : "h-12 w-12 md:h-14 md:w-14"
            )}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-10 h-10 bg-amber-500 rounded flex items-center justify-center text-slate-900 font-bold text-xl">
            M
          </div>
          <span className={cn(
            "text-white font-bold tracking-tight transition-all duration-300",
            isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
          )}>
            المهل للنقليات
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-8 text-slate-300 text-sm md:text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="hover:text-amber-500 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href="#contact"
              className="bg-amber-500 text-slate-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
            >
              اتصل بنا
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 p-2 bg-slate-800/50 rounded-md border border-slate-700/50 hover:bg-slate-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed top-24 left-4 right-4 bg-white rounded-2xl z-40 flex flex-col p-6 transition-all duration-300 ease-in-out lg:hidden shadow-2xl border border-slate-100',
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <ul className="flex flex-col gap-4 text-base font-bold text-slate-800">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <a
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-amber-500 transition-colors block w-full"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-6 bg-amber-500 text-slate-900 px-6 py-3 rounded-xl font-bold text-center hover:bg-amber-400 transition-colors text-sm"
        >
          <span>اتصل بنا الآن</span>
        </a>
      </div>
    </nav>
  );
}
