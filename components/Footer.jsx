import siteConfig from "../config/siteConfig.js";

const Icons = {
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.14 2.18 2 2 0 012.12 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.12 6.12l1.27-.46a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function Footer() {
  const { phoneE164, phoneDisplay } = siteConfig.contact;
  const { brandName, brandSuffix } = siteConfig.branding;
  const year = new Date().getFullYear();

  return (
    <>
      {/* ── CONTACT DIRECT ── */}
      <section className="rounded-2xl border border-secondary-800/30 bg-gradient-to-br from-secondary-950/20 to-surface-950 p-5">
        <p className="text-secondary-400 text-xs font-semibold tracking-widest uppercase mb-1">Ligne directe</p>
        <p className="text-white font-semibold text-base mb-3">Besoin immédiat ? Appelez directement.</p>
        <a
          href={`tel:+${phoneE164}`}
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl
            border border-secondary-700/50 bg-secondary-900/20 hover:bg-secondary-900/40
            text-secondary-400 text-sm font-semibold tracking-wider transition-all duration-200 active:scale-95"
        >
          <Icons.Phone />
          Appeler {brandName} — {phoneDisplay}
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="text-center pt-2 pb-4 space-y-1">
        <p className="text-gray-600 text-xs">© {year} {brandName} {brandSuffix} — {siteConfig.contact.address}</p>
        <p className="text-gray-700 text-xs">Service premium. Disponible 24h/24 — 7j/7</p>
      </footer>
    </>
  );
}
