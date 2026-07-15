import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Building2,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export default function ContactUsPage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    userType: "Buyer", // Buyer, Owner, Tenant, Agent
    projectInterest: "General Query", // Specific project options
    message: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating API real-estate pipeline submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form variables
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        userType: "Buyer",
        projectInterest: "General Query",
        message: "",
        agreeToTerms: false,
      });
    }, 1500);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="w-full bg-[#08120c] py-12 md:py-20 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Header Block */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Get in Touch with Our Hillsite Experts
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-slate-400 text-base sm:text-lg leading-relaxed"
          >
            Whether you are looking to buy a premium scenic plot, build a
            customized eco-villa, or query legal documents in Yelagiri Hills,
            our advisory desk is ready to help you.
          </motion.p>
        </div>

        {/* Core Content Grid */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-10 items-start">
          {/* Left Column: Office Contacts Card Container */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#0d1a12] border border-lime-400/15 text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-8 relative overflow-hidden"
          >
            {/* Background design layer elements */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-lime-400/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p className="text-slate-400 text-sm">
                Expect a structured response callback within 2 business hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={18} className="text-lime-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Call Support Desk
                  </p>
                  <p className="text-base font-medium mt-0.5 text-white">
                    +91 22 4567 8900
                  </p>
                  <p className="text-xs text-slate-500">
                    Toll-free inside India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={18} className="text-lime-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Electronic Mail Desk
                  </p>
                  <p className="text-base font-medium mt-0.5 text-white">
                    hello@hillsite.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-lime-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Corporate Office
                  </p>
                  <p className="text-sm font-medium leading-relaxed mt-0.5 text-white">
                    Vashi, Navi Mumbai - 400703
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={18} className="text-lime-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Operating Business Hours
                  </p>
                  <p className="text-sm font-medium mt-0.5 text-white">
                    Monday – Saturday: 9:00 AM – 7:00 PM
                  </p>
                  <p className="text-xs text-lime-400 font-semibold">
                    Site visits open on Sundays
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-lime-400 shrink-0" />
              <span>RERA Registered Advisor Infrastructure network.</span>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Real Estate Interactive Submission Form */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#0d1a12] rounded-3xl border border-white/10 p-6 md:p-10 shadow-sm relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full text-sm border border-white/10 rounded-xl px-4 py-3 text-white bg-[#0b1710] placeholder-slate-500 focus:outline-none focus:border-lime-400/50 transition-colors"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="w-full text-sm border border-white/10 rounded-xl px-4 py-3 text-white bg-[#0b1710] placeholder-slate-500 focus:outline-none focus:border-lime-400/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="johndoe@example.com"
                      className="w-full text-sm border border-white/10 rounded-xl px-4 py-3 text-white bg-[#0b1710] placeholder-slate-500 focus:outline-none focus:border-lime-400/50 transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* I am a... Select profile filter */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        I am a
                      </label>
                      <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                        className="w-full text-sm border border-white/10 rounded-xl px-4 py-3 text-white bg-[#0b1710] focus:outline-none focus:border-lime-400/50 transition-colors"
                      >
                        <option value="Buyer">
                          Prospective Buyer / Investor
                        </option>
                        <option value="Owner">Property Owner / Seller</option>
                        <option value="Tenant">Tenant looking to rent</option>
                        <option value="Agent">
                          Channel Partner / Broker Agent
                        </option>
                      </select>
                    </div>

                    {/* Project Interest Target selector config */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Project Interest
                      </label>
                      <select
                        name="projectInterest"
                        value={formData.projectInterest}
                        onChange={handleInputChange}
                        className="w-full text-sm border border-white/10 rounded-xl px-4 py-3 text-white bg-[#0b1710] focus:outline-none focus:border-lime-400/50 transition-colors"
                      >
                        <option value="General Query">
                          General / Other Requirements
                        </option>
                        <option value="Scenic Valley Plots">
                          Scenic Valley Plots (Yelagiri)
                        </option>
                        <option value="Mountain View Heights">
                          Mountain View Heights (Yelagiri)
                        </option>
                        <option value="Eco Villa Retreats">
                          Eco Villa Retreats (Yelagiri)
                        </option>
                        <option value="Green Ridge Estate">
                          Green Ridge Estate (Yelagiri)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message Input text field space details area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Message Details
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your preferred plot dimensions, villa choice, budget limits or site visit schedule..."
                      className="w-full text-sm border border-white/10 rounded-xl px-4 py-3 text-white bg-[#0b1710] placeholder-slate-500 focus:outline-none focus:border-lime-400/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Legal Authorization Consent Disclaimer Box checkbox fields */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 border-white/10 rounded focus:ring-0 mt-0.5 accent-lime-400 cursor-pointer"
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="text-xs text-slate-400 leading-normal select-none cursor-pointer"
                    >
                      I hereby authorize Hillsite representatives to contact me
                      via Call, SMS, or WhatsApp regarding my specific
                      real-estate query. This supersedes any DND registries.
                    </label>
                  </div>

                  {/* Action submission execute button setup elements configuration */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-lime-400 hover:bg-lime-300 disabled:bg-slate-700 text-[#0b1710] font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_-4px_rgba(163,230,53,0.6)] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#0b1710]/30 border-t-[#0b1710] rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} /> Submit Plot Inquiry
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* Success placeholder template frame state view toggle */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4"
                >
                  <div className="w-16 h-16 bg-lime-400/10 rounded-full flex items-center justify-center text-lime-400 mb-4 border border-lime-400/20 shadow-sm">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Thank You for Connecting!
                  </h3>
                  <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
                    Your hillside property inquiry has been successfully
                    received. A local Yelagiri site-expert will contact you
                    shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="border border-white/10 hover:border-lime-400/40 text-slate-300 font-medium text-xs px-5 py-2.5 rounded-xl transition-colors bg-[#0b1710] shadow-sm"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
