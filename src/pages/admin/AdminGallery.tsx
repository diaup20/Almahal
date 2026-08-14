import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Trash2, Loader2, Save, X, Image as ImageIcon } from 'lucide-react';

export default function AdminGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', imageUrl: '', order: 0 });

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, 'gallery'), formData);
      setIsAdding(false);
      setFormData({ title: '', imageUrl: '', order: images.length });
    } catch (error) {
      console.error("Error adding image", error);
    }
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      try {
        await deleteDoc(doc(db, 'gallery', id));
      } catch (error) {
        console.error("Error deleting image", error);
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">إدارة معرض الصور</h1>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-6 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" /> إضافة صورة
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold mb-6">إضافة صورة جديدة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">عنوان الصورة</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">رابط الصورة (URL)</label>
              <input 
                type="url" 
                value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 text-left"
                dir="ltr"
              />
            </div>
            <div className="md:col-span-2">
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
              onClick={handleAdd}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-6 rounded-xl flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> حفظ
            </button>
            <button 
              onClick={() => setIsAdding(false)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-xl flex items-center gap-2"
            >
              <X className="w-5 h-5" /> إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map(image => (
          <div key={image.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group">
            <div className="aspect-[4/3] bg-slate-100 relative">
              {image.imageUrl ? (
                <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-slate-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 mb-1">{image.title}</h3>
              <p className="text-sm font-semibold text-slate-500">الترتيب: {image.order}</p>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 font-semibold bg-white rounded-3xl border border-slate-200">
            لا توجد صور في المعرض حالياً
          </div>
        )}
      </div>
    </div>
  );
}
