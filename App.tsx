import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Skills />
            <Projects />
            <ChatWidget />
            <Footer />
          </div>
        } />
        <Route path="/dashboard" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;