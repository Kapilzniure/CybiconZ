import { Link } from "react-router-dom";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`font-display font-extrabold text-xl tracking-tight ${className}`}>
      <span className="text-ink">Cybicon</span>
      <span className="text-gradient">Z</span>
    </Link>
  );
}
