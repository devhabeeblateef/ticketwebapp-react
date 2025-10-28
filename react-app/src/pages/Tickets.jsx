import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SESSION_KEY } from "../context/AppContext";

export default function Tickets() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");

  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("open");
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ show: false, ticketId: null });

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    setTickets(all.filter((t) => t.email === session.email));
  }, [session.email]);

  const saveTickets = (updated) => {
    const all = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    const newAll = [
      ...all.filter((t) => t.email !== session.email),
      ...updated.map((t) => ({ ...t, email: session.email })),
    ];
    localStorage.setItem("ticketapp_tickets", JSON.stringify(newAll));
    setTickets(updated);
  };

  const addTicket = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast("Title required", "error");
      return;
    }

    if (isEditMode && editingTicket) {
      // Update existing ticket
      const updated = tickets.map((t) => 
        t.id === editingTicket.id 
          ? { ...t, title, desc, status, updatedAt: new Date().toISOString() }
          : t
      );
      saveTickets(updated);
      addToast("Ticket updated", "success");
      setIsEditMode(false);
      setEditingTicket(null);
    } else {
      // Create new ticket
      const newTicket = {
        id: Date.now(),
        title,
        desc,
        status,
        email: session.email,
        createdAt: new Date().toISOString(),
      };
      const updated = [...tickets, newTicket];
      saveTickets(updated);
      addToast("Ticket created", "success");
    }

    setTitle("");
    setDesc("");
    setStatus("open");
    setShowForm(false);
  };

  const editTicket = (ticket) => {
    setTitle(ticket.title);
    setDesc(ticket.desc || "");
    setStatus(ticket.status);
    setEditingTicket(ticket);
    setIsEditMode(true);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setTitle("");
    setDesc("");
    setStatus("open");
    setEditingTicket(null);
    setIsEditMode(false);
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    const updated = tickets.map((t) => {
      if (t.id !== id) return t;
      const nextStatus =
        t.status === "open"
          ? "in-progress"
          : t.status === "in-progress"
          ? "closed"
          : "open";
      return { ...t, status: nextStatus };
    });
    saveTickets(updated);
    addToast("Status updated", "success");
  };

  const deleteTicket = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    saveTickets(updated);
    addToast("Ticket deleted", "success");
    setConfirmModal({ show: false, ticketId: null });
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const progressTickets = tickets.filter((t) => t.status === "in-progress").length;
  const closedTickets = tickets.filter((t) => t.status === "closed").length;

  return (
    <>
      <section className="max-w-[1440px] mx-auto py-6 md:py-10 px-4 lg:px-8">
        {/* Stats */}
        <div className="flex flex-wrap justify-start items-center gap-x-8 gap-y-2 text-base text-gray-500 mb-8 font-mono tracking-widest bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
          <span className="text-gray-400">
            Total: <strong className="font-bold text-cyan-400">{totalTickets}</strong>
          </span>
          <span className="text-gray-400">
            Open: <strong className="font-bold text-purple-400">{openTickets}</strong>
          </span>
          <span className="text-gray-400">
            In Progress:{" "}
            <strong className="font-bold text-cyan-400">{progressTickets}</strong>
          </span>
          <span className="text-gray-400">
            Closed: <strong className="font-bold text-gray-500">{closedTickets}</strong>
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-cyan-800/50 mb-10 relative z-50">
          <h2 className="text-3xl font-extrabold text-white mb-4 sm:mb-0 tracking-wide">
            Ticket Log // Active
          </h2>

          <div className="flex space-x-4 relative z-50">
            <button
              onClick={() => {
                if (isEditMode) {
                  cancelEdit();
                } else {
                  setShowForm((prev) => !prev);
                }
              }}
              className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30 transform transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-400/40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              {isEditMode ? "Cancel Edit" : showForm ? "Close Form" : "New Ticket"}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Tickets logout button clicked!");
                localStorage.removeItem(SESSION_KEY);
                addToast("Logged out", "success");
                navigate("/");
              }}
              className="px-5 py-2 text-red-400 border border-red-500 rounded-lg hover:bg-red-500/10 transition duration-200 font-semibold cursor-pointer"
              type="button"
              onMouseEnter={(e) => e.target.style.cursor = 'pointer'}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="p-8 mb-8 rounded-2xl border border-cyan-800/50 bg-gray-900/60 backdrop-blur-lg shadow-2xl shadow-cyan-900/30">
            <h3 className="text-2xl font-extrabold mb-6 text-white border-b border-gray-700/50 pb-3">
              {isEditMode ? "System Update // Edit Ticket" : "System Input // Create Ticket"}
            </h3>

            <form onSubmit={addTicket} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-400 mb-1 block">Title</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                  placeholder="Enter title"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-400 mb-1 block">Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-400 mb-1 block">Description</span>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={5}
                  className="appearance-none block w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-base"
                />
              </label>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-5 py-2 text-gray-500 border border-gray-700 rounded-lg hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 font-semibold rounded-lg bg-cyan-500 text-white hover:bg-cyan-400">
                  {isEditMode ? "Update Ticket" : "Execute Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.length > 0 ? (
            tickets.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl border border-gray-700/50 bg-gray-900/60 backdrop-blur-md shadow-xl shadow-cyan-900/20 hover:shadow-cyan-700/30 transition duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1 tracking-wide">
                      <span className="text-white">{t.title}</span>
                    </h4>
                  
                     <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.desc}</p>
                    
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => editTicket(t)}
                      className="p-2 rounded-full text-cyan-400 hover:text-white bg-gray-800/50 hover:bg-cyan-600/30 border border-cyan-800/50 hover:border-cyan-500 transition duration-200"
                      aria-label="Edit ticket"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => setConfirmModal({ show: true, ticketId: t.id })}
                      className="p-2 rounded-full text-red-400 hover:text-white bg-gray-800/50 hover:bg-red-600/30 border border-red-800/50 hover:border-red-500 transition duration-200"
                      aria-label="Delete ticket"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4h-6v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

               
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-300 border border-purple-700 cursor-pointer" onClick={() => toggleStatus(t.id)}>
                        {t.status}
                      </span>

            
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center p-10 border border-dashed border-gray-700/50 rounded-xl">
              Awaiting additional Ticket Data Feed...
            </p>
          )}
        </div>
      </section>

      {/* Confirm Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm z-50">
          <div className="p-8 rounded-xl shadow-2xl max-w-sm w-full bg-gray-900/80 border border-red-800/50">
            <h4 className="text-xl font-bold text-red-400 mb-4 border-b border-red-800 pb-2">
              ALERT // Confirm Action
            </h4>
            <p className="text-gray-300 text-base mb-8">
              System requires confirmation. Are you sure you wish to proceed?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmModal({ show: false, ticketId: null })}
                className="px-5 py-2 text-gray-500 border border-gray-700 rounded-lg hover:bg-gray-800"
              >
                Abort
              </button>
              <button
                onClick={() => deleteTicket(confirmModal.ticketId)}
                className="px-5 py-2 font-semibold rounded-lg bg-red-600 text-white hover:bg-red-500"
              >
                Affirmative
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
