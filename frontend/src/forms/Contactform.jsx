import { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import API_URL from "../app";

/**
 * ContactForm
 * Props:
 *  - city       {string}  e.g. "Dombivali"   (bold heading line)
 *  - subtitle   {string}  e.g. "Lodha Group Centre Park"
 */
export default function ContactForm({
  city = "Dombivali",
  subtitle = "Lodha Group Centre Park",
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please fill in your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/leads/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, city, subtitle }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setName("");
        setPhone("");
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || "Failed to submit request.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("Unable to connect to server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0d1a12] border border-white/10 rounded-xl p-5 shadow-sm w-full">
      {/* Header */}
      <p className="text-sm text-slate-400 text-center">
        Want to know more about
      </p>
      <h2 className="text-xl font-bold text-white text-center mt-0.5">
        {city} ?
      </h2>
      <p className="text-sm text-slate-400 text-center mt-0.5 mb-4">
        {subtitle}
      </p>

      {/* Form */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          className="w-full border border-white/10 bg-[#0b1710] rounded-md px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-transparent disabled:opacity-60"
        />

        <div className="flex border border-white/10 bg-[#0b1710] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-lime-400/50 focus-within:border-transparent">
          <div className="flex items-center gap-1 px-3 bg-black/30 border-r border-white/10 text-sm text-slate-300 shrink-0">
            +91
            <svg
              className="w-3 h-3 text-slate-500 ml-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none disabled:opacity-60"
          />
        </div>

        {submitStatus === "success" && (
          <div className="bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs rounded-md p-2.5 text-center font-medium">
            ✔ Callback requested successfully! We'll contact you in 5 mins.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-md p-2.5 text-center font-medium">
            ⚠ {errorMessage}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-lime-400 hover:bg-lime-300 text-[#0b1710] font-semibold py-3 rounded-md text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Requesting..." : "Request CallBack"}
        </button>
      </div>

      <p className="text-xs text-slate-500 mt-3 text-center leading-relaxed">
        By continuing, you're agreeing to the{" "}
        <a href="#" className="text-lime-400 hover:underline">
          Terms and Conditions
        </a>
      </p>

      <div className="flex items-center gap-1.5 mt-3">
        <CheckCircle2 size={14} className="text-slate-500 shrink-0" />
        <span className="text-xs text-slate-400">
          Assured Callback in 5 mins
        </span>
      </div>

      {/* WhatsApp helpdesk */}
      <div className="flex items-center gap-3 mt-4 border border-white/10 rounded-lg p-3">
        <div className="bg-lime-400 rounded-full p-1.5 shrink-0">
          <MessageCircle size={16} className="text-[#0b1710]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">+91 9693969347</p>
          <p className="text-xs text-slate-500">Contact Helpdesk (Chat only)</p>
        </div>
      </div>

      <p className="text-xs text-lime-400 hover:underline cursor-pointer text-right mt-3">
        Read Disclaimer
      </p>
    </div>
  );
}
