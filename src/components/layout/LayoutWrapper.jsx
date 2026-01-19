// components/layout/LayoutWrapper.jsx
import Header from './Header';
import Footer from './Footer';

const LayoutWrapper = ({ children }) => (
  <div className="bg-ivory min-h-screen flex flex-col font-sans text-midnight">
    <Header />
    <main className="flex-grow pt-20">{children}</main>
    <Footer />
  </div>
);

export default LayoutWrapper;