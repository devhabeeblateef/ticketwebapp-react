import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SESSION_KEY } from "../context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Email and password are required", "error");
      return;
    }
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      addToast("Invalid credentials", "error");
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, token: "mock-" + Date.now() }));
    addToast("Login successful", "success");
    navigate("/dashboard");
  };

  return (
    <>
   <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-gray-950">

    <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl border border-cyan-800/50 
                bg-gray-900/60 backdrop-blur-lg shadow-2xl shadow-cyan-900/50 
                text-white relative z-10">

        <h2 className="text-3xl font-extrabold text-center mb-8 
                   bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Welcome Back to the System
        </h2>
        
        <form id="login-form" onSubmit={handleSubmit} noValidate className="space-y-6">
            
            <label className="block">
                <span className="text-sm font-medium text-gray-400 mb-1 block">Email Address</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="login-email" required 
                    className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                           bg-gray-800 text-white placeholder-gray-500 transition duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                    placeholder="you@example.com" />
                <div className="text-red-500 text-sm mt-1" data-for="login-email"></div>
            </label>
            
            <label className="block">
                <span className="text-sm font-medium text-gray-400 mb-1 block">Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="login-password" required minLength="6" 
                    className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl 
                           bg-gray-800 text-white placeholder-gray-500 transition duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                    placeholder="Enter your confidential access code" />
                <div className="text-red-500 text-sm mt-1" data-for="login-password"></div>
            </label>
            
            <div className="pt-4"> 
                <button className="w-full py-3 text-lg font-semibold tracking-wider rounded-xl 
                               bg-gradient-to-r from-purple-600 to-cyan-500 text-white 
                               shadow-lg shadow-cyan-500/30 transform transition duration-300 
                               hover:scale-[1.01] hover:shadow-xl hover:shadow-cyan-400/40" 
                        type="submit">
                    Authorize Login
                </button>
            </div>
        </form>
        
        <p className="text-center text-sm mt-8 text-gray-500">
            Need system access? 
            <Link to="/auth/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition duration-150"> Initiate Registration</Link>
        </p>
    </div>
</div>
</>
  );
}
