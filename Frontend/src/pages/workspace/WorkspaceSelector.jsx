import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Users,
  ArrowRight,
  Search,
  Mail,
  X,
  Layout,
  Zap,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
  Building2,
  Key,
} from "lucide-react";

const WorkspaceSelector = () => {
  // --- Global State ---
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  // --- Form State (Controlled Components) ---
  const [createFormData, setCreateFormData] = useState({
    name: "",
    description: "",
    visibility: "private",
  });
  const [joinFormData, setJoinFormData] = useState({ inviteCode: "" });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // --- Helpers ---
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetForms = () => {
    setCreateFormData({ name: "", description: "", visibility: "private" });
    setJoinFormData({ inviteCode: "" });
    setFormErrors({});
  };

  // --- Effects ---
  useEffect(() => {
    const fetchWorkspaces = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        // Mock Data
        const data = [
          {
            id: "org_123",
            name: "Tech Corp",
            role: "Admin",
            members: 12,
            color: "from-indigo-600 to-cyan-500",
            avatar: "TC",
            lastActive: "2h ago",
          },
        ];
        setWorkspaces(data);
      } catch (error) {
        console.error("Failed to fetch workspaces", error);
        showToast("Failed to load workspaces", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspaces();
  }, []);

  // --- Handlers ---
  const handleSelectWorkspace = useCallback((workspace) => {
    localStorage.setItem("active_organization_id", workspace.id);
    localStorage.setItem("active_organization_name", workspace.name);
    showToast(`Opening ${workspace.name}...`);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);
  }, []);

  // Validation Logic
  const validateCreateForm = (values) => {
    const errors = {};
    if (!values.name?.trim()) errors.name = "Workspace name is required";
    else if (values.name.length < 3)
      errors.name = "Name must be at least 3 characters";
    if (values.description && values.description.length > 200)
      errors.description = "Description too long";
    return errors;
  };

  // const validateJoinForm = (values) => {
  //   const errors = {};
  //   if (!values.inviteCode?.trim()) errors.inviteCode = "Invite code is required";
  //   else if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(values.inviteCode.toUpperCase())) {
  //     errors.inviteCode = "Invalid format (e.g., ABCD-1234-EFGH)";
  //   }
  //   return errors;
  // };

  // Create Workspace Submit
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const errors = validateCreateForm(createFormData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setFormErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API

      const newWorkspace = {
        id: `org_${Date.now()}`,
        name: createFormData.name,
        role: "Owner",
        members: 1,
        color: "from-indigo-600 to-cyan-500",
        avatar: createFormData.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        lastActive: "Just now",
      };

      setWorkspaces((prev) => [newWorkspace, ...prev]);
      setShowCreateModal(false);
      resetForms();
      showToast("Workspace created successfully!");
      setTimeout(() => handleSelectWorkspace(newWorkspace), 500);
    } catch (error) {
      showToast("Failed to create workspace", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Join Workspace Submit
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    const errors = validateJoinForm(joinFormData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setFormErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API

      const joinedWorkspace = {
        id: `org_${Date.now()}`,
        name: "Joined Workspace",
        role: "Member",
        members: 5,
        color: "from-green-600 to-emerald-500",
        avatar: "JW",
        lastActive: "Just now",
      };

      setWorkspaces((prev) => [joinedWorkspace, ...prev]);
      setShowJoinModal(false);
      resetForms();
      showToast("Successfully joined workspace!");
    } catch (error) {
      showToast("Invalid invite code", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter Logic (Re-calculates on every render when searchQuery changes)
  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // --- Render Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center mb-6 animate-pulse">
          <span className="text-white font-bold text-3xl">A</span>
        </div>
        <div className="space-y-4 w-full max-w-md">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-slate-200" />
                <div className="w-16 h-5 rounded bg-slate-200" />
              </div>
              <div className="w-32 h-5 rounded bg-slate-200 mb-2" />
              <div className="w-24 h-4 rounded bg-slate-200" />
            </div>
          ))}
        </div>
        <p className="text-slate-500 font-medium mt-6 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading your workspaces...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in ${
            toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 hover:opacity-80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="w-full max-w-6xl relative z-10">
        {/* --- Header --- */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-bold text-3xl shadow-lg shadow-indigo-500/30 mb-4">
            A
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            {workspaces.length > 0
              ? "Welcome back!"
              : "Let's set up your space"}
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto">
            {workspaces.length > 0
              ? "Select a workspace to continue your work."
              : "You don't belong to any organizations yet. Create one to get started."}
          </p>
        </div>

        {/* --- Empty State --- */}
        {workspaces.length === 0 ? (
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl text-center">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Create Your First Workspace
              </h2>
              <p className="text-slate-500 mb-8">
                Start collaborating with your team in a dedicated space.
              </p>

              {/* <div className="space-y-4">
                <button onClick={() => { resetForms(); setShowCreateModal(true); }} className="w-full py-4 bg-[#0747a6] hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Create New Workspace
                </button>
                <button onClick={() => { resetForms(); setShowJoinModal(true); }} className="w-full py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Key className="w-5 h-5" /> Join with Invite Code
                </button>
              </div> */}

              <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: Users, label: "Team" },
                  { icon: Layout, label: "Projects" },
                  { icon: Shield, label: "Secure" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <Icon className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* --- Selection State --- */
          <>
            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search workspaces..."
                  value={searchQuery} // CONTROLLED
                  onChange={(e) => setSearchQuery(e.target.value)} // UPDATES STATE
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {filteredWorkspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => handleSelectWorkspace(workspace)}
                  className="group text-left bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${workspace.color} flex items-center justify-center text-white font-bold text-xl shadow-md`}
                    >
                      {workspace.avatar}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md uppercase tracking-wide">
                        {workspace.role}
                      </span>
                      <span className="text-xs text-slate-400">
                        {workspace.lastActive}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {workspace.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-5">
                    <Users className="w-4 h-4" /> {workspace.members} members
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                    Open Workspace{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
              <button
                onClick={() => {
                  resetForms();
                  setShowCreateModal(true);
                }}
                className="text-left border-2 border-dashed border-slate-200 rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center hover:bg-indigo-50/50 hover:border-indigo-300 transition-all group min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mb-3 transition-colors">
                  <Plus className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <span className="font-semibold text-slate-600 group-hover:text-indigo-700">
                  Add Workspace
                </span>
              </button>
            </div>

            {filteredWorkspaces.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <p className="text-slate-500">
                  No workspaces found for "{searchQuery}"
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- CREATE MODAL (Controlled Inputs) --- */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowCreateModal(false);
            resetForms();
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Create Workspace
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForms();
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Workspace Name *
                </label>
                <input
                  type="text"
                  value={createFormData.name} // CONTROLLED
                  onChange={(e) => {
                    setCreateFormData({
                      ...createFormData,
                      name: e.target.value,
                    });
                    if (formErrors.name)
                      setFormErrors({ ...formErrors, name: null });
                  }}
                  className={`block w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${formErrors.name ? "border-red-300" : "border-slate-200"}`}
                  placeholder="e.g., Acme Inc"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={createFormData.description} // CONTROLLED
                  onChange={(e) => {
                    setCreateFormData({
                      ...createFormData,
                      description: e.target.value,
                    });
                    if (formErrors.description)
                      setFormErrors({ ...formErrors, description: null });
                  }}
                  className={`block w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none ${formErrors.description ? "border-red-300" : "border-slate-200"}`}
                  placeholder="What is this workspace for?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Visibility
                </label>
                <select
                  value={createFormData.visibility} // CONTROLLED
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      visibility: e.target.value,
                    })
                  }
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="private">🔒 Private</option>
                  <option value="public">🌐 Public</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForms();
                  }}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Workspace"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- JOIN MODAL (Controlled Inputs) --- */}
      {showJoinModal && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowJoinModal(false);
            resetForms();
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Join Workspace
              </h2>
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  resetForms();
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleJoinSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Invite Code *
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={joinFormData.inviteCode} // CONTROLLED
                    onChange={(e) => {
                      setJoinFormData({
                        ...joinFormData,
                        inviteCode: e.target.value,
                      });
                      if (formErrors.inviteCode)
                        setFormErrors({ ...formErrors, inviteCode: null });
                    }}
                    className={`block w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all uppercase tracking-wider ${formErrors.inviteCode ? "border-red-300" : "border-slate-200"}`}
                    placeholder="ABCD-1234-EFGH"
                  />
                </div>
                {formErrors.inviteCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.inviteCode}
                  </p>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowJoinModal(false);
                    resetForms();
                  }}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Join Workspace"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WorkspaceSelector;
