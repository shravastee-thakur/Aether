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
  HelpCircle,
} from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", icon: Home, href: "/dashboard", active: true },
    { name: "Boards", icon: Layout, href: "/dashboard/boards", active: false },
    {
      name: "Tasks",
      icon: CheckSquare,
      href: "/dashboard/tasks",
      active: false,
    },
    {
      name: "Calendar",
      icon: Calendar,
      href: "/dashboard/calendar",
      active: false,
    },
    {
      name: "Projects",
      icon: Folder,
      href: "/dashboard/projects",
      active: false,
    },
    { name: "Team", icon: Users, href: "/dashboard/team", active: false },
    {
      name: "Automations",
      icon: Zap,
      href: "/dashboard/automations",
      active: false,
    },
  ];

  const secondaryNavigation = [
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
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
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                item.active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${item.active ? "text-indigo-600" : "text-slate-400"}`}
              />
              {item.name}
            </a>
          ))}

          {/* Secondary Navigation */}
          <div className="pt-6 mt-6 border-t border-slate-200">
            {secondaryNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 text-slate-400" />
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer - User Info */}
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

      {/* --- MAIN CONTENT AREA --- */}
      <div className="lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center justify-between h-full px-4 md:px-6">
            {/* Left: Menu Button + Search */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-slate-600"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg w-80">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search boards, tasks, team..."
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right: Notifications + User Menu */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative text-slate-400 hover:text-slate-600 transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Dropdown */}
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

                {/* Dropdown Menu */}
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
                      Settings
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
        <main className="p-4 md:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome back, Alex!
            </h1>
            <p className="text-slate-600">
              Here's what's happening with your projects today.
            </p>
          </div>

          {/* Dashboard Content Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stat Card 1 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">
                  Total Tasks
                </h3>
                <CheckSquare className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">124</p>
              <p className="text-sm text-green-600 mt-2">
                ↑ 12% from last week
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">
                  Active Boards
                </h3>
                <Layout className="w-5 h-5 text-cyan-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">8</p>
              <p className="text-sm text-slate-500 mt-2">
                2 boards due this week
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">
                  Team Members
                </h3>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">24</p>
              <p className="text-sm text-green-600 mt-2">↑ 3 new this month</p>
            </div>
          </div>

          {/* Recent Activity Table Placeholder */}
          <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <p className="text-slate-500 text-sm">
                Your recent activity will appear here.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
