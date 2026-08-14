import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Truck, Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(from, { replace: true });
      } else {
        setInitLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate, from]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      // Magic bypass for user requested credentials
      if (email.toLowerCase().trim() === 'abdsharki20@gmail.com' && password === 'Admin1234') {
        try {
          const randomEmail = `admin_${Date.now()}@almohal.com`;
          await createUserWithEmailAndPassword(auth, randomEmail, 'Admin1234');
          navigate(from, { replace: true });
          return;
        } catch (err: any) {
          setError('حدث خطأ في النظام المؤقت: ' + err.message);
          setLoading(false);
          return;
        }
      }

      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('البريد الإلكتروني مستخدم بالفعل');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else if (err.code === 'auth/weak-password') {
        setError('كلمة المرور ضعيفة جداً');
      } else {
        setError('حدث خطأ أثناء المصادقة: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('يرجى كتابة البريد الإلكتروني أولاً في الحقل المخصص لإرسال رابط استعادة كلمة المرور.');
      return;
    }
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح!');
    } catch (err: any) {
      console.error(err);
      setError('حدث خطأ أثناء محاولة إرسال رابط الاستعادة.');
    } finally {
      setLoading(false);
    }
  };

  if (initLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4" dir="rtl">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
        <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Truck className="w-8 h-8 text-slate-900" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">
          {isRegistering ? 'إنشاء حساب جديد' : 'تسجيل الدخول للإدارة'}
        </h1>
        <p className="text-slate-500 text-sm font-semibold mb-8">خاص بمديري شركة المهل للنقليات</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-bold p-4 rounded-xl mb-4">
            {error}
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-50 text-green-600 text-sm font-bold p-4 rounded-xl mb-4">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5 text-right">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                placeholder="admin@almohal.com"
                dir="ltr"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700">كلمة المرور</label>
              {!isRegistering && (
                <button 
                  type="button" 
                  onClick={handleResetPassword}
                  className="text-xs text-amber-600 hover:text-amber-700 font-bold"
                >
                  نسيت كلمة المرور؟
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-left"
                placeholder="••••••••"
                dir="ltr"
                minLength={6}
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 rounded-xl transition-colors disabled:opacity-70 mt-2 flex justify-center items-center h-[56px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRegistering ? 'إنشاء حساب' : 'تسجيل الدخول')}
          </button>
        </form>
        
        <div className="mt-6 text-sm">
          <button 
            type="button" 
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
              setSuccessMsg('');
            }}
            className="text-slate-500 hover:text-amber-600 font-bold flex items-center justify-center gap-2 mx-auto"
          >
            {isRegistering ? 'لدي حساب بالفعل، تسجيل الدخول' : 'إنشاء حساب مدير جديد'}
          </button>
        </div>
      </div>
    </div>
  );
}
