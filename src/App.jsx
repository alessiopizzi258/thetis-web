import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout (Assicurati che i nomi dei file siano corretti)
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import Pagine
import Home from './pages/Home';
import Visioni from './pages/Visioni';
import Articoli from './pages/Articoli';
import ChiSiamo from './pages/ChiSiamo';
import Programmazione from './pages/Programmazione';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simula il caricamento
  }, []);
  if (loading) {
    return (
      <div className="fixed inset-0 bg-midnight z-[200] flex items-center justify-center">
        <h2 className="text-ivory font-serif italic text-2xl animate-pulse tracking-[0.5em]">THETIS</h2>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-ivory">
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
      </div>
    </Router>
  );
}

export default App;