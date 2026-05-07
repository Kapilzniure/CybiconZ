import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("ann_closed") === "1") setOpen(false);
  }, []);
  const close = () => { sessionStorage.setItem("ann_closed", "1"); setOpen(false); };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: 44, opacity: 1 }} 
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden border-b border-white/[0.06] relative z-50"
          style={{ background: "linear-gradient(90deg, rgba(79,70,229,0.12), rgba(79,70,229,0.04))" }}
        >
          <div className="container h-11 flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-3">
              <span className="bg-accent-gradient text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">NEW</span>
              <span className="text-ink/80 hidden sm:inline">CybiLearn is launching — digital skills for business owners.</span>
              <span className="text-ink/80 sm:hidden">CybiLearn launching.</span>
              <Link to="/cybilearn" className="text-violet font-semibold hover:underline">Explore →</Link>
            </div>
            <button onClick={close} aria-label="Close" className="text-white/30 hover:text-white text-lg leading-none">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
