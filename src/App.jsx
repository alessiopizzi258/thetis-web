import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient'; // Importa il client che abbiamo creato

// Layout & Pages
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Visioni from './pages/Visioni';
import Articoli from './pages/Articoli';
import Programmazione from './pages/Programmazione';
import ChiSiamo from './pages/ChiSiamo';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

// Componente per proteggere le rotte admin
const ProtectedRoute = ({ children, user, loadingAuth }) => {
  if (loadingAuth) return <div className="h-screen bg-midnight" />; // Mostra uno sfondo invece di nulla
  if (!user) return <Navigate to="/login" replace />;
  return children;
};


function App() {
  const [loading, setLoading] = useState(true); // Loader iniziale sito
  const [user, setUser] = useState(null); // Stato utente reale
  const [loadingAuth, setLoadingAuth] = useState(true); // Stato controllo sessione

  useEffect(() => {
    // 1. Controlla se esiste già una sessione attiva al caricamento
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    };

    checkUser();

    // 2. Ascolta i cambiamenti di autenticazione (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    // 3. Timer per l'animazione d'entrata "Thetis"
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  // Schermata di caricamento "Emotional"
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
        <div className="flex flex-col min-h-screen bg-ivory">
          <Routes>
            {/* Rotta Login */}
            <Route path="/login" element={user ? <Navigate to="/admin" /> : <Login />} />

            {/* Rotte Admin Protette */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute user={user} loadingAuth={loadingAuth}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />
            
            {/* Tutte le altre rotte pubbliche */}
            <Route path="*" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/visioni" element={<Visioni />} />
                    <Route path="/articoli" element={<Articoli />} />
                    <Route path="/programmazione" element={<Programmazione />} />
                    <Route path="/chi-siamo" element={<ChiSiamo />} />
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