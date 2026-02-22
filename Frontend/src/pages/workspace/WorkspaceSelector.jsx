import React, { useState } from "react";
import {
  Plus,
  Users,
  ArrowRight,
  Search,
  Building2,
  CheckCircle,
  Mail,
  X,
  Layout,
  Zap,
  Shield,
} from "lucide-react";

const WorkspaceSelector = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  // Mock workspace data (replace with API call)
  const workspaces = [
    {
      id: 1,
      name: "Tech Corp",
      description: "Main company workspace",
      members: 24,
      projects: 12,
      avatar: "TC",
      color: "from-indigo-600 to-cyan-500",
      role: "Admin",
      createdAt: "Jan 2026",
    },
    {
      id: 2,
      name: "Marketing Team",
      description: "Campaigns and content planning",
      members: 8,
      projects: 5,
      avatar: "MT",
      color: "from-purple-600 to-pink-500",
      role: "Member",
      createdAt: "Mar 2026",
    },
    {
      id: 3,
      name: "Personal Projects",
      description: "Side projects and learning",
      members: 1,
      projects: 3,
      avatar: "PP",
      color: "from-green-600 to-emerald-500",
      role: "Owner",
      createdAt: "Feb 2026",
    },
  ];

  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);
    // In production: Redirect to /dashboard with workspace context
    console.log("Selected workspace:", workspace.name);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* --- BACKGROUND DECORATION (Matches Auth Pages) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* --- MAIN CONTAINER --- */}
      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-bold text-3xl shadow-lg shadow-indigo-500/30 mb-4">
            A
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Choose your workspace
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Select a workspace to continue or create a new one to get started.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredWorkspaces.map((workspace) => (
            <div
              key={workspace.id}
              onClick={() => handleSelectWorkspace(workspace)}
              className="group bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 hover:border-indigo-300 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              {/* Workspace Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${workspace.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}
                >
                  {workspace.avatar}
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    workspace.role === "Owner"
                      ? "bg-purple-100 text-purple-700"
                      : workspace.role === "Admin"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {workspace.role}
                </span>
              </div>

              {/* Workspace Info */}
              <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
                {workspace.name}
              </h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                {workspace.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users className="w-3.5 h-3.5" />
                  <span>{workspace.members} members</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Layout className="w-3.5 h-3.5" />
                  <span>{workspace.projects} projects</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">
                  Created {workspace.createdAt}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors duration-200" />
              </div>
            </div>
          ))}

          {/* Create New Workspace Card */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="group bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-5 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-lg bg-slate-200 group-hover:bg-indigo-100 flex items-center justify-center mb-3 transition-colors duration-200">
              <Plus className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 group-hover:text-indigo-700 mb-1">
              Create New Workspace
            </h3>
            <p className="text-sm text-slate-500 text-center">
              Start fresh with a new team space
            </p>
          </button>
        </div>

        {/* Join Workspace Option */}
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-3">Have an invite code?</p>
          <button
            onClick={() => setShowJoinModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Join a Workspace</span>
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h2 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            Why Aether Workspaces?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                Team Collaboration
              </h3>
              <p className="text-xs text-slate-500">
                Work together in real-time with your team
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                Fast & Responsive
              </h3>
              <p className="text-xs text-slate-500">
                Built for speed with zero lag
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                Secure by Default
              </h3>
              <p className="text-xs text-slate-500">
                Enterprise-grade security for your data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CREATE WORKSPACE MODAL --- */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Create Workspace
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="p-6 space-y-5">
              <div>
                <label
                  htmlFor="wsName"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Workspace Name
                </label>
                <input
                  id="wsName"
                  type="text"
                  placeholder="e.g., Acme Inc, Marketing Team"
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="wsDescription"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="wsDescription"
                  rows={3}
                  placeholder="What is this workspace for?"
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="wsVisibility"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Visibility
                </label>
                <select
                  id="wsVisibility"
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="private">Private (Invite only)</option>
                  <option value="public">Public (Anyone can join)</option>
                </select>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="wsTerms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
                />
                <label htmlFor="wsTerms" className="text-sm text-slate-600">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-[#0747a6]/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- JOIN WORKSPACE MODAL --- */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Join Workspace
              </h2>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="p-6 space-y-5">
              <div>
                <label
                  htmlFor="inviteCode"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Invite Code or Link
                </label>
                <input
                  id="inviteCode"
                  type="text"
                  placeholder="e.g., AETHER-XXXX-XXXX"
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Check your email for the invite code from your team admin.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-[#0747a6]/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  Join Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
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
