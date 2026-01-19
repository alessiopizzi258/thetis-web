import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from './lib/supabaseClient';

// Layout & Pages
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Visioni from './pages/Visioni';
import Articoli from './pages/Articoli';
import Programmazione from './pages/Programmazione';
import ChiSiamo from './pages/ChiSiamo';

// Single Pages
import ArticoloSingolo from './pages/ArticoloSingolo';
import EventoSingolo from './pages/EventoSingolo';
import VisioneSingola from './pages/VisioneSingola';

// Admin
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

const ProtectedRoute = ({ children, user, loadingAuth }) => {
  if (loadingAuth) return <div className="fixed inset-0 bg-midnight" />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Componente per animare il cambio pagina
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-ivory selection:bg-gold-custom selection:text-white">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={
            <ProtectedRoute user={user} loadingAuth={loadingAuth}>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Public Routes */}
          <Route path="*" element={
            <>
              <Header />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/chi-siamo" element={<PageWrapper><ChiSiamo /></PageWrapper>} />
                    <Route path="/visioni" element={<PageWrapper><Visioni /></PageWrapper>} />
                    <Route path="/visioni/:id" element={<PageWrapper><VisioneSingola /></PageWrapper>} />
                    <Route path="/articoli" element={<PageWrapper><Articoli /></PageWrapper>} />
                    <Route path="/articoli/:id" element={<PageWrapper><ArticoloSingolo /></PageWrapper>} />
                    <Route path="/programmazione" element={<PageWrapper><Programmazione /></PageWrapper>} />
                    <Route path="/programmazione/:id" element={<PageWrapper><EventoSingolo /></PageWrapper>} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-midnight z-[999] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center"
        >
          <h2 className="text-ivory font-serif italic text-4xl tracking-[0.6em]">THETIS</h2>
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-[1px] bg-gold-custom mt-4"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <ReactLenis root>
      <Router>
        <AppContent />
      </Router>
    </ReactLenis>
  );
}

export default App;