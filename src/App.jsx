import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

// Layout & Pages
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Visioni from './pages/Visioni';
import Articoli from './pages/Articoli';
import Programmazione from './pages/Programmazione';
import ChiSiamo from './pages/ChiSiamo';

// Single Pages (Dettagli)
import ArticoloSingolo from './pages/ArticoloSingolo';
import EventoSingolo from './pages/EventoSingolo';
import VisioneSingola from './pages/VisioneSingola';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

const ProtectedRoute = ({ children, user, loadingAuth }) => {
  if (loadingAuth) return <div className="fixed inset-0 bg-midnight" />; 
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-midnight z-[999] flex items-center justify-center">
        <div className="text-center overflow-hidden">
          <h2 className="text-ivory font-serif italic text-3xl tracking-[0.8em] animate-reveal-text">THETIS</h2>
          <div className="h-[1px] bg-gold-custom w-0 animate-grow-line mt-4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <ReactLenis root>
      <Router>
        <div className="flex flex-col min-h-screen bg-ivory selection:bg-gold-custom selection:text-white">
          <Routes>
            {/* Auth & Admin */}
            <Route path="/login" element={user ? <Navigate to="/admin" /> : <Login />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute user={user} loadingAuth={loadingAuth}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />
            
            {/* Public Layout */}
            <Route path="*" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chi-siamo" element={<ChiSiamo />} />
                    
                    {/* Visioni (Multimedia) */}
                    <Route path="/visioni" element={<Visioni />} />
                    <Route path="/visioni/:id" element={<VisioneSingola />} />
                    
                    {/* Articoli (Rivista) */}
                    <Route path="/articoli" element={<Articoli />} />
                    <Route path="/articoli/:id" element={<ArticoloSingolo />} />
                    
                    {/* Programmazione (Eventi) */}
                    <Route path="/programmazione" element={<Programmazione />} />
                    <Route path="/programmazione/:id" element={<EventoSingolo />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;