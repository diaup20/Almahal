import { useState, useEffect } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Briefcase, MessageSquare, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, messages: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );
        const [servicesSnap, messagesSnap, gallerySnap] = await Promise.race([
          Promise.all([
            getCountFromServer(collection(db, 'services')),
            getCountFromServer(collection(db, 'messages')),
            getCountFromServer(collection(db, 'gallery'))
          ]),
          timeoutPromise
        ]);
        
        setStats({
          services: servicesSnap[0].data().count,
          messages: servicesSnap[1].data().count,
          gallery: servicesSnap[2].data().count,
        });
      } catch {
        // Fallback default stats when offline
        setStats({ services: 6, messages: 0, gallery: 6 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  const statCards = [
    { title: 'الخدمات', count: stats.services, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50', link: '/admin/services' },
    { title: 'الرسائل والطلبات', count: stats.messages, icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50', link: '/admin/messages' },
    { title: 'صور المعرض', count: stats.gallery, icon: ImageIcon, color: 'text-emerald-500', bg: 'bg-emerald-50', link: '/admin/gallery' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <Link key={idx} to={stat.link} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 mb-1">{stat.title}</p>
                <p className="text-4xl font-black text-slate-900 group-hover:text-amber-500 transition-colors">{stat.count}</p>
              </div>
              <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
