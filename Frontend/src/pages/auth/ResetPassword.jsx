import React, { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle, ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Password validation rules
  const validatePassword = (password) => {
    const newErrors = {};

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    const passwordErrors = validatePassword(formData.password);

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...passwordErrors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log("Password reset successful");
    }, 1500);
  };

  if (isSubmitted) {
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

        {/* --- SUCCESS CARD --- */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Password reset successful
            </h1>
            <p className="text-slate-600 text-sm">
              Your password has been updated successfully.
            </p>
          </div>

          {/* Security Tips */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-600 space-y-2">
                <p>✓ Password updated across all devices</p>
                <p>✓ All other sessions have been logged out</p>
                <p>✓ You'll need to sign in again on other devices</p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <a
            href="/login"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0747a6] hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-[#0747a6]/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Sign In with New Password</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </a>
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
  }

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

      {/* --- RESET PASSWORD CARD --- */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Reset your password
          </h1>
          <p className="text-slate-600 text-sm">
            Create a new strong password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className={`block w-full pl-11 pr-12 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0747a6]/20 transition-all duration-200 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-[#0747a6]"
                }`}
                placeholder="Min. 8 characters"
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
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <span>•</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-xs font-medium text-slate-700 mb-2">
              Password must contain:
            </p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li
                className={`flex items-center gap-2 ${formData.password.length >= 8 ? "text-green-600" : ""}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 8 ? "bg-green-600" : "bg-slate-300"}`}
                ></span>
                At least 8 characters
              </li>
              <li
                className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-green-600" : ""}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-green-600" : "bg-slate-300"}`}
                ></span>
                One uppercase letter
              </li>
              <li
                className={`flex items-center gap-2 ${/[a-z]/.test(formData.password) ? "text-green-600" : ""}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(formData.password) ? "bg-green-600" : "bg-slate-300"}`}
                ></span>
                One lowercase letter
              </li>
              <li
                className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? "text-green-600" : ""}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(formData.password) ? "bg-green-600" : "bg-slate-300"}`}
                ></span>
                One number
              </li>
            </ul>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block w-full pl-11 pr-12 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0747a6]/20 transition-all duration-200 ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-[#0747a6]"
                }`}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200 focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <span>•</span>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 ${
              isLoading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-[#0747a6] hover:bg-indigo-600 text-white shadow-lg shadow-[#0747a6]/30 hover:scale-[1.02]"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                <span>Resetting...</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <CheckCircle className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <a
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-[#0747a6] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </a>
        </div>
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

export default ResetPassword;
