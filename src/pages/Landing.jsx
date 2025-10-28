import React from "react";
import { Link } from "react-router-dom";
import WaveBackground from "../components/hero-wave.jsx";


const HERO_BG = "bg-gray-900"; 
const WAVE_FILL_AND_FEATURE_BG = "#0a0a0a"; 
export default function Landing() {
  return (
    <>
      
      <section className={`relative min-h-[600px] pb-52 lg:pb-64 overflow-hidden
                          ${HERO_BG} text-white border-b border-cyan-800/50`}>
        
        <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none z-0">
          <div className="absolute top-[-5%] left-[5%] w-72 h-72 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-pulse-slow" aria-hidden="true"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-pulse-slow animation-delay-3000" aria-hidden="true"></div>
        </div>

        <WaveBackground fillColor={WAVE_FILL_AND_FEATURE_BG} /> 

        <div className="max-w-[1440px] mx-auto px-4 pt-24 text-center relative z-10">
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4
                         bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400
                         [text-shadow:0_0_8px_rgba(0,255,255,0.4)]">
            TicketApp
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
            Manage support tickets in one place. Fast. Simple. Next-Gen.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link className="py-3 px-8 text-lg font-semibold rounded-full transform transition duration-300
                          bg-white text-gray-900 shadow-2xl shadow-cyan-400/50 hover:bg-gray-200 hover:scale-105"
               to="/auth/login">
              Continue
            </Link>
            
            <Link className="py-3 px-8 text-lg font-semibold rounded-full transform transition duration-300
                          border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
               to="/auth/signup">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-950 py-16 md:py-24 relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          {/* Feature 1 */}
          <div className="p-8 rounded-2xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm
                          shadow-xl shadow-purple-900/30 transition duration-300 group
                          hover:border-purple-500/70 hover:shadow-purple-700/40 transform hover:-translate-y-1">
            <span className="text-4xl text-purple-400 mb-4 block transition duration-300 group-hover:scale-110" aria-hidden="true">🔒</span>
            <h3 className="text-xl font-bold mb-2 text-white transition duration-300 group-hover:text-purple-400">Secure Auth</h3>
            <p className="text-gray-400 font-light">
              Leveraging robust, encrypted session tokens for seamless access.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm
                          shadow-xl shadow-cyan-900/30 transition duration-300 group
                          hover:border-cyan-500/70 hover:shadow-cyan-700/40 transform hover:-translate-y-1">
            <span className="text-4xl text-cyan-400 mb-4 block transition duration-300 group-hover:scale-110" aria-hidden="true">📝</span>
            <h3 className="text-xl font-bold mb-2 text-white transition duration-300 group-hover:text-cyan-400">Full CRUD</h3>
            <p className="text-gray-400 font-light">
              Intuitive controls to create, view, edit, and delete tickets instantly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm
                          shadow-xl shadow-indigo-900/30 transition duration-300 group
                          hover:border-indigo-500/70 hover:shadow-indigo-700/40 transform hover:-translate-y-1">
            <span className="text-4xl text-indigo-400 mb-4 block transition duration-300 group-hover:scale-110" aria-hidden="true">📱</span>
            <h3 className="text-xl font-bold mb-2 text-white transition duration-300 group-hover:text-indigo-400">Responsive</h3>
            <p className="text-gray-400 font-light">
              Optimized for every screen. From desktop arrays to pocket devices.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}