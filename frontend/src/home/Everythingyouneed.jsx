import { useState } from 'react';
import {
  Landmark, Sofa, BarChart2, Compass, Building2, Home,
  UserCheck, FileText, Key, ScrollText, Wrench, ShieldCheck,
  Briefcase, TrendingUp, HandshakeIcon, PiggyBank,
  Building, ClipboardList, Award, BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Tab Data ─────────────────────────────────────────────────────────────────
const tabs = [
  {
    label: 'For Buyers / Owners',
    services: [
      { icon: Landmark,   name: 'Home Loan' },
      { icon: Sofa,       name: 'Home Interior Design' },
      { icon: BarChart2,  name: 'Valuation' },
      { icon: Compass,    name: 'Vastu Calculator' },
      { icon: Building2,  name: 'Property Management' },
      { icon: Home,       name: 'Sell or Rent Property' },
    ],
  },
  {
    label: 'For Tenants',
    services: [
      { icon: Key,          name: 'Find Rental Home' },
      { icon: FileText,     name: 'Rental Agreement' },
      { icon: ShieldCheck,  name: 'Tenant Verification' },
      { icon: Wrench,       name: 'Home Services' },
      { icon: ScrollText,   name: 'Legal Assistance' },
      { icon: UserCheck,    name: 'Background Check' },
    ],
  },
  {
    label: 'For Agents',
    services: [
      { icon: Briefcase,    name: 'Agent Dashboard' },
      { icon: TrendingUp,   name: 'Lead Management' },
      { icon: HandshakeIcon,name: 'Deal Closure Tools' },
      { icon: PiggyBank,    name: 'Commission Tracker' },
      { icon: Award,        name: 'Certifications' },
      { icon: BookOpen,     name: 'Training Resources' },
    ],
  },
  {
    label: 'For Builders & Banks',
    services: [
      { icon: Building,       name: 'Project Listings' },
      { icon: ClipboardList,  name: 'Project Reports' },
      { icon: TrendingUp,     name: 'Market Analytics' },
      { icon: Landmark,       name: 'Bank Partnerships' },
      { icon: ShieldCheck,    name: 'RERA Compliance' },
      { icon: FileText,       name: 'Documentation' },
    ],
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ icon: Icon, name }) {
  return (
    <div className="flex flex-col items-center gap-3 p-3 sm:px-4 sm:py-5 cursor-pointer group w-full">
      {/* Icon bubble */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 group-hover:bg-blue-50 border border-gray-100 group-hover:border-blue-200 flex items-center justify-center transition-all duration-200 shadow-sm group-hover:shadow-md">
        <Icon
          size={24}
          className="text-gray-500 group-hover:text-blue-600 transition-colors duration-200"
          strokeWidth={1.6}
        />
      </div>
      <span className="text-[12px] text-gray-600 group-hover:text-gray-900 text-center leading-snug font-medium transition-colors duration-200 max-w-[100px]">
        {name}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EverythingYouNeed() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      className="w-full bg-white py-10 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col gap-6">

        {/* Heading */}
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-gray-900 leading-tight mb-0"
        >
          Everything you Need at One Place
        </motion.h2>

        {/* Tabs Control Row */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex overflow-x-auto gap-0 border border-gray-200 rounded-xl w-fit max-w-full"
          style={{ scrollbarWidth: 'none' }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`
                whitespace-nowrap px-4 sm:px-6 py-3 text-[13px] sm:text-[14px] font-semibold
                transition-all duration-200 cursor-pointer outline-none flex-shrink-0
                ${i === 0 ? 'rounded-l-xl' : ''}
                ${i === tabs.length - 1 ? 'rounded-r-xl' : ''}
                ${activeTab === i
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-r border-gray-200 last:border-r-0'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Services Panel Display Box */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border border-gray-200 rounded-xl mt-0 p-2 sm:p-4 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap sm:overflow-visible gap-4 sm:gap-6 lg:gap-8 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              {tabs[activeTab].services.map((service) => (
                <div
                     key={service.name}
                     className="flex justify-center sm:flex-shrink">
                  <ServiceCard icon={service.icon} name={service.name} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.section>
  );
}