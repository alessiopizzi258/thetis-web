import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Errore: " + error.message);
    } else {
      navigate('/admin'); // Se il login è ok, vai alla Dashboard
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-ivory p-10 rounded-sm shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif italic text-midnight">Area Riservata</h1>
          <div className="w-12 h-[1px] bg-gold-custom mx-auto mt-4"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 block mb-2 text-midnight">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-gold-custom outline-none text-midnight"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 block mb-2 text-midnight">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-transparent border-b border-midnight/20 py-2 focus:border-gold-custom outline-none text-midnight"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-midnight text-ivory py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gold-custom transition-all"
          >
            {loading ? 'Verifica in corso...' : 'Entra nella Console'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;