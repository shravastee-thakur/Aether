import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  X,
  Flag,
  Calendar,
  Users,
  Search,
  ChevronDown,
  ArrowLeft,
  Settings,
  GripVertical,
  CheckCircle,
  MessageSquare,
  Paperclip,
} from "lucide-react";

// --- SORTABLE CARD COMPONENT ---

const SortableCard = ({ card, columnId, onCardClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "card", card, columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onCardClick(card, columnId)}
      className={`group bg-white rounded-lg border border-slate-200 p-3 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? "rotate-2 shadow-xl border-indigo-400" : ""
      }`}
    >
      {/* Labels */}
      {card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.labels.slice(0, 3).map((label) => (
            <span
              key={label}
              className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded"
            >
              {label}
            </span>
          ))}
          {card.labels.length > 3 && (
            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
              +{card.labels.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h4 className="text-sm font-medium text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
        {card.title}
      </h4>

      {/* Priority */}
      <div className="mb-2">
        <PriorityBadge priority={card.priority} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {card.assignee ? (
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-medium">
              {card.assignee.avatar}
            </div>
          ) : (
            <Users className="w-3.5 h-3.5 text-slate-400" />
          )}
          {card.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(card.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {card.comments > 0 && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MessageSquare className="w-3.5 h-3.5" />
              {card.comments}
            </span>
          )}
          {card.attachments > 0 && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Paperclip className="w-3.5 h-3.5" />
              {card.attachments}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SORTABLE COLUMN COMPONENT ---

const SortableColumn = ({
  column,
  children,
  onAddCard,
  onColumnClick,
  showAddCard,
  setShowAddCard,
  newCardTitle,
  setNewCardTitle,
  handleAddCard,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "column", column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const colorConfigs = {
    slate: "border-slate-300 bg-slate-50",
    blue: "border-blue-300 bg-blue-50",
    yellow: "border-yellow-300 bg-yellow-50",
    green: "border-green-300 bg-green-50",
    purple: "border-purple-300 bg-purple-50",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-shrink-0 w-80 max-h-full flex flex-col"
    >
      {/* Column Header */}
      <div
        {...attributes}
        {...listeners}
        className={`flex items-center justify-between p-3 rounded-t-lg border-t-2 ${colorConfigs[column.color]} bg-white border border-slate-200 border-b-0 mb-3 cursor-grab active:cursor-grabbing`}
      >
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="w-4 h-4 text-slate-400 hidden lg:block" />
          <h3 className="text-sm font-semibold text-slate-900">
            {column.title}
          </h3>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
            {children.length}
          </span>
        </div>

        <button
          onClick={() => onColumnClick(column.id)}
          className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors duration-200"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-slate-50 rounded-lg border border-slate-200 min-h-[200px]">
        <SortableContext
          items={children.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>

        {/* Add Card Form */}
        {showAddCard === column.id ? (
          <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
            <textarea
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Enter card title..."
              rows={2}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddCard(column.id);
                  setNewCardTitle("");
                }
              }}
            />
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => {
                  handleAddCard(column.id);
                  setNewCardTitle("");
                }}
                className="px-3 py-1.5 bg-[#0747a6] hover:bg-indigo-600 text-white text-xs font-medium rounded transition-colors duration-200"
              >
                Add Card
              </button>
              <button
                onClick={() => {
                  setShowAddCard(null);
                  setNewCardTitle("");
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddCard(column.id)}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Card</span>
          </button>
        )}
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const PriorityBadge = ({ priority }) => {
  const configs = {
    high: { color: "text-red-600 bg-red-50", icon: Flag },
    medium: { color: "text-yellow-600 bg-yellow-50", icon: Flag },
    low: { color: "text-slate-400 bg-slate-50", icon: Flag },
  };
  const config = configs[priority] || configs.medium;
  const Icon = config.icon;

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {priority}
    </span>
  );
};

const CardDetailModal = ({ card, columnId, onClose, onSave, onDelete }) => {
  const [editedCard, setEditedCard] = useState(card);
  const [commentText, setCommentText] = useState("");

  const handleSave = () => {
    onSave(editedCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <PriorityBadge priority={editedCard.priority} />
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
              Title
            </label>
            <input
              type="text"
              value={editedCard.title}
              onChange={(e) =>
                setEditedCard({ ...editedCard, title: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
              Description
            </label>
            <textarea
              value={editedCard.description}
              onChange={(e) =>
                setEditedCard({ ...editedCard, description: e.target.value })
              }
              rows={4}
              placeholder="Add a more detailed description..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none"
            />
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                Priority
              </label>
              <select
                value={editedCard.priority}
                onChange={(e) =>
                  setEditedCard({ ...editedCard, priority: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={editedCard.dueDate}
                onChange={(e) =>
                  setEditedCard({ ...editedCard, dueDate: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-2">
              Labels
            </label>
            <div className="flex flex-wrap gap-2">
              {editedCard.labels.map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full flex items-center gap-2"
                >
                  {label}
                  <button
                    onClick={() =>
                      setEditedCard({
                        ...editedCard,
                        labels: editedCard.labels.filter((l) => l !== label),
                      })
                    }
                    className="hover:text-indigo-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-slate-200 transition-colors duration-200">
                + Add Label
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => onDelete(columnId, card.id)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete Card
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#0747a6] hover:bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN KANBAN BOARD COMPONENT ---

const KanbanBoard = ({ boardId = "1" }) => {
  const [columns, setColumns] = useState([
    {
      id: "col-1",
      title: "To Do",
      color: "slate",
      cards: [
        {
          id: "card-1",
          title: "Research competitors",
          description: "Analyze top 5 competitors in the market",
          priority: "medium",
          dueDate: "2026-03-10",
          assignee: { name: "Alex Morgan", avatar: "AM" },
          labels: ["research", "strategy"],
          comments: 2,
          attachments: 1,
        },
        {
          id: "card-2",
          title: "Create wireframes",
          description: "Low-fidelity wireframes for main pages",
          priority: "high",
          dueDate: "2026-03-12",
          assignee: { name: "Sarah Chen", avatar: "SC" },
          labels: ["design", "ux"],
          comments: 5,
          attachments: 3,
        },
      ],
    },
    {
      id: "col-2",
      title: "In Progress",
      color: "blue",
      cards: [
        {
          id: "card-3",
          title: "Design homepage mockup",
          description: "High-fidelity design in Figma",
          priority: "high",
          dueDate: "2026-03-15",
          assignee: { name: "Sarah Chen", avatar: "SC" },
          labels: ["design", "ui"],
          comments: 8,
          attachments: 5,
        },
      ],
    },
    {
      id: "col-3",
      title: "Review",
      color: "yellow",
      cards: [],
    },
    {
      id: "col-4",
      title: "Done",
      color: "green",
      cards: [
        {
          id: "card-4",
          title: "Project kickoff meeting",
          description: "Initial team alignment session",
          priority: "high",
          dueDate: "2026-03-01",
          assignee: { name: "Alex Morgan", avatar: "AM" },
          labels: ["meeting"],
          comments: 1,
          attachments: 2,
        },
      ],
    },
  ]);

  const [activeId, setActiveId] = useState(null);
  const [showCardDetail, setShowCardDetail] = useState(null);
  const [showAddCard, setShowAddCard] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [boardTitle, setBoardTitle] = useState("Product Launch");

  // dnd-kit sensors (pointer + keyboard)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Prevent accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Find card by ID
  const findCard = (id) => {
    for (const column of columns) {
      const card = column.cards.find((c) => c.id === id);
      if (card) return { card, column };
    }
    return null;
  };

  // Handle drag start
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handle drag over (detect collision)
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Card over column
    if (activeData?.type === "card" && overData?.type === "column") {
      const { card: activeCard, column: sourceColumn } = findCard(activeId);
      const targetColumn = columns.find((c) => c.id === overId);

      if (!sourceColumn || !targetColumn || sourceColumn.id === targetColumn.id)
        return;

      setColumns((prev) => {
        const newColumns = prev.map((col) => {
          if (col.id === sourceColumn.id) {
            return {
              ...col,
              cards: col.cards.filter((c) => c.id !== activeId),
            };
          }
          if (col.id === targetColumn.id) {
            return {
              ...col,
              cards: [...col.cards, activeCard],
            };
          }
          return col;
        });
        return newColumns;
      });
    }

    // Card over card (reorder)
    if (activeData?.type === "card" && overData?.type === "card") {
      const { card: activeCard, column: sourceColumn } = findCard(activeId);
      const { column: targetColumn } = findCard(overId);

      if (!sourceColumn || !targetColumn) return;

      if (sourceColumn.id === targetColumn.id) {
        // Same column - reorder
        const oldIndex = sourceColumn.cards.findIndex((c) => c.id === activeId);
        const newIndex = targetColumn.cards.findIndex((c) => c.id === overId);

        setColumns((prev) =>
          prev.map((col) => {
            if (col.id === sourceColumn.id) {
              return {
                ...col,
                cards: arrayMove(col.cards, oldIndex, newIndex),
              };
            }
            return col;
          }),
        );
      } else {
        // Different column - move
        setColumns((prev) => {
          const newColumns = prev.map((col) => {
            if (col.id === sourceColumn.id) {
              return {
                ...col,
                cards: col.cards.filter((c) => c.id !== activeId),
              };
            }
            if (col.id === targetColumn.id) {
              const overIndex = targetColumn.cards.findIndex(
                (c) => c.id === overId,
              );
              const newCards = [...col.cards];
              newCards.splice(overIndex, 0, activeCard);
              return {
                ...col,
                cards: newCards,
              };
            }
            return col;
          });
          return newColumns;
        });
      }
    }

    // Column over column (reorder columns)
    if (activeData?.type === "column" && overData?.type === "column") {
      const oldIndex = columns.findIndex((c) => c.id === activeId);
      const newIndex = columns.findIndex((c) => c.id === overId);

      if (oldIndex !== newIndex) {
        setColumns((prev) => arrayMove(prev, oldIndex, newIndex));
      }
    }
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    setActiveId(null);
    // Here you would persist to backend
    console.log("Drag ended - persist to backend");
  };

  // Card management
  const handleAddCard = (columnId) => {
    if (!newCardTitle.trim()) return;

    const newCard = {
      id: `card-${Date.now()}`,
      title: newCardTitle,
      description: "",
      priority: "medium",
      dueDate: "",
      assignee: null,
      labels: [],
      comments: 0,
      attachments: 0,
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col,
      ),
    );

    setNewCardTitle("");
    setShowAddCard(null);
  };

  const handleDeleteCard = (columnId, cardId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
          : col,
      ),
    );
    setShowCardDetail(null);
  };

  const handleUpdateCard = (updatedCard) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card,
        ),
      })),
    );
  };

  // Filter cards
  const filterCards = (cards) => {
    return cards.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority =
        filterPriority === "all" || card.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  };

  // Get active card for overlay
  const activeCard = activeId ? findCard(activeId)?.card : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Board Header */}
      <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Projects</span>
            </button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <input
              type="text"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              className="text-lg font-bold text-slate-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded px-2 py-1"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 w-64"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Team Avatars */}
            <div className="flex items-center -space-x-2">
              {["AM", "SC", "MJ", "ED"].map((avatar, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                >
                  {avatar}
                </div>
              ))}
            </div>

            {/* Board Menu */}
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors duration-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Board Canvas */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="h-full p-6 flex items-start gap-4 min-w-max">
            {/* Columns */}
            <SortableContext
              items={columns.map((col) => col.id)}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((column) => (
                <SortableColumn
                  key={column.id}
                  column={column}
                  children={filterCards(column.cards).map((card) => (
                    <SortableCard
                      key={card.id}
                      card={card}
                      columnId={column.id}
                      onCardClick={(card, columnId) =>
                        setShowCardDetail({ card, columnId })
                      }
                    />
                  ))}
                  onAddCard={() => setShowAddCard(column.id)}
                  onColumnClick={() => {}}
                  showAddCard={showAddCard}
                  setShowAddCard={setShowAddCard}
                  newCardTitle={newCardTitle}
                  setNewCardTitle={setNewCardTitle}
                  handleAddCard={handleAddCard}
                />
              ))}
            </SortableContext>

            {/* Add Column */}
            <div className="flex-shrink-0 w-80">
              <button className="w-full flex items-center gap-2 px-3 py-3 text-slate-500 hover:text-slate-700 hover:bg-white rounded-lg border-2 border-dashed border-slate-300 hover:border-indigo-400 transition-all duration-200">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Column</span>
              </button>
            </div>
          </div>

          {/* Drag Overlay (what you see while dragging) */}
          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: "0.5",
                  },
                },
              }),
            }}
          >
            {activeCard ? (
              <div className="w-80 rotate-3 shadow-2xl">
                <SortableCard
                  card={activeCard}
                  columnId={findCard(activeCard.id)?.column.id}
                  onCardClick={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Card Detail Modal */}
      {showCardDetail && (
        <CardDetailModal
          card={showCardDetail.card}
          columnId={showCardDetail.columnId}
          onClose={() => setShowCardDetail(null)}
          onSave={handleUpdateCard}
          onDelete={handleDeleteCard}
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

        /* Custom Scrollbar */}
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default KanbanBoard;
