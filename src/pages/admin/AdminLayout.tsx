import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LayoutDashboard, MessageSquare, Briefcase, Image as ImageIcon, LogOut, Loader2, Home, Settings, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const localSession = localStorage.getItem('admin_session');
    if (localSession) {
      try {
        setUser(JSON.parse(localSession));
      } catch {
        setUser({ email: 'admin@almohal.com' });
      }
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else if (!localStorage.getItem('admin_session')) {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('admin_session');
    try {
      await signOut(auth);
    } catch {
      // Ignore auth signout errors if unauthenticated
    }
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'الرئيسية', path: '/admin', icon: LayoutDashboard },
    { name: 'الخدمات', path: '/admin/services', icon: Briefcase },
    { name: 'المعرض', path: '/admin/gallery', icon: ImageIcon },
    { name: 'الرسائل', path: '/admin/messages', icon: MessageSquare },
    { name: 'محركات البحث (SEO)', path: '/admin/seo', icon: Search },
    { name: 'الإعدادات', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 right-0 z-10">
        <div className="p-6">
          <h2 className="text-2xl font-black text-white">لوحة التحكم</h2>
          <p className="text-amber-500 text-sm mt-1">المهل للنقليات</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold text-sm',
                  isActive 
                    ? 'bg-amber-500 text-slate-900' 
                    : 'hover:bg-slate-800 hover:text-white'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold text-sm hover:bg-slate-800 hover:text-white"
          >
            <Home className="w-5 h-5" />
            عرض الموقع
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
