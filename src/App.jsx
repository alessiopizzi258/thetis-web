import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutWrapper from './components/layout/LayoutWrapper';
import Home from './pages/Home';
import Visioni from './pages/Visioni';
import Articoli from './pages/Articoli';
import ChiSiamo from './pages/ChiSiamo';

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visioni" element={<Visioni />} />
          <Route path="/articoli" element={<Articoli />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;