import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SESSION_KEY } from "../context/AppContext";

export default function Dashboard() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
  const tickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
  const userTickets = tickets.filter((t) => t.email === session.email);

  const totalTickets = userTickets.length;
  const openTickets = userTickets.filter((t) => t.status === "open").length;
  const resolvedTickets = userTickets.filter((t) => t.status === "closed").length;

  return (
    <section className="py-6 md:py-10">
    <div className="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8">

    <div className="flex justify-between items-center pb-6 border-b border-cyan-800/50 mb-8 relative z-50">
        <h2 className="text-4xl font-extrabold 
                   bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            System Dashboard
        </h2>
        <div className="relative z-50">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Logout button clicked!"); // Debug log
                localStorage.removeItem(SESSION_KEY);
                addToast("Logged out", "success");
                navigate("/");
              }}
              className="px-5 py-2 text-red-400 border border-red-500 rounded-lg hover:bg-red-500/10 transition duration-200 font-semibold shadow-md shadow-red-900/30 cursor-pointer"
              type="button"
              onMouseEnter={(e) => e.target.style.cursor = 'pointer'}
            >
                Logout
            </button>
        </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

        <div className="p-6 rounded-xl border border-cyan-800/50 bg-gray-900/50 backdrop-blur-sm
                    shadow-xl shadow-cyan-900/30 transition duration-300 hover:shadow-cyan-700/50
                    border-l-4 border-cyan-500 hover:scale-[1.01] cursor-pointer">
            <h3 id="total-tickets" className="text-5xl font-extrabold text-cyan-400 mb-1 [text-shadow:0_0_5px_rgba(0,255,255,0.3)]">{totalTickets}</h3>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-mono">Total tickets</p>
        </div>

        <div className="p-6 rounded-xl border border-purple-800/50 bg-gray-900/50 backdrop-blur-sm
                    shadow-xl shadow-purple-900/30 transition duration-300 hover:shadow-purple-700/50
                    border-l-4 border-purple-500 hover:scale-[1.01] cursor-pointer">
            <h3 id="open-tickets" className="text-5xl font-extrabold text-purple-400 mb-1 [text-shadow:0_0_5px_rgba(255,0,255,0.3)]">{openTickets}</h3>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-mono">Open</p>
        </div>

        <div className="p-6 rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm
                    shadow-xl shadow-gray-900/30 transition duration-300 hover:shadow-gray-700/50
                    border-l-4 border-gray-500 hover:scale-[1.01] cursor-pointer">
            <h3 id="resolved-tickets" className="text-5xl font-extrabold text-gray-400 mb-1">{resolvedTickets}</h3>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-mono">Closed</p>
        </div>
    </div>


    <div className="p-8 rounded-2xl border border-cyan-800/50 bg-gray-900/60 backdrop-blur-lg 
                shadow-2xl shadow-cyan-900/30">
        <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-700/50 pb-3">Quick Actions // Command Center</h3>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            
            <Link to="/tickets" className="w-full sm:w-auto inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg
                                            bg-gradient-to-r from-purple-600 to-cyan-500 text-white 
                                            shadow-lg shadow-cyan-500/30 transform transition duration-300 
                                            hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-400/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Ticket
            </Link>
            
            <Link to="/tickets" className="text-cyan-400 hover:text-cyan-300 font-semibold transition duration-150 py-3 px-2 tracking-wider">
                View All Tickets →
            </Link>
            
        </div>
    </div>

</div>
</section>
  );
}
