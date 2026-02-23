import React, { useState } from "react";
import {
  Layout,
  CheckSquare,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  Calendar,
  Folder,
  Zap,
  Plus,
  Mail,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [inviteData, setInviteData] = useState({ email: "", role: "member" });

  // Mock Data
  const stats = {
    totalTasks: 124,
    completedTasks: 89,
    teamMembers: 24,
    activeProjects: 8,
  };

  const recentActivity = [
    {
      id: 1,
      user: "Alex Morgan",
      action: "completed task",
      target: "Update homepage design",
      time: "2m ago",
      type: "complete",
    },
    {
      id: 2,
      user: "Sarah Chen",
      action: "commented on",
      target: "Q4 Marketing Plan",
      time: "15m ago",
      type: "comment",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "created project",
      target: "Mobile App Redesign",
      time: "1h ago",
      type: "create",
    },
    {
      id: 4,
      user: "Emma Davis",
      action: "assigned task to",
      target: "You",
      targetItem: "Write API documentation",
      time: "2h ago",
      type: "assign",
    },
    {
      id: 5,
      user: "System",
      action: "backup completed",
      target: "Workspace data",
      time: "4h ago",
      type: "system",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      dueDate: "2026-03-15",
      progress: 75,
      tasks: 24,
      completed: 18,
      status: "active",
      color: "indigo",
    },
    {
      id: 2,
      name: "Mobile App Launch",
      dueDate: "2026-04-01",
      progress: 45,
      tasks: 36,
      completed: 16,
      status: "active",
      color: "cyan",
    },
    {
      id: 3,
      name: "Q2 Marketing Campaign",
      dueDate: "2026-03-30",
      progress: 90,
      tasks: 18,
      completed: 16,
      status: "active",
      color: "purple",
    },
    {
      id: 4,
      name: "Internal Tools Upgrade",
      dueDate: "2026-05-15",
      progress: 20,
      tasks: 42,
      completed: 8,
      status: "planning",
      color: "green",
    },
    {
      id: 5,
      name: "Customer Portal",
      dueDate: "2026-06-01",
      progress: 0,
      tasks: 12,
      completed: 0,
      status: "planning",
      color: "orange",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Alex Morgan",
      email: "alex@company.com",
      role: "Admin",
      avatar: "AM",
      status: "online",
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@company.com",
      role: "Member",
      avatar: "SC",
      status: "online",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Member",
      avatar: "MJ",
      status: "away",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@company.com",
      role: "Member",
      avatar: "ED",
      status: "offline",
    },
  ];

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "projects", name: "Projects", icon: Folder },
    { id: "team", name: "Team", icon: Users },
    { id: "calendar", name: "Calendar", icon: Calendar },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(projectSearch.toLowerCase()),
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "comment":
        return <AlertCircle className="w-4 h-4 text-cyan-500" />;
      case "create":
        return <Plus className="w-4 h-4 text-indigo-500" />;
      case "assign":
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "planning":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getProgressColor = (color) => {
    const colors = {
      indigo: "bg-indigo-500",
      cyan: "bg-cyan-500",
      purple: "bg-purple-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
    };
    return colors[color] || "bg-indigo-500";
  };

  // --- VIEWS ---

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={CheckSquare}
          color="indigo"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Completed"
          value={stats.completedTasks}
          icon={CheckCircle}
          color="green"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Team Members"
          value={stats.teamMembers}
          icon={Users}
          color="cyan"
          trend={{ value: 3, positive: true }}
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Folder}
          color="purple"
          trend={{ value: 2, positive: false }}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-slate-500">{activity.action}</span>{" "}
                  <span className="font-medium text-indigo-600">
                    {activity.target}
                  </span>
                  {activity.targetItem && (
                    <span className="text-slate-500">
                      : {activity.targetItem}
                    </span>
                  )}
                </p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProjectsView = () => (
    <div className="space-y-6">
      {/* Header with Search + Create */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={projectSearch}
            onChange={(e) => setProjectSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
        <button
          onClick={() => setShowProjectModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0747a6] hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            getProgressColor={getProgressColor}
            getStatusColor={getStatusColor}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">
            No projects found matching "{projectSearch}"
          </p>
        </div>
      )}
    </div>
  );

  const TeamView = () => (
    <div className="space-y-6">
      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Members"
          value={stats.teamMembers}
          icon={Users}
          color="indigo"
          compact
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Folder}
          color="cyan"
          compact
        />
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={CheckSquare}
          color="purple"
          compact
        />
      </div>

      {/* Team Members List + Invite Button */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Team Members</h2>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0747a6] hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Invite Member</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-medium text-sm">
                    {member.avatar}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      member.status === "online"
                        ? "bg-green-500"
                        : member.status === "away"
                          ? "bg-yellow-500"
                          : "bg-slate-300"
                    }`}
                  ></span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {member.name}
                  </p>
                  <p className="text-xs text-slate-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    member.role === "Admin"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {member.role}
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PlaceholderView = ({ title, icon: Icon, description }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-md">{description}</p>
      <button className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors duration-200">
        Coming Soon
      </button>
    </div>
  );

  // --- SUB-COMPONENTS ---

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    trend,
    compact = false,
  }) => {
    const colors = {
      indigo: "bg-indigo-100 text-indigo-600",
      green: "bg-green-100 text-green-600",
      cyan: "bg-cyan-100 text-cyan-600",
      purple: "bg-purple-100 text-purple-600",
    };

    return (
      <div
        className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm ${compact ? "p-4" : ""}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div
            className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center`}
          >
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <span
              className={`text-xs font-medium ${trend.positive ? "text-green-600" : "text-red-600"}`}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}%
            </span>
          )}
        </div>
        <p className={`text-slate-500 ${compact ? "text-xs" : "text-sm"}`}>
          {title}
        </p>
        <p
          className={`font-bold text-slate-900 ${compact ? "text-xl" : "text-2xl"} mt-1`}
        >
          {value}
        </p>
      </div>
    );
  };

  const ProjectCard = ({ project, getProgressColor, getStatusColor }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg bg-${project.color}-100 flex items-center justify-center`}
          >
            <Folder className={`w-5 h-5 text-${project.color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
              {project.name}
            </h3>
            <p className="text-xs text-slate-500">
              Due{" "}
              {new Date(project.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
        >
          {project.status}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor(project.color)} rounded-full transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          {project.completed}/{project.tasks} tasks
        </span>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View Tasks
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  // --- MODALS ---

  const CreateProjectModal = () => (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Create New Project
          </h2>
          <button
            onClick={() => setShowProjectModal(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          className="p-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setShowProjectModal(false);
          }}
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Project Name
            </label>
            <input
              type="text"
              placeholder="e.g., Website Redesign, Q4 Campaign"
              className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="What is this project about?"
              className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Priority
              </label>
              <select className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowProjectModal(false)}
              className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-[#0747a6]/30 transition-all duration-300 hover:scale-[1.02]"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const InviteMemberModal = () => (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Invite Team Member
          </h2>
          <button
            onClick={() => setShowInviteModal(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          className="p-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setShowInviteModal(false);
          }}
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={inviteData.email}
                onChange={(e) =>
                  setInviteData({ ...inviteData, email: e.target.value })
                }
                placeholder="colleague@company.com"
                className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Role
            </label>
            <select
              value={inviteData.role}
              onChange={(e) =>
                setInviteData({ ...inviteData, role: e.target.value })
              }
              className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="member">Member - Can view and edit tasks</option>
              <option value="admin">
                Admin - Full access including team management
              </option>
            </select>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-xs text-slate-600">
              <strong>Note:</strong> The invited member will receive an email
              with instructions to join your workspace.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowInviteModal(false)}
              className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-[#0747a6]/30 transition-all duration-300 hover:scale-[1.02]"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // --- RENDER ---

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "projects":
        return <ProjectsView />;
      case "team":
        return <TeamView />;
      case "calendar":
        return (
          <PlaceholderView
            title="Calendar"
            icon={Calendar}
            description="Visualize your tasks and deadlines in calendar view. Coming soon!"
          />
        );
      case "settings":
        return (
          <PlaceholderView
            title="Settings"
            icon={Settings}
            description="Manage your workspace preferences, integrations, and billing. Coming soon!"
          />
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span className="text-xl font-bold text-slate-900">Aether</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeView === item.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${activeView === item.id ? "text-indigo-600" : "text-slate-400"}`}
              />
              {item.name}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors duration-200">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              alt="Avatar"
              className="w-9 h-9 rounded-full bg-slate-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                Alex Morgan
              </p>
              <p className="text-xs text-slate-500 truncate">
                alex@company.com
              </p>
            </div>
            <LogOut className="w-4 h-4 text-slate-400 hover:text-red-600 transition-colors duration-200" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center justify-between h-full px-4 md:px-6">
            {/* Left: Menu + Search */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-slate-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg w-80">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tasks, projects, team..."
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right: Notifications + User Menu */}
            <div className="flex items-center gap-4">
              <button className="relative text-slate-400 hover:text-slate-600 transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors duration-200"
                >
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full bg-slate-200"
                  />
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900">
                        Alex Morgan
                      </p>
                      <p className="text-xs text-slate-500">alex@company.com</p>
                    </div>
                    <a
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Profile
                    </a>
                    <a
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Workspace Settings
                    </a>
                    <a
                      href="/dashboard/billing"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Billing
                    </a>
                    <div className="border-t border-slate-100"></div>
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-1 capitalize">
              {activeView}
            </h1>
            <p className="text-slate-600 text-sm">
              {activeView === "dashboard" &&
                "Here's what's happening with your projects today."}
              {activeView === "projects" &&
                "Manage and track all your projects in one place."}
              {activeView === "team" && "Invite and manage your team members."}
              {activeView === "calendar" &&
                "Visualize your schedule and deadlines."}
              {activeView === "settings" &&
                "Configure your workspace preferences."}
            </p>
          </div>

          {/* Dynamic View Content */}
          {renderView()}
        </main>
      </div>

      {/* Modals */}
      {showProjectModal && <CreateProjectModal />}
      {showInviteModal && <InviteMemberModal />}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
