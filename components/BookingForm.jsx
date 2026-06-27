import { useState, useEffect } from "react";
import siteConfig from "../config/siteConfig.js";
import { buildWhatsAppUrl } from "../utils/buildWhatsAppUrl.js";

const Icons = {
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.14 2.18 2 2 0 012.12 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.12 6.12l1.27-.46a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Whatsapp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function Field({ label, type = "text", value, onChange, placeholder, required, name }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">
        {label} {required && <span className="text-primary-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-surface-900 border border-surface-700/60 rounded-xl px-4 py-3 text-white text-sm
          placeholder-gray-600 focus:outline-none focus:border-primary-500/70 focus:bg-surface-900
          transition-all duration-200 hover:border-surface-600"
      />
    </div>
  );
}

export default function BookingForm({ preselectedService }) {
  const services = siteConfig.content.services;

  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    service: preselectedService || "",
    date: "",
    heure: "",
    depart: "",
    arrivee: "",
    notes: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setForm((f) => ({ ...f, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const required = ["nom", "telephone", "service", "date", "heure", "depart", "arrivee"];
    const missing = required.filter((k) => !form[k].trim());
    if (missing.length) return;

    const url = buildWhatsAppUrl(form);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="relative rounded-2xl border border-primary-800/30 bg-gradient-to-b from-surface-900 to-surface-950 overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      <div className="p-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-900/40 flex items-center justify-center text-primary-400">
            <Icons.Phone />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg tracking-wide">Demande de Réservation</h2>
            <p className="text-gray-500 text-xs">Confirmation via WhatsApp sous 15 min</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nom complet" name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom" required />
            <Field label="Téléphone / WhatsApp" name="telephone" type="tel" value={form.telephone} onChange={handleChange} placeholder="+221 7X XXX XX XX" required />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Type de trajet <span className="text-primary-500">*</span>
            </label>
            <div className="relative">
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full bg-surface-900 border border-surface-700/60 rounded-xl px-4 py-3 text-sm
                  focus:outline-none focus:border-primary-500/70 transition-all duration-200
                  appearance-none text-white hover:border-surface-600"
              >
                <option value="" className="text-gray-500">Choisir un type de trajet</option>
                {services.map((s) => (
                  <option key={s.id} value={s.label}>{s.label}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Icons.ChevronDown />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date du trajet" name="date" type="date" value={form.date} onChange={handleChange} required />
            <Field label="Heure souhaitée" name="heure" value={form.heure} onChange={handleChange} placeholder="ex: 08h30" required />
          </div>

          <Field label="Lieu de départ exact" name="depart" value={form.depart} onChange={handleChange} placeholder="Adresse, quartier, hôtel…" required />
          <Field label="Lieu d'arrivée exact" name="arrivee" value={form.arrivee} onChange={handleChange} placeholder="Adresse, quartier, aéroport…" required />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Notes (optionnel)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Bagages, passagers, préférences particulières…"
              className="w-full bg-surface-900 border border-surface-700/60 rounded-xl px-4 py-3 text-white text-sm
                placeholder-gray-600 focus:outline-none focus:border-primary-500/70 transition-all duration-200
                resize-none hover:border-surface-600"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-4 rounded-xl font-bold text-sm tracking-widest uppercase
              bg-gradient-to-r from-primary-700 to-primary-600 hover:from-primary-600 hover:to-primary-500
              text-white shadow-xl shadow-primary-900/50 transition-all duration-300 active:scale-95
              flex items-center justify-center gap-3"
          >
            <Icons.Whatsapp />
            {sent ? "WhatsApp ouvert !" : "Demander ma réservation"}
          </button>

          <p className="text-center text-xs text-gray-600 leading-relaxed">
            Un message pré-rempli s'ouvrira dans WhatsApp.
            <br />Votre chauffeur vous confirme sous 15 minutes.
          </p>
        </form>
      </div>
    </div>
  );
}
