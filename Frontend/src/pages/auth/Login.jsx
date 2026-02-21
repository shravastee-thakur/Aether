import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* --- BACKGROUND DECORATION (Matches Hero & Signup) --- */}
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

      {/* --- LOGIN CARD --- */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-bold text-2xl shadow-lg shadow-indigo-500/20 mb-4">
            A
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome back
          </h1>
          <p className="text-slate-600 text-sm">
            Sign in to your Aether workspace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Work Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0747a6]/20 focus:border-[#0747a6] transition-all duration-200"
                placeholder="john@company.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-[#0747a6] hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="block w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0747a6]/20 focus:border-[#0747a6] transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-3">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#0747a6] focus:ring-[#0747a6]/20"
            />
            <label htmlFor="remember" className="text-sm text-slate-600">
              Remember me for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-[#0747a6]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Sign In</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          {/* Google Button */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* Microsoft Button */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
              <path d="M10.95 1.05H1.05V10.95H10.95V1.05Z" fill="#F25022" />
              <path d="M22.95 1.05H13.05V10.95H22.95V1.05Z" fill="#7FBA00" />
              <path d="M10.95 13.05H1.05V22.95H10.95V13.05Z" fill="#00A4EF" />
              <path d="M22.95 13.05H13.05V22.95H22.95V13.05Z" fill="#FFB900" />
            </svg>
            <span>Microsoft</span>
          </button>
        </div>

        {/* Signup Link */}
        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#0747a6] hover:underline font-semibold"
          >
            Sign up for free
          </a>
        </p>
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle className="w-4 h-4" />
          <span>SSL Encrypted</span>
          <span className="mx-2">•</span>
          <CheckCircle className="w-4 h-4" />
          <span>GDPR Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
