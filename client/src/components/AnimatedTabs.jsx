import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const defaultTabs = [
  {
    id: "tab1",
    label: "Sofas",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full items-center">
        <img
          src='/sofa.png'
          alt="Tab 1"
          className="rounded-lg w-full h-56 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2 h-full justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0 font-serif leading-tight">Modular Sofas</h2>
          <p className="text-sm text-gray-200 mt-0">
            Plush comfort meets contemporary design. Perfectly scaled for modern Indian homes.
          </p>
          <span className="text-sage text-sm font-semibold mt-2">From ₹45,999</span>
        </div>
      </div>
    ),
  },
  {
    id: "tab2",
    label: "Beds",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full items-center">
        <img
          src='/bed.png'
          alt="Tab 2"
          className="rounded-lg w-full h-56 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2 h-full justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0 font-serif leading-tight">King Bed Frames</h2>
          <p className="text-sm text-gray-200 mt-0">
            Solid hardwood frames offering durability and a restful night's sleep.
          </p>
          <span className="text-sage text-sm font-semibold mt-2">From ₹38,500</span>
        </div>
      </div>
    ),
  },
  {
    id: "tab3",
    label: "Dining",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full items-center">
        <img
          src='/dinning.png'
          alt="Tab 3"
          className="rounded-lg w-full h-56 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2 h-full justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0 font-serif leading-tight">Dining Tables</h2>
          <p className="text-sm text-gray-200 mt-0">
            Gather around masterfully crafted tables built for family moments.
          </p>
          <span className="text-sage text-sm font-semibold mt-2">From ₹29,999</span>
        </div>
      </div>
    ),
  },
  {
    id: "tab4",
    label: "Storage",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full items-center">
        <img
          src='/storage.png'
          alt="Tab 4"
          className="rounded-lg w-full h-56 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2 h-full justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0 font-serif leading-tight">Wardrobes</h2>
          <p className="text-sm text-gray-200 mt-0">
            Spacious, organized, and elegant storage solutions for your bedroom.
          </p>
          <span className="text-sage text-sm font-semibold mt-2">From ₹52,000</span>
        </div>
      </div>
    ),
  },
  {
    id: "tab5",
    label: "Chairs",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full items-center">
        <img
          src='/chairs.png'
          alt="Tab 5"
          className="rounded-lg w-full h-56 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2 h-full justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0 font-serif leading-tight">Accent Chairs</h2>
          <p className="text-sm text-gray-200 mt-0">
            Add a pop of character and comfort to any corner of your living space.
          </p>
          <span className="text-sage text-sm font-semibold mt-2">From ₹12,999</span>
        </div>
      </div>
    ),
  },
  {
    id: "tab6",
    label: "Decor",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full items-center">
        <img
          src='/decors.png'
          className="rounded-lg w-full h-56 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-2 h-full justify-center">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0 font-serif leading-tight">Home Decor</h2>
          <p className="text-sm text-gray-200 mt-0">
            Vases, lighting, and textiles that put the finishing touch on your home.
          </p>
          <span className="text-sage text-sm font-semibold mt-2">From ₹1,500</span>
        </div>
      </div>
    ),
  }
];

export const AnimatedTabs = ({ tabs = defaultTabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || defaultTabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-lg flex flex-col gap-y-4", className)}>
      <div className="flex gap-2 flex-wrap bg-[#11111198] bg-opacity-50 backdrop-blur-sm p-1.5 rounded-xl border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-3 py-1.5 text-sm font-medium rounded-lg text-white outline-none transition-colors"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-sage/80 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm !rounded-lg"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] text-white bg-opacity-50 backdrop-blur-md rounded-xl border border-white/10 h-[280px] flex items-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, x: 10, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "circInOut", type: "spring" }}
                  className="w-full h-full absolute inset-0 p-4 flex flex-col justify-center"
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
