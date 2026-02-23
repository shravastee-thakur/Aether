import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  Tag,
  MessageSquare,
  Paperclip,
  ChevronDown,
  X,
  Send,
  GripVertical,
  Flag,
  User,
} from "lucide-react";

const ProjectDetail = ({ projectId = "1" }) => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(null);
  const [taskFilter, setTaskFilter] = useState("all");
  const [taskSearch, setTaskSearch] = useState("");
  const [newComment, setNewComment] = useState("");

  // Mock Project Data
  const project = {
    id: projectId,
    name: "Website Redesign",
    description:
      "Complete overhaul of the company website with new branding, improved UX, and mobile responsiveness.",
    dueDate: "2026-03-15",
    progress: 75,
    status: "active",
    color: "indigo",
    members: [
      { id: 1, name: "Alex Morgan", avatar: "AM", role: "Admin" },
      { id: 2, name: "Sarah Chen", avatar: "SC", role: "Designer" },
      { id: 3, name: "Mike Johnson", avatar: "MJ", role: "Developer" },
      { id: 4, name: "Emma Davis", avatar: "ED", role: "Content" },
    ],
  };

  // Mock Tasks Data
  const tasks = [
    {
      id: 1,
      title: "Design new homepage layout",
      description:
        "Create wireframes and high-fidelity mockups for the new homepage.",
      status: "completed",
      priority: "high",
      dueDate: "2026-02-28",
      assignee: { id: 2, name: "Sarah Chen", avatar: "SC" },
      labels: ["design", "ux"],
      comments: 3,
      attachments: 2,
      createdAt: "2026-02-10",
      activity: [
        { id: 1, user: "Sarah Chen", action: "completed task", time: "2h ago" },
        { id: 2, user: "Alex Morgan", action: "added comment", time: "1d ago" },
      ],
    },
    {
      id: 2,
      title: "Implement responsive navigation",
      description:
        "Build mobile-first navigation component with hamburger menu.",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-03-05",
      assignee: { id: 3, name: "Mike Johnson", avatar: "MJ" },
      labels: ["frontend", "mobile"],
      comments: 5,
      attachments: 1,
      createdAt: "2026-02-12",
      activity: [
        {
          id: 1,
          user: "Mike Johnson",
          action: "started working",
          time: "3h ago",
        },
      ],
    },
    {
      id: 3,
      title: "Write new brand copy",
      description:
        "Update all website copy to align with new brand voice guidelines.",
      status: "todo",
      priority: "medium",
      dueDate: "2026-03-10",
      assignee: { id: 4, name: "Emma Davis", avatar: "ED" },
      labels: ["content", "copywriting"],
      comments: 1,
      attachments: 0,
      createdAt: "2026-02-15",
      activity: [],
    },
    {
      id: 4,
      title: "Set up analytics tracking",
      description: "Configure Google Analytics 4 and custom event tracking.",
      status: "todo",
      priority: "low",
      dueDate: "2026-03-12",
      assignee: null,
      labels: ["analytics", "setup"],
      comments: 0,
      attachments: 0,
      createdAt: "2026-02-18",
      activity: [],
    },
    {
      id: 5,
      title: "Cross-browser testing",
      description: "Test website on Chrome, Firefox, Safari, and Edge.",
      status: "blocked",
      priority: "medium",
      dueDate: "2026-03-14",
      assignee: { id: 3, name: "Mike Johnson", avatar: "MJ" },
      labels: ["testing", "qa"],
      comments: 2,
      attachments: 0,
      createdAt: "2026-02-20",
      activity: [
        {
          id: 1,
          user: "Mike Johnson",
          action: "marked as blocked",
          time: "5h ago",
          reason: "Waiting for design assets",
        },
      ],
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      task.description.toLowerCase().includes(taskSearch.toLowerCase());
    const matchesFilter = taskFilter === "all" || task.status === taskFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusConfig = (status) => {
    const configs = {
      todo: {
        label: "To Do",
        color: "bg-slate-100 text-slate-700",
        icon: Clock,
      },
      "in-progress": {
        label: "In Progress",
        color: "bg-blue-100 text-blue-700",
        icon: Clock,
      },
      completed: {
        label: "Completed",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle,
      },
      blocked: {
        label: "Blocked",
        color: "bg-red-100 text-red-700",
        icon: AlertCircle,
      },
    };
    return configs[status] || configs["todo"];
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { label: "High", color: "text-red-600", icon: Flag },
      medium: { label: "Medium", color: "text-yellow-600", icon: Flag },
      low: { label: "Low", color: "text-slate-400", icon: Flag },
    };
    return configs[priority] || configs["medium"];
  };

  // --- SUB-COMPONENTS ---

  const TaskCard = ({ task }) => {
    const statusConfig = getStatusConfig(task.status);
    const priorityConfig = getPriorityConfig(task.priority);
    const StatusIcon = statusConfig.icon;
    const PriorityIcon = priorityConfig.icon;

    return (
      <div
        onClick={() => setShowTaskDetail(task)}
        className="group bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <button className="text-slate-300 hover:text-slate-500 lg:hidden">
              <GripVertical className="w-4 h-4" />
            </button>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}
            >
              <StatusIcon className="w-3 h-3" />
              {statusConfig.label}
            </span>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
          {task.title}
        </h4>
        <p className="text-sm text-slate-500 mb-3 line-clamp-2">
          {task.description}
        </p>

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {task.labels.map((label) => (
              <span
                key={label}
                className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {task.assignee ? (
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-medium">
                  {task.assignee.avatar}
                </div>
                <span>{task.assignee.name.split(" ")[0]}</span>
              </div>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-400">
                <User className="w-3.5 h-3.5" />
                Unassigned
              </span>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PriorityIcon className={`w-3.5 h-3.5 ${priorityConfig.color}`} />
            {task.comments > 0 && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MessageSquare className="w-3.5 h-3.5" />
                {task.comments}
              </span>
            )}
            {task.attachments > 0 && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Paperclip className="w-3.5 h-3.5" />
                {task.attachments}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TaskDetailModal = ({ task, onClose }) => {
    const statusConfig = getStatusConfig(task.status);
    const priorityConfig = getPriorityConfig(task.priority);
    const [commentText, setCommentText] = useState("");
    const [localTask, setLocalTask] = useState(task);

    const handleStatusChange = (newStatus) => {
      setLocalTask({ ...localTask, status: newStatus });
    };

    const handleAddComment = () => {
      if (!commentText.trim()) return;
      // In production: API call to add comment
      setLocalTask({
        ...localTask,
        comments: localTask.comments + 1,
        activity: [
          {
            id: Date.now(),
            user: "You",
            action: "added comment",
            time: "Just now",
          },
          ...localTask.activity,
        ],
      });
      setCommentText("");
    };

    return (
      <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}
              >
                {statusConfig.icon && <statusConfig.icon className="w-3 h-3" />}
                {statusConfig.label}
              </span>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${priorityConfig.color}`}
              >
                {priorityConfig.icon && (
                  <priorityConfig.icon className="w-3.5 h-3.5" />
                )}
                {priorityConfig.label} Priority
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {localTask.title}
                  </h2>
                  <p className="text-slate-600">{localTask.description}</p>
                </div>

                {/* Labels */}
                {localTask.labels.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-slate-400" />
                      Labels
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {localTask.labels.map((label) => (
                        <span
                          key={label}
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    Comments ({localTask.comments})
                  </h4>

                  {/* Comment Input */}
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      You
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        rows={2}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handleAddComment}
                          disabled={!commentText.trim()}
                          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                            commentText.trim()
                              ? "bg-[#0747a6] hover:bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          <Send className="w-4 h-4" />
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Activity/Comments List */}
                  <div className="space-y-4">
                    {localTask.activity.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-medium flex-shrink-0">
                          {item.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm text-slate-900">
                            <span className="font-medium">{item.user}</span>{" "}
                            <span className="text-slate-500">
                              {item.action}
                            </span>
                            {item.reason && (
                              <span className="text-slate-400">
                                : {item.reason}
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Assignee */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    Assignee
                  </h4>
                  {localTask.assignee ? (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium">
                        {localTask.assignee.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {localTask.assignee.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {localTask.assignee.role}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-200">
                      + Assign someone
                    </button>
                  )}
                </div>

                {/* Due Date */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Due Date
                  </h4>
                  <p className="text-sm text-slate-900 p-3 bg-slate-50 rounded-lg">
                    {new Date(localTask.dueDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Status Change */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Update Status
                  </h4>
                  <div className="space-y-2">
                    {["todo", "in-progress", "completed", "blocked"].map(
                      (status) => {
                        const config = getStatusConfig(status);
                        return (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                              localTask.status === status
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {config.icon && (
                                <config.icon className="w-4 h-4" />
                              )}
                              {config.label}
                            </span>
                            {localTask.status === status && (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-200">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors duration-200">
                    <Trash2 className="w-4 h-4" />
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CreateTaskModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      assignee: "",
      labels: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // In production: API call to create task
      console.log("Creating task:", formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">
              Create New Task
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Task Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Design new homepage"
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
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add more details about this task..."
                className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Assign To
              </label>
              <select
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="">Unassigned</option>
                {project.members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Labels (comma separated)
              </label>
              <input
                type="text"
                value={formData.labels}
                onChange={(e) =>
                  setFormData({ ...formData, labels: e.target.value })
                }
                placeholder="e.g., design, frontend, urgent"
                className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-[#0747a6]/30 transition-all duration-300 hover:scale-[1.02]"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // --- MAIN RENDER ---

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Projects</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {project.members.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                title={member.name}
              >
                {member.avatar}
              </div>
            ))}
            {project.members.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-medium border-2 border-white">
                +{project.members.length - 4}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Project Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due{" "}
                  {new Date(project.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {project.name}
              </h1>
              <p className="text-slate-600 max-w-2xl">{project.description}</p>
            </div>

            <div className="w-full lg:w-64">
              <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                <span>Progress</span>
                <span className="font-medium text-slate-900">
                  {project.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${project.color}-500 rounded-full transition-all duration-500`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-white rounded-lg p-1 border border-slate-200 inline-flex">
          {["tasks", "activity", "files"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#0747a6] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "tasks" && ` (${tasks.length})`}
            </button>
          ))}
        </div>

        {/* Tasks View */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={taskFilter}
                    onChange={(e) => setTaskFilter(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="blocked">Blocked</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <button
                  onClick={() => setShowTaskModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0747a6] hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Task</span>
                </button>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">
                    {taskSearch
                      ? `No tasks found for "${taskSearch}"`
                      : "No tasks yet. Create one to get started!"}
                  </p>
                  {!taskSearch && (
                    <button
                      onClick={() => setShowTaskModal(true)}
                      className="mt-4 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      + Create Task
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Task Stats Footer */}
            {filteredTasks.length > 0 && (
              <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-200">
                <span>
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {tasks.filter((t) => t.status === "completed").length}{" "}
                    completed
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {tasks.filter((t) => t.status === "in-progress").length} in
                    progress
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Activity View (Placeholder) */}
        {activeTab === "activity" && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Project Activity
            </h3>
            <p className="text-slate-500 mb-4">
              View the complete history of changes, comments, and updates for
              this project.
            </p>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors duration-200">
              Coming Soon
            </button>
          </div>
        )}

        {/* Files View (Placeholder) */}
        {activeTab === "files" && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <Paperclip className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Project Files
            </h3>
            <p className="text-slate-500 mb-4">
              Upload and manage attachments, documents, and resources for this
              project.
            </p>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors duration-200">
              Coming Soon
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {showTaskModal && (
        <CreateTaskModal onClose={() => setShowTaskModal(false)} />
      )}
      {showTaskDetail && (
        <TaskDetailModal
          task={showTaskDetail}
          onClose={() => setShowTaskDetail(null)}
        />
      )}

      {/* Custom CSS */}
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

        /* Line clamp for descriptions */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
