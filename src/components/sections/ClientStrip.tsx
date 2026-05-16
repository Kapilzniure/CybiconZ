import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const clients = [
  {
    name: "LwangBlack Coffee",
    initials: "LB",
    color: "#F59E0B",
    type: "E-Commerce",
    location: "International",
    slug: "lwangblack"
  },
  {
    name: "Johnnies Liquor",
    initials: "JL",
    color: "#EC4899",
    type: "Website + Marketing",
    location: "Local",
    slug: "johnnies-liquor"
  }
];

export default function ClientStrip() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0 },
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={containerVariants}
      className="h-auto md:h-[80px] bg-white/[0.012] border-y border-white/[0.04] flex items-center"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 py-4 md:py-0">
        {/* Left Side: Label + Clients */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20 whitespace-nowrap">
            Trusted by
          </span>

          <div className="flex items-center gap-4 md:gap-0">
            {clients.map((client, idx) => (
              <div key={client.name} className="flex items-center">
                <motion.div
                  variants={itemVariants}
                  onClick={() => navigate(`/work/${client.slug}`)}
                  className="group relative flex items-center gap-3 cursor-pointer py-2 md:px-6"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap">
                      View project →
                    </div>
                  </div>

                  {/* Initials Circle */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-[12px] font-bold border transition-all duration-300 group-hover:brightness-125"
                    style={{
                      backgroundColor: hexToRgba(client.color, 0.15),
                      borderColor: hexToRgba(client.color, 0.3),
                      color: client.color,
                    }}
                  >
                    {client.initials}
                  </div>

                  {/* Name & Type */}
                  <div className="flex flex-col">
                    <span className="font-sans text-[13px] font-semibold text-white/60 group-hover:text-white transition-colors duration-300">
                      {client.name}
                    </span>
                    <span className="font-mono text-[10px] text-white/25">
                      {client.type}
                    </span>
                  </div>
                </motion.div>

                {/* Vertical Divider */}
                {idx < clients.length - 1 && (
                  <div className="hidden md:block w-px h-8 bg-white/[0.04]" />
                )}
              </div>
            ))}

            <div className="hidden md:block w-px h-8 bg-white/[0.04] mx-2" />

            {/* Placeholder */}
            <motion.div variants={itemVariants} className="flex flex-col pl-4 md:pl-6">
              <span className="font-mono text-[10px] text-white/15">
                +3 more
              </span>
              <span className="font-mono text-[10px] text-white/15">
                More projects being announced
              </span>
            </motion.div>
          </div>
        </div>

        {/* Far Right Badge */}
        <motion.div
          variants={itemVariants}
          className="bg-[#39FF14]/[0.06] border border-[#39FF14]/[0.15] text-[#39FF14] font-mono text-[10px] px-3 py-1 rounded-[4px] whitespace-nowrap"
        >
          All projects delivered on time
        </motion.div>
      </div>
    </motion.section>
  );
}
