import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast("All fields required", "error");
      return;
    }
    if (password.length < 6) {
      addToast("Password must be at least 6 characters", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    if (users.some((u) => u.email === email)) {
      addToast("Account already exists", "error");
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
    addToast("Account created. You can now login.", "success");
    setTimeout(() => navigate("/auth/login"), 800);
  };

  return (
    <>
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-gray-950">

    <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-cyan-800/50 
                bg-gray-900/60 backdrop-blur-lg shadow-2xl shadow-cyan-900/50 
                text-white relative z-10">

        <h2 className="text-3xl font-extrabold text-center mb-8 
                   bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Activate Account Access
        </h2>
        
        <form id="signup-form" onSubmit={handleSubmit} noValidate className="space-y-6">
            
            <label className="block">
                <span className="text-sm font-medium text-gray-400 mb-1 block">Name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="signup-name" required 
                    className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                           bg-gray-800 text-white placeholder-gray-500 transition duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                    placeholder="Your Full Name"/>
                <div className="text-red-500 text-sm mt-1" data-for="signup-name"></div>
            </label>
            
            <label className="block">
                <span className="text-sm font-medium text-gray-400 mb-1 block">Email Address</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="signup-email" required 
                    className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                           bg-gray-800 text-white placeholder-gray-500 transition duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                    placeholder="you@example.com"/>
                <div className="text-red-500 text-sm mt-1" data-for="signup-email"></div>
            </label>
            
            <label className="block">
                <span className="text-sm font-medium text-gray-400 mb-1 block">Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="signup-password" required minLength="6" 
                    className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                           bg-gray-800 text-white placeholder-gray-500 transition duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                    placeholder="Must be at least 6 characters"/>
                <div className="text-red-500 text-sm mt-1" data-for="signup-password"></div>
            </label>
            
            <div className="pt-4"> 
                <button className="w-full py-3 text-lg font-semibold tracking-wider rounded-xl 
                               bg-gradient-to-r from-purple-600 to-cyan-500 text-white 
                               shadow-lg shadow-cyan-500/30 transform transition duration-300 
                               hover:scale-[1.01] hover:shadow-xl hover:shadow-cyan-400/40" 
                        type="submit">
                    Deploy Account
                </button>
            </div>
        </form>
        
        <p className="text-center text-sm mt-8 text-gray-500">
            Already have access? 
            <Link to="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition duration-150">Login to the Matrix</Link>
        </p>
    </div>
</div>
</>
  );
}
