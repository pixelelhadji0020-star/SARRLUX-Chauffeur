import { useState, useEffect, useRef } from "react";
import siteConfig from "./config/siteConfig.js";
import Header from "./components/Header.jsx";
import Services from "./components/Services.jsx";
import BookingForm from "./components/BookingForm.jsx";
import Footer from "./components/Footer.jsx";

/* ── Icônes pour les badges de confiance ── */
const Icons = {
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-secondary-400">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  ),
};

const ICON_BADGE_MAP = { Star: Icons.Star, Shield: Icons.Shield, Clock: Icons.Clock };

/* ── Bandeau d'installation PWA ── */
function InstallBanner() {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible) return null;

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === "accepted") setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="relative rounded-2xl border border-primary-700/50 bg-surface-900/95 backdrop-blur-md shadow-2xl shadow-black/60 overflow-hidden">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
        <div className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 rounded-xl bg-primary-900/50 flex items-center justify-center text-primary-400 flex-shrink-0">
            <Icons.Download />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold">Ajouter {siteConfig.branding.brandName} à l'accueil</p>
            <p className="text-gray-400 text-xs">Accès rapide depuis votre écran principal</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleInstall}
              className="px-3 py-2 rounded-lg bg-primary-700 hover:bg-primary-600 text-white text-xs font-semibold transition-colors"
            >
              Installer
            </button>
            <button
              onClick={() => setVisible(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-800 hover:bg-surface-700 text-gray-400 transition-colors"
            >
              <Icons.X />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeService, setActiveService] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").catch(() => {});
      });
    }
  }, []);

  const handleReserve = (serviceLabel) => {
    setActiveService(serviceLabel);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans antialiased">
      <Header />

      <main className="px-4 pb-32 space-y-8 max-w-lg mx-auto">

        {/* Badges de confiance — pilotés par siteConfig.content.trustBadges */}
        <div className="grid grid-cols-3 gap-2 pt-6">
          {siteConfig.content.trustBadges.map(({ icon, label }) => {
            const Icon = ICON_BADGE_MAP[icon] || Icons.Star;
            return (
              <div key={label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-surface-900/60 border border-surface-800/40">
                <span className="text-secondary-400"><Icon /></span>
                <span className="text-gray-300 text-xs font-medium">{label}</span>
              </div>
            );
          })}
        </div>

        <Services onReserve={handleReserve} />

        <section ref={formRef} id="reservation">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-primary-800/40 to-transparent" />
            <span className="text-xs text-primary-500 font-semibold tracking-widest uppercase">Réservation</span>
            <div className="h-px flex-1 bg-gradient-to-l from-primary-800/40 to-transparent" />
          </div>
          <BookingForm preselectedService={activeService} />
        </section>

        <Footer />
      </main>

      <InstallBanner />

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
