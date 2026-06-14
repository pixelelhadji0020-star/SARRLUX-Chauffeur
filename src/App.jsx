import { useState, useEffect } from 'react'
import {
  MapPin, Plane, Navigation, ChevronRight,
  QrCode, ClipboardList, MessageCircle
} from 'lucide-react'

const LOGO = '/logo sarrlux chauffeur.jpeg'

const DELAYS = ['0s', '0.15s', '0.3s']
const BADGE_DELAYS = ['0.3s', '0.4s', '0.5s']

export default function App() {
  const [form, setForm] = useState({
    nom: '', telephone: '', date: '', heure: '',
    depart: '', arrivee: '', type: 'Trajet à Dakar', notes: ''
  })
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPwaBanner, setShowPwaBanner] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPwaBanner(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowPwaBanner(false)
  }

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/sarrdigitalbrainner/reservation-sarrlux-chauffeur'
      })
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault()
    const number = '221776729740'

    const message = `Bonjour SarrLux Chauffeur 👋,

Je souhaite réserver un trajet :

👤 *Nom* : ${form.nom}
📞 *Téléphone* : ${form.telephone}
📅 *Date* : ${form.date}
🕐 *Heure souhaitée* : ${form.heure}
📍 *Départ* : ${form.depart}
🏁 *Arrivée* : ${form.arrivee}
🚗 *Type de trajet* : ${form.type}${form.notes ? `\n📝 *Notes* : ${form.notes}` : ''}

Merci de confirmer la disponibilité et le tarif.`

    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const scrollToForm = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
  }

  const inputClass = 'bg-[#1a1a1a] border border-gray-700 focus:border-[#C9A97A] focus:ring-1 focus:ring-[#C9A97A]/30 focus:outline-none rounded-xl px-4 py-3 text-white w-full placeholder-gray-600 transition-all duration-200'

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-50 font-sans">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#C9A97A]/15 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={LOGO}
              alt="SarrLux Chauffeur"
              className="h-9 w-9 rounded-full object-cover hover:opacity-80 transition-opacity duration-300"
            />
            <span className="text-[#C9A97A] font-bold text-lg tracking-tight">SarrLux Chauffeur</span>
          </div>
          <button
            onClick={openCalendly}
            className="btn-gold rounded-full px-5 py-2 text-[#0d0d0d] font-semibold text-sm"
          >
            Réserver
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0d0d0d] via-[#111111] to-[#0d0d0d] min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <img
          src={LOGO}
          alt="SarrLux Chauffeur"
          className="h-28 w-28 rounded-2xl object-cover mb-8 shadow-2xl border border-[#C9A97A]/20 animate-carDrive"
          style={{ boxShadow: '0 0 40px rgba(201,169,122,0.15)' }}
        />

        <h1 className="text-4xl font-bold text-white text-center leading-tight mb-4 animate-fadeIn">
          Votre Chauffeur <span className="text-shimmer">Privé</span><br />à Dakar
        </h1>

        <p
          className="text-gray-400 text-center text-base mb-8 max-w-sm animate-fadeInUp"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          Confort, ponctualité et discrétion — à votre service 24h/24
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['🏙️ Dakar', '✈️ AIBD', '🗺️ Hors Dakar'].map((badge, i) => (
            <span
              key={badge}
              className="bg-[#1a1a1a] border border-[#C9A97A]/20 text-gray-300 text-xs px-3 py-1 rounded-full animate-fadeInUp"
              style={{ animationDelay: BADGE_DELAYS[i], opacity: 0 }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 w-full max-w-sm animate-fadeInUp"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          <button
            onClick={openCalendly}
            className="btn-gold flex-1 text-[#0d0d0d] font-semibold py-3 px-6 rounded-2xl text-center"
          >
            Planifier un trajet
          </button>
          <button
            onClick={scrollToForm}
            className="flex-1 border border-[#C9A97A]/50 text-[#C9A97A] hover:bg-[#C9A97A]/10 font-semibold py-3 px-6 rounded-2xl transition-colors text-center"
          >
            Réserver via WhatsApp
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#0d0d0d] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Nos Services</h2>
          <div className="gold-line w-16 mx-auto mb-3" />
          <p className="text-gray-400 text-sm text-center mb-10">Des solutions adaptées à chaque besoin de déplacement</p>

          <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
            {[
              {
                icon: <MapPin size={36} />,
                badge: 'Urbain',
                title: 'Trajets à Dakar',
                desc: 'Déplacements urbains & rendez-vous d\'affaires',
                details: ['Disponible 24h/24, 7j/7', 'Prise en charge immédiate ou planifiée'],
              },
              {
                icon: <Plane size={36} />,
                badge: 'Aéroport',
                title: 'Trajets AIBD',
                desc: 'Navettes aéroport sécurisées',
                details: ['Accueil personnalisé & suivi de vol', 'Ponctualité garantie'],
              },
              {
                icon: <Navigation size={36} />,
                badge: 'Sur mesure',
                title: 'Hors Dakar',
                desc: 'Excursions régionales & longues distances',
                details: ['Tarifs négociés à l\'avance', 'Confort et sécurité premium'],
              },
            ].map((service, i) => (
              <div
                key={service.title}
                className="relative bg-[#1a1a1a] border border-[#C9A97A]/10 rounded-2xl p-6 card-hover animate-fadeInUp"
                style={{ animationDelay: DELAYS[i], opacity: 0 }}
              >
                <span className="absolute top-4 right-4 text-[#C9A97A] text-xs border border-[#C9A97A]/30 rounded-full px-2 py-0.5">
                  {service.badge}
                </span>
                <div className="bg-[#C9A97A]/10 rounded-xl p-3 w-fit text-[#C9A97A] mb-3 animate-glowPulse">
                  {service.icon}
                </div>
                <div className="gold-line w-8 my-2" />
                <h3 className="text-white font-semibold text-lg mb-1">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{service.desc}</p>
                <ul className="text-gray-500 text-xs space-y-1 mb-4">
                  {service.details.map((d) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
                <div className="flex justify-end">
                  <ChevronRight className="text-[#C9A97A]" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de réservation */}
      <section id="reservation" className="bg-[#111111] py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Demander une réservation</h2>
          <div className="gold-line w-16 mx-auto mb-3" />
          <p className="text-gray-400 text-sm text-center mb-10">
            Remplissez le formulaire, votre demande sera envoyée directement via WhatsApp
          </p>

          <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Nom complet</label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Votre nom et prénom"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Téléphone / WhatsApp</label>
              <input
                type="tel"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="+221 XX XXX XX XX"
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Date du trajet</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Heure souhaitée</label>
                <input
                  type="text"
                  name="heure"
                  value={form.heure}
                  onChange={handleChange}
                  placeholder="Ex: 08h30 (confirmée par le chauffeur)"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Lieu de départ</label>
              <input
                type="text"
                name="depart"
                value={form.depart}
                onChange={handleChange}
                placeholder="Adresse exacte de départ"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Lieu d'arrivée</label>
              <input
                type="text"
                name="arrivee"
                value={form.arrivee}
                onChange={handleChange}
                placeholder="Adresse exacte d'arrivée"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Type de trajet</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Trajet à Dakar</option>
                <option>Navette AIBD</option>
                <option>Trajet hors Dakar</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Notes / Demandes spéciales <span className="text-gray-600">(optionnel)</span>
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Bagages, nombre de passagers, demandes particulières..."
                rows={3}
                className={inputClass + ' resize-none'}
              />
            </div>

            <button
              type="submit"
              className="btn-gold w-full text-[#0d0d0d] font-bold py-4 rounded-2xl text-base mt-2"
            >
              📲 Envoyer ma demande via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-[#0d0d0d] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Comment ça marche ?</h2>
          <div className="gold-line w-16 mx-auto mb-3" />
          <p className="text-gray-400 text-sm text-center mb-12">En 3 étapes simples</p>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
            {[
              {
                icon: <QrCode size={32} />,
                num: '1',
                title: 'Scannez le QR Code',
                desc: 'Accédez à la plateforme instantanément depuis votre véhicule',
              },
              {
                icon: <ClipboardList size={32} />,
                num: '2',
                title: 'Remplissez le formulaire',
                desc: 'Indiquez vos coordonnées et les détails du trajet',
              },
              {
                icon: <MessageCircle size={32} />,
                num: '3',
                title: 'Confirmation via WhatsApp',
                desc: 'Le chauffeur confirme rapidement disponibilité et tarif',
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="flex md:flex-col items-start md:items-center gap-4 flex-1 relative animate-slideInLeft"
                style={{ animationDelay: `${i * 0.2}s`, opacity: 0 }}
              >
                {/* Connecteur horizontal (desktop) */}
                {i < 2 && (
                  <div className="hidden md:block absolute left-1/2 top-8 w-full">
                    <div className="gold-line" />
                  </div>
                )}
                {/* Connecteur vertical (mobile) */}
                {i < 2 && (
                  <div className="md:hidden absolute left-8 top-16 h-8 border-l border-dashed border-[#C9A97A]/30" />
                )}

                <div className="relative z-10 bg-[#C9A97A]/10 border border-[#C9A97A]/30 rounded-2xl p-4 text-[#C9A97A] shrink-0 animate-glowPulse">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 border-2 border-[#C9A97A] text-[#C9A97A] bg-[#0d0d0d] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {step.num}
                  </span>
                </div>

                <div className="md:text-center pb-10 md:pb-0 md:px-2">
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d0d] border-t border-[#C9A97A]/10 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="gold-line w-full mb-6" />
          <div className="flex flex-col items-center mb-6">
            <img
              src={LOGO}
              alt="SarrLux"
              className="h-12 w-12 rounded-full object-cover mb-3 border border-[#C9A97A]/20 hover:opacity-70 transition-opacity"
            />
            <span className="text-[#C9A97A] font-bold text-lg">SarrLux Chauffeur</span>
            <p className="text-gray-500 text-sm mt-1">Votre confort, notre priorité.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 text-gray-400 text-sm mb-6">
            <span>📞 +221 77 672 97 40</span>
            <span>📍 Dakar, Sénégal</span>
          </div>

          <div className="border-t border-[#C9A97A]/10 pt-4 flex justify-between items-center">
            <a
              href="/admin"
              className="text-[#0d0d0d] hover:text-[#C9A97A]/20 text-[10px] select-none transition-colors"
            >
              admin
            </a>
            <span className="text-gray-600 text-xs">© 2025 SarrLux Chauffeur</span>
          </div>
        </div>
      </footer>

      {/* Bannière PWA */}
      {showPwaBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0d] border-t border-[#C9A97A]/30 px-4 py-4 animate-fadeInUp">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <p className="text-gray-300 text-sm flex-1">
              📲 Ajoutez SarrLux à votre écran d'accueil pour vos prochains trajets
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleInstall}
                className="btn-gold px-4 py-2 rounded-full text-[#0d0d0d] font-semibold text-sm"
              >
                Installer
              </button>
              <button
                onClick={() => setShowPwaBanner(false)}
                className="text-gray-400 hover:text-white text-lg leading-none px-2 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
