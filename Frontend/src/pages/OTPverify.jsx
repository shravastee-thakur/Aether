import React, { useState, useRef, useEffect } from "react";
import {
  Shield,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const OTPverify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Two Timers: Expiry (Security) & Resend (Anti-spam)
  const [expiryTime, setExpiryTime] = useState(300); // 5 minutes
 

 
  const [isExpiring, setIsExpiring] = useState(false);
  const inputRefs = useRef([]);

  // Handle Expiry Timer
  useEffect(() => {
    if (expiryTime > 0) {
      const timer = setTimeout(() => {
        setExpiryTime(expiryTime - 1);
        if (expiryTime <= 60) setIsExpiring(true); // Warn when < 1 min
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [expiryTime]);

  

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pastedData.forEach((digit, index) => {
      if (index < 6 && !isNaN(digit)) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP Submitted:", otpCode);
  };

  

  // Format Time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* --- BACKGROUND DECORATION --- */}
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

      {/* --- OTP CARD --- */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Enter verification code
          </h1>
          <p className="text-slate-600 text-sm">
            We've sent a 6-digit code to your email
          </p>
        </div>

        {/* Expiry Timer Alert */}
        <div
          className={`mb-6 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg ${
            isExpiring
              ? "bg-orange-50 text-orange-600 border border-orange-200"
              : "bg-slate-50 text-slate-600 border border-slate-200"
          }`}
        >
          {isExpiring ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <Shield className="w-4 h-4" />
          )}
          <span>Code expires in {formatTime(expiryTime)}</span>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 md:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-bold text-slate-900 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-[#0747a6] focus:ring-2 focus:ring-[#0747a6]/20 transition-all duration-200"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={otp.join("").length !== 6}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold transition-all duration-300 ${
              otp.join("").length === 6
                ? "bg-[#0747a6] hover:bg-indigo-600 text-white shadow-lg shadow-[#0747a6]/30 hover:scale-[1.02]"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span>Verify Code</span>
            <CheckCircle className="w-5 h-5" />
          </button>

          
        </form>
      </div>

     
    </div>
  );
};

export default OTPverify;
