import { useState } from "react";

const cities = [
  {
    name: "Navi Mumbai",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10">
        <rect x="8" y="44" width="48" height="4" rx="1" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <path d="M16 44 Q32 28 48 44" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <line x1="24" y1="36" x2="24" y2="44" stroke="#1a1a1a" strokeWidth="1.2"/>
        <line x1="32" y1="30" x2="32" y2="44" stroke="#1a1a1a" strokeWidth="1.2"/>
        <line x1="40" y1="36" x2="40" y2="44" stroke="#1a1a1a" strokeWidth="1.2"/>
        <rect x="20" y="32" width="6" height="10" rx="1" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="38" y="32" width="6" height="10" rx="1" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="28" y="20" width="8" height="14" rx="1" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <rect x="30" y="22" width="2" height="3" rx="0.5" fill="#1a1a1a"/>
        <rect x="33" y="22" width="2" height="3" rx="0.5" fill="#1a1a1a"/>
        <rect x="30" y="27" width="2" height="3" rx="0.5" fill="#1a1a1a"/>
        <rect x="33" y="27" width="2" height="3" rx="0.5" fill="#1a1a1a"/>
      </svg>
    ),
  },
  {
    name: "Mumbai",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10">
        <rect x="22" y="44" width="20" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="24" y="30" width="16" height="14" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <path d="M24 30 Q32 18 40 30" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <path d="M27 30 Q32 22 37 30" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="28" y="36" width="8" height="8" rx="0.5" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <line x1="32" y1="36" x2="32" y2="44" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="24" y="26" width="3" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="37" y="26" width="3" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <line x1="32" y1="16" x2="32" y2="20" stroke="#1a1a1a" strokeWidth="1.5"/>
        <circle cx="32" cy="15" r="1.5" fill="#1a1a1a"/>
      </svg>
    ),
  },
  {
    name: "Delhi",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10">
        <rect x="10" y="44" width="44" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="18" y="36" width="28" height="8" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <path d="M22 36 L22 28 Q32 18 42 28 L42 36" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <path d="M26 36 L26 30 Q32 23 38 30 L38 36" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="28" y="36" width="8" height="8" rx="0.5" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <line x1="32" y1="36" x2="32" y2="44" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="18" y="40" width="5" height="4" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="41" y="40" width="5" height="4" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <line x1="32" y1="16" x2="32" y2="20" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="30" y="14" width="4" height="2" rx="0.5" fill="#1a1a1a"/>
      </svg>
    ),
  },
  {
    name: "Noida",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10">
        <rect x="10" y="44" width="44" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="12" y="22" width="10" height="22" rx="0.5" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <rect x="14" y="24" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="17.5" y="24" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="14" y="29" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="17.5" y="29" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="14" y="34" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="17.5" y="34" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="26" y="14" width="12" height="30" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="28" y="16" width="3" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="16" width="3" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="28" y="22" width="3" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="22" width="3" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="28" y="28" width="3" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="28" width="3" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="30" y="34" width="4" height="10" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="42" y="26" width="10" height="18" rx="0.5" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <rect x="44" y="28" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="47.5" y="28" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="44" y="33" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="47.5" y="33" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <line x1="32" y1="10" x2="32" y2="14" stroke="#1a1a1a" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Gurgaon",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10">
        <rect x="10" y="44" width="44" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="13" y="18" width="11" height="26" rx="0.5" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <path d="M13 18 L18.5 12 L24 18" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <rect x="15" y="20" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="19" y="20" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="15" y="26" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="19" y="26" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="15" y="32" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="19" y="32" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="15" y="38" width="7" height="6" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="27" y="10" width="10" height="34" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="29" y="12" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="12" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="29" y="18" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="18" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="29" y="24" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="24" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="29" y="30" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="30" width="2.5" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="29" y="36" width="6" height="8" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="41" y="20" width="11" height="24" rx="0.5" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <path d="M41 20 L46.5 14 L52 20" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <rect x="43" y="22" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="47" y="22" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="43" y="28" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="47" y="28" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="43" y="34" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="47" y="34" width="3" height="3" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="43" y="38" width="7" height="6" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Thane",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10">
        <rect x="10" y="44" width="44" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="12" y="26" width="9" height="18" rx="0.5" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <rect x="14" y="28" width="2" height="2.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="17" y="28" width="2" height="2.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="14" y="33" width="2" height="2.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="17" y="33" width="2" height="2.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="14" y="38" width="5" height="6" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="25" y="16" width="14" height="28" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <path d="M25 16 L32 10 L39 16" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="27" y="18" width="3.5" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="18" width="3.5" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="27" y="24" width="3.5" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="24" width="3.5" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="27" y="30" width="3.5" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="33" y="30" width="3.5" height="3.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="29" y="36" width="6" height="8" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="43" y="24" width="9" height="20" rx="0.5" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <rect x="45" y="26" width="2" height="2.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="48" y="26" width="2" height="2.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="45" y="31" width="2" height="2.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="48" y="31" width="2" height="2.5" rx="0.3" fill="#1a1a1a" opacity="0.7"/>
        <rect x="45" y="36" width="5" height="8" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <path d="M18 50 Q22 48 26 50" stroke="#1a1a1a" strokeWidth="1" fill="none" opacity="0.4"/>
      </svg>
    ),
  },
  {
    name: "Pune",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-10 md:h-10">
        <rect x="10" y="44" width="44" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="14" y="30" width="36" height="14" rx="0.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
        <rect x="14" y="26" width="4" height="4" rx="0.3" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="20" y="26" width="4" height="4" rx="0.3" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="26" y="26" width="4" height="4" rx="0.3" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="32" y="26" width="4" height="4" rx="0.3" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="38" y="26" width="4" height="4" rx="0.3" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <rect x="44" y="26" width="4" height="4" rx="0.3" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        <path d="M28 44 L28 36 Q32 32 36 36 L36 44" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
        <line x1="32" y1="32" x2="32" y2="36" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="16" y="32" width="3" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="45" y="32" width="3" height="4" rx="0.5" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="20" y="35" width="6" height="5" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <rect x="38" y="35" width="6" height="5" rx="0.3" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
        <line x1="32" y1="20" x2="32" y2="26" stroke="#1a1a1a" strokeWidth="1.3"/>
        <path d="M32 20 L38 22 L32 24 Z" fill="#1a1a1a"/>
      </svg>
    ),
  },
];

