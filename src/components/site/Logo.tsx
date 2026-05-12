import { Link } from "react-router-dom";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`font-display font-extrabold text-xl tracking-tight ${className}`}>
      <span className="text-white">Cybicon</span>
      <span style={{
        background: 'linear-gradient(135deg, #00C4FF, #39FF14)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent'
      }}>Z</span>
    </Link>
  );
}
