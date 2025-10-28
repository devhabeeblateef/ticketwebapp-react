import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Footer from "./components/Footer";

const SESSION_KEY = "ticketapp_session";

function ProtectedRoute({ children }) {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? children : <Navigate to="/auth/login" replace />;
}

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <BrowserRouter>
     <div className="bg-gray-950 text-white font-sans antialiased">

<div className="relative min-h-screen overflow-hidden  m-auto">

    <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,#0f4c75_0%,transparent_50%),radial-gradient(circle_at_bottom_left,#4f378b_0%,transparent_50%)] "></div>
    </div>
    <header className="sticky top-0 z-40 backdrop-blur-md bg-gray-900/50 border-b border-cyan-800/30 shadow-2xl shadow-cyan-900/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            
            <Link to="/" className="text-2xl font-bold tracking-widest text-cyan-400 hover:text-cyan-300 transition duration-300">
                <span className="inline-block text-3xl mr-1 leading-none">⚡</span>TicketApp
            </Link>
            
            <nav className="hidden md:flex space-x-8 items-center" id="main-nav">
            
                <Link to="/" className="text-gray-300 hover:text-cyan-400 font-medium transition duration-200 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
                    Home
                </Link>
                
                <Link to="/auth/login" className="px-4 py-2 text-cyan-400 border border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition duration-200">
                    Login
                </Link>
                
                <Link to="/auth/signup" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transform hover:scale-105 transition duration-300">
                    Get Started
                </Link>

                <Link to="/dashboard" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transform hover:scale-105 transition duration-300">
                    Dashboard
                </Link>

                <Link to="/tickets" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transform hover:scale-105 transition duration-300">
                    Tickets
                </Link>
            </nav>
            
            <button 
              onClick={toggleNav}
              className="md:hidden p-2 rounded-lg text-cyan-400 border border-cyan-700 hover:bg-cyan-700/20 transition duration-200" 
              aria-label="Toggle navigation" 
              aria-expanded={isNavOpen}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isNavOpen 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="px-4 py-4 space-y-4 bg-gray-900/95 backdrop-blur-md border-t border-cyan-800/30">
            <Link 
              to="/" 
              onClick={() => setIsNavOpen(false)}
              className="block text-gray-300 hover:text-cyan-400 font-medium transition duration-200 py-2"
            >
              Home
            </Link>
            
            <Link 
              to="/auth/login" 
              onClick={() => setIsNavOpen(false)}
              className="block px-4 py-2 text-cyan-400 border border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition duration-200 text-center"
            >
              Login
            </Link>
            
            <Link 
              to="/auth/signup" 
              onClick={() => setIsNavOpen(false)}
              className="block px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transition duration-300 text-center"
            >
              Get Started
            </Link>
          </nav>
        </div>
    </header>

      <Routes className="relative z-10 p-8">
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
        />
      </Routes>

    <Footer/>
    </div>
    </div>
    </BrowserRouter>
  );
}
