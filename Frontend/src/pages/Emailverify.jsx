import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";

const Emailverify = () => {
  const [email, setEmail] = useState("user@company.com");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    // Trigger resend email logic
    console.log("Verification email resent to:", email);
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

      {/* --- VERIFICATION CARD --- */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Verify your email
          </h1>
          <p className="text-slate-600 text-sm">
            We've sent a verification link to
          </p>
          <p className="text-[#0747a6] font-semibold text-sm mt-1">{email}</p>
        </div>

        {/* Instructions */}
        <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-600 space-y-2">
              <p>1. Check your inbox for the verification email</p>
              <p>2. Click the link in the email to activate your account</p>
              <p>3. Don't see it? Check your spam folder</p>
            </div>
          </div>
        </div>

        {/* Resend Button */}
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
              {canResend
                ? "Resend Verification Email"
                : `Resend in ${countdown}s`}
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

export default Emailverify;
