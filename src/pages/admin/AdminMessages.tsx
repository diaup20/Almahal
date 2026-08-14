import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      await updateDoc(doc(db, 'messages', id), {
        status: currentStatus === 'new' ? 'read' : 'new'
      });
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (error) {
        console.error("Error deleting message", error);
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">الرسائل والطلبات</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-500">حالة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500">الاسم</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500">الجوال</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500">الخدمة المطلوبة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500">الرسالة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500">التاريخ</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 w-24">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {messages.map(msg => (
              <tr key={msg.id} className={`hover:bg-slate-50 transition-colors ${msg.status === 'new' ? 'bg-amber-50/30' : ''}`}>
                <td className="px-6 py-4">
                  <button onClick={() => toggleStatus(msg.id, msg.status)} title="تغيير الحالة">
                    {msg.status === 'new' ? (
                      <Circle className="w-6 h-6 text-amber-500 fill-amber-500" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-slate-300" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">{msg.name}</td>
                <td className="px-6 py-4 font-semibold text-slate-700" dir="ltr">{msg.phone}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <span className="bg-slate-100 px-3 py-1 rounded-full">{msg.serviceType}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title={msg.message}>{msg.message || '-'}</td>
                <td className="px-6 py-4 text-sm text-slate-500" dir="ltr">
                  {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString('ar-SA') : ''}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(msg.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500 font-semibold">لا توجد رسائل حالياً</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
