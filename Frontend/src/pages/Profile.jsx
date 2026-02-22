import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Shield,
  Camera,
  Save,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Key,
} from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Alex Morgan",
    email: "alex@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Product Manager at Tech Corp",
    timezone: "America/New_York",
    language: "English",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleAvatarUpload = () => {
    // Simulate avatar upload
    console.log("Avatar upload triggered");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Profile updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  };

  const handleDeleteAccount = () => {
    // Show confirmation modal in production
    console.log("Delete account initiated");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- TOP NAVBAR (Simplified for Settings) --- */}
      <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span className="text-xl font-bold text-slate-900">Aether</span>
          </div>
          <a
            href="/dashboard"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
          >
            ← Back to Dashboard
          </a>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-5xl mx-auto p-4 md:p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-slate-600">
            Manage your account information and security preferences.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- LEFT: PROFILE CARD --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full bg-slate-200 mx-auto"
                  />
                  <button
                    onClick={handleAvatarUpload}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label="Change avatar"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {formData.name}
                </h2>
                <p className="text-sm text-slate-500">{formData.email}</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                  <Shield className="w-3 h-3" />
                  Pro Plan
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Member since</span>
                    <span className="text-slate-900 font-medium">Jan 2026</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Last active</span>
                    <span className="text-slate-900 font-medium">Today</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">2FA Status</span>
                    <span
                      className={`font-medium ${twoFactorEnabled ? "text-green-600" : "text-slate-400"}`}
                    >
                      {twoFactorEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: SETTINGS FORMS --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Profile Information
                </h2>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleProfileChange}
                      className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleProfileChange}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed"
                        disabled
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      Contact support to change email
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleProfileChange}
                    className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="timezone"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleProfileChange}
                      className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    >
                      <option value="America/New_York">
                        Eastern Time (ET)
                      </option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">
                        Pacific Time (PT)
                      </option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Asia/Kolkata">India (IST)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="language"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleProfileChange}
                      className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Español</option>
                      <option value="French">Français</option>
                      <option value="German">Deutsch</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSaving
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-[#0747a6] hover:bg-indigo-600 text-white shadow-lg shadow-[#0747a6]/30 hover:scale-[1.02]"
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Password & Security */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Password & Security
                </h2>
              </div>

              <form onSubmit={handleSavePassword} className="space-y-5">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current,
                        })
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                        placeholder="New password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            new: !showPasswords.new,
                          })
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            confirm: !showPasswords.confirm,
                          })
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving || !passwordData.newPassword}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSaving || !passwordData.newPassword
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-[#0747a6] hover:bg-indigo-600 text-white shadow-lg shadow-[#0747a6]/30 hover:scale-[1.02]"
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-5 h-5" />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Two-Factor Authentication */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${twoFactorEnabled ? "bg-green-100" : "bg-slate-100"}`}
                    >
                      <Smartphone
                        className={`w-5 h-5 ${twoFactorEnabled ? "text-green-600" : "text-slate-400"}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      twoFactorEnabled ? "bg-indigo-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        twoFactorEnabled ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border border-red-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-red-600">
                  Danger Zone
                </h2>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-semibold rounded-lg transition-all duration-300"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </main>

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
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Profile;
