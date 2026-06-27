import { useState } from "react";
import siteConfig from "../config/siteConfig.js";

/* ── Icônes référencées par siteConfig.content.services[].icon ── */
const Icons = {
  City: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7">
      <path d="M3 21h18M6 21V7l6-4 6 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Route: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7">
      <path d="M3 17l4-10 4 5 4-8 4 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 21h18" strokeLinecap="round" />
    </svg>
  ),
  Plane: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7">
      <path d="M21 16l-5-5 1.5-6.5L15 3l-4.5 5.5-5-1.5L3 9l4 3-1 3 3-1 3 4 2-2-1-3 3-3 5 1z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function formatPrice(amount, currency) {
  if (amount === null || amount === undefined) return null;
  return `À partir de ${amount.toLocaleString("fr-FR")} ${currency}`;
}

function ServiceCard({ service, onReserve }) {
  const Icon = Icons[service.icon] || Icons.City;
  const isSecondary = service.accent === "secondary";
  const priceLabel = formatPrice(service.priceFrom, siteConfig.content.currency);

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-500 overflow-hidden group
        ${isSecondary
          ? "border-secondary-700/40 hover:border-secondary-500/60"
          : "border-primary-800/40 hover:border-primary-500/60"
        }
        bg-gradient-to-br from-surface-900 to-surface-950
      `}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
        ${isSecondary ? "bg-secondary-950/20" : "bg-primary-950/20"}`}
      />
      <div className={`h-px w-full ${isSecondary ? "bg-gradient-to-r from-transparent via-secondary-500 to-transparent" : "bg-gradient-to-r from-transparent via-primary-500 to-transparent"}`} />

      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
            ${isSecondary ? "bg-secondary-900/40 text-secondary-400" : "bg-primary-900/40 text-primary-400"}`}
          >
            <Icon />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-base leading-tight tracking-wide">{service.label}</h3>
            <p className={`text-xs mt-0.5 font-medium tracking-wider uppercase ${isSecondary ? "text-secondary-500" : "text-primary-500"}`}>
              {service.tagline}
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>

        <ul className="space-y-2 mb-4">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-xs text-gray-300">
              <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                ${isSecondary ? "bg-secondary-900/60 text-secondary-400" : "bg-primary-900/60 text-primary-400"}`}>
                <Icons.Check />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {priceLabel && (
          <p className={`text-xs font-semibold mb-4 ${isSecondary ? "text-secondary-400" : "text-primary-400"}`}>
            {priceLabel}
          </p>
        )}

        <button
          onClick={() => onReserve(service.label)}
          className={`w-full py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-300
            ${isSecondary
              ? "bg-secondary-600 hover:bg-secondary-500 text-black shadow-lg shadow-secondary-900/40"
              : "bg-primary-700 hover:bg-primary-600 text-white shadow-lg shadow-primary-900/40"
            }
            active:scale-95
          `}
        >
          Réserver ce trajet
        </button>
      </div>
    </div>
  );
}

export default function Services({ onReserve }) {
  const services = siteConfig.content.services;

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-primary-800/40 to-transparent" />
        <span className="text-xs text-primary-500 font-semibold tracking-widest uppercase">Nos Services</span>
        <div className="h-px flex-1 bg-gradient-to-l from-primary-800/40 to-transparent" />
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onReserve={onReserve} />
        ))}
      </div>
    </section>
  );
}
