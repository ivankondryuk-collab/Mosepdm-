interface LogoProps {
  isScrolled: boolean;
  forceLight?: boolean;
}

export default function Logo({ isScrolled, forceLight = false }: LogoProps) {
  const isDark = forceLight || isScrolled;

  return (
    <div className="flex items-center gap-2">
      {/* Icon mark */}
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-accent-DEFAULT rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
            <path
              d="M4 6h16M4 12h16M4 18h10"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="19" cy="18" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>
      {/* Wordmark */}
      <span
        className={`font-bold text-lg tracking-tight transition-colors ${
          isDark ? "text-gray-900" : "text-white"
        }`}
      >
        MOS<span className="text-accent-DEFAULT">EPDM</span>
      </span>
    </div>
  );
}