export default function Dropdown({ onClose }) {
  const [search, setSearch] = useState("");

  const filtered = cities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    /* 
      Layout Transformation: 
      - On desktop/lg screens: lg:absolute lg:w-[520px] lg:mt-2 lg:shadow-2xl lg:border lg:left-1/2 lg:-translate-x-1/2
      - On mobile/tablet screens: relative w-full border-0 shadow-none mt-0 bg-white
    */
    <div className="relative lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:mt-2 w-full lg:w-[520px] bg-white lg:border lg:border-gray-200 rounded-xl lg:shadow-2xl z-50 overflow-hidden">
      
      {/* Search Bar */}
      <div className="p-3 md:p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* Cities Container */}
      <div className="p-3 md:p-4 bg-white">
        {filtered.length > 0 ? (
          <>
            <p className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Popular Cities
            </p>
            
            {/* 
              Responsive Dynamic Grid: 
              - 2 columns on very small screens (grid-cols-2)
              - 3 columns on tablet screens (sm:grid-cols-3)
              - 4 columns on desktop frames (lg:grid-cols-4)
            */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
              {filtered.map((city) => (
                <button
                  key={city.name}
                  onClick={() => onClose?.(city.name)}
                  className="flex flex-col items-center gap-1.5 p-2 md:p-3 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 cursor-pointer group w-full bg-white"
                >
                  <div className="text-gray-700 group-hover:scale-110 transition-transform duration-150">
                    {city.icon}
                  </div>
                  <span className="text-[11px] md:text-xs font-medium text-gray-700 text-center leading-tight">
                    {city.name}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400 text-center py-6 bg-white">
            No cities found for &quot;{search}&quot;
          </p>
        )}
      </div>
    </div>
  );
}