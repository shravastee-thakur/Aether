import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, ArrowLeft, RefreshCw, Key } from "lucide-react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0 && isSubmitted) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown, isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setCountdown(60);
      console.log("Password reset email sent to:", email);
    }, 1500);
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    // Trigger resend email logic
    console.log("Reset email resent to:", email);
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

      {/* --- FORGOT PASSWORD CARD --- */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 relative z-10">
        {!isSubmitted ? (
          /* --- REQUEST STATE --- */
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <Key className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Forgot password?
              </h1>
              <p className="text-slate-600 text-sm">
                No worries, we'll send you reset instructions.
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0747a6]/20 focus:border-[#0747a6] transition-all duration-200"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 ${
                  isLoading || !email
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-[#0747a6] hover:bg-indigo-600 text-white shadow-lg shadow-[#0747a6]/30 hover:scale-[1.02]"
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowLeft className="w-5 h-5 rotate-180" />
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
          </>
        ) : (
          /* --- SUCCESS STATE --- */
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Check your email
              </h1>
              <p className="text-slate-600 text-sm">
                We've sent password reset instructions to
              </p>
              <p className="text-[#0747a6] font-semibold text-sm mt-1">
                {email}
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-600 space-y-2">
                  <p>1. Check your inbox for the reset email</p>
                  <p>2. Click the link in the email to reset your password</p>
                  <p>3. Don't see it? Check your spam folder</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 ${
                  canResend
                    ? "bg-[#0747a6] hover:bg-indigo-600 text-white shadow-lg shadow-[#0747a6]/30 hover:scale-[1.02]"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <RefreshCw
                  className={`w-5 h-5 ${canResend ? "" : "animate-spin"}`}
                />
                <span>
                  {canResend ? "Resend Reset Email" : `Resend in ${countdown}s`}
                </span>
              </button>

              {/* Back to Login */}
              <a
                href="/login"
                className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-[#0747a6] transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
