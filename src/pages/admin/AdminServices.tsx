import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Pencil, Trash2, Loader2, Save, X, Box, Truck, PackageOpen, Zap, Wind, Settings } from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', description: '', iconName: 'Truck', order: 0 });

  const iconOptions = [
    { value: 'Truck', label: 'شاحنة' },
    { value: 'Box', label: 'صندوق' },
    { value: 'PackageOpen', label: 'صندوق مفتوح' },
    { value: 'Zap', label: 'طاقة/كهرباء' },
    { value: 'Wind', label: 'تكييف' },
    { value: 'Settings', label: 'معدات' }
  ];

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, () => {
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, 'services'), formData);
      setIsAdding(false);
      setFormData({ title: '', description: '', iconName: 'Truck', order: services.length });
    } catch (error) {
      console.error("Error adding service", error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateDoc(doc(db, 'services', id), formData);
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating service", error);
    }
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      try {
        await deleteDoc(doc(db, 'services', id));
      } catch (error) {
        console.error("Error deleting service", error);
      }
    }
  };

  const startEdit = (service: any) => {
    setFormData({ title: service.title, description: service.description, iconName: service.iconName, order: service.order });
    setIsEditing(service.id);
    setIsAdding(false);
  };

  const startAdd = () => {
    setFormData({ title: '', description: '', iconName: 'Truck', order: services.length });
    setIsAdding(true);
    setIsEditing(null);
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">إدارة الخدمات</h1>
        {!isAdding && !isEditing && (
          <button 
            onClick={startAdd}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-6 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" /> إضافة خدمة
          </button>
        )}
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold mb-6">{isAdding ? 'إضافة خدمة جديدة' : 'تعديل الخدمة'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">اسم الخدمة</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">الأيقونة</label>
              <select 
                value={formData.iconName}
                onChange={e => setFormData({...formData, iconName: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              >
                {iconOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">الوصف</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">الترتيب</label>
              <input 
                type="number" 
                value={formData.order}
                onChange={e => setFormData({...formData, order: Number(e.target.value)})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => isAdding ? handleAdd() : handleUpdate(isEditing!)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-6 rounded-xl flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> حفظ
            </button>
            <button 
              onClick={() => { setIsAdding(false); setIsEditing(null); }}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-xl flex items-center gap-2"
            >
              <X className="w-5 h-5" /> إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-500">اسم الخدمة</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500">الوصف</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 w-24">الترتيب</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-500 w-32">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map(service => (
              <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{service.title}</td>
                <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-xs">{service.description}</td>
                <td className="px-6 py-4 font-bold text-slate-700">{service.order}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => startEdit(service)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-semibold">لا توجد خدمات مضافة حالياً</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
