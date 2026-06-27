import siteConfig from "../config/siteConfig.js";

function LogoSVG() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="18" stroke="#10b981" strokeWidth="1.5" />
      <path d="M9 24 C9 24, 14 14, 19 13 C24 12, 29 14, 29 14" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <ellipse cx="19" cy="22" rx="8" ry="4.5" stroke="#d97706" strokeWidth="1.4" fill="none" />
      <circle cx="13.5" cy="26" r="2.2" fill="#10b981" />
      <circle cx="24.5" cy="26" r="2.2" fill="#10b981" />
      <circle cx="13.5" cy="26" r="1" fill="#064e3b" />
      <circle cx="24.5" cy="26" r="1" fill="#064e3b" />
      <path d="M19 13 L19 10" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="19" cy="9" r="1.2" fill="#d97706" />
    </svg>
  );
}

export default function Header() {
  const { brandName, brandSuffix, slogan, sloganAccent, logoPath } = siteConfig.branding;

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative border-b border-surface-800/60">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            {/* Si un logo custom est fourni dans siteConfig, on l'utilise, sinon fallback SVG générique */}
            {logoPath ? (
              <img src={logoPath} alt={`${brandName} ${brandSuffix}`} className="w-9 h-9" />
            ) : (
              <LogoSVG />
            )}
            <div>
              <h1 className="text-white font-bold text-lg tracking-widest uppercase leading-tight">
                {brandName}
              </h1>
              <span className="text-primary-500 text-xs tracking-[0.25em] uppercase font-medium">
                {brandSuffix}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-primary-950/60 border border-primary-800/40 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-primary-400 text-xs font-medium">Disponible</span>
          </div>
        </div>

        <div className="px-5 pb-5">
          <p className="text-gray-400 text-sm leading-relaxed">
            {slogan}{" "}
            <span className="text-primary-500 font-medium">{sloganAccent}</span>
          </p>
        </div>
      </div>
    </header>
  );
}
