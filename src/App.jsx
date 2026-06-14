import { useState, useEffect } from 'react'
import {
  MapPin, Plane, Navigation, ChevronRight,
  QrCode, ClipboardList, MessageCircle
} from 'lucide-react'

const LOGO = '/logo sarrlux chauffeur.jpeg'

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

  const inputClass = 'bg-gray-900 border border-gray-700 focus:border-emerald-500 focus:outline-none rounded-xl px-4 py-3 text-white w-full placeholder-gray-500 transition-colors'

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-50 font-sans">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0b0f17]/95 backdrop-blur-md border-b border-emerald-500/20">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="SarrLux Chauffeur" className="h-9 w-9 rounded-full object-cover" />
            <span className="text-emerald-400 font-bold text-lg tracking-tight">SarrLux Chauffeur</span>
          </div>
          <button
            onClick={openCalendly}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-full font-medium transition-colors"
          >
            Réserver
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#030712] via-[#0b0f17] to-[#030712] min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <img
          src={LOGO}
          alt="SarrLux Chauffeur"
          className="h-28 w-28 rounded-2xl object-cover mb-8 shadow-2xl shadow-emerald-500/20 border border-emerald-500/20"
        />
        <h1 className="text-4xl font-bold text-white text-center leading-tight mb-4">
          Votre Chauffeur <span className="text-emerald-400">Privé</span><br />à Dakar
        </h1>
        <p className="text-gray-400 text-center text-base mb-8 max-w-sm">
          Confort, ponctualité et discrétion — à votre service 24h/24
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['🏙️ Dakar', '✈️ AIBD', '🗺️ Hors Dakar'].map((badge) => (
            <span
              key={badge}
              className="bg-gray-900 border border-emerald-500/30 text-gray-300 text-xs px-3 py-1 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <button
            onClick={openCalendly}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-2xl transition-colors text-center"
          >
            Planifier un trajet
          </button>
          <button
            onClick={scrollToForm}
            className="flex-1 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-semibold py-3 px-6 rounded-2xl transition-colors text-center"
          >
            Réserver via WhatsApp
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#0b0f17] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Nos Services</h2>
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
            ].map((service) => (
              <div
                key={service.title}
                className="relative bg-gray-900 border border-emerald-500/10 hover:border-emerald-500/40 rounded-2xl p-6 transition-all"
              >
                <span className="absolute top-4 right-4 text-amber-400 text-xs border border-amber-400/30 rounded-full px-2 py-0.5">
                  {service.badge}
                </span>
                <div className="bg-emerald-500/10 rounded-xl p-3 w-fit text-emerald-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{service.desc}</p>
                <ul className="text-gray-500 text-xs space-y-1 mb-4">
                  {service.details.map((d) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
                <div className="flex justify-end">
                  <ChevronRight className="text-emerald-500" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de réservation */}
      <section id="reservation" className="bg-[#030712] py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Demander une réservation</h2>
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
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl text-base transition-colors mt-2"
            >
              📲 Envoyer ma demande via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-[#0b0f17] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Comment ça marche ?</h2>
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
              <div key={step.num} className="flex md:flex-col items-start md:items-center gap-4 flex-1 relative">
                {/* Connecteur horizontal (desktop) */}
                {i < 2 && (
                  <div className="hidden md:block absolute left-1/2 top-8 w-full border-t border-dashed border-emerald-500/30" />
                )}
                {/* Connecteur vertical (mobile) */}
                {i < 2 && (
                  <div className="md:hidden absolute left-8 top-16 h-8 border-l border-dashed border-emerald-500/30" />
                )}

                <div className="relative z-10 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-emerald-400 shrink-0">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
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
      <footer className="bg-[#030712] border-t border-emerald-500/10 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <img src={LOGO} alt="SarrLux" className="h-12 w-12 rounded-full object-cover mb-3 border border-emerald-500/20" />
            <span className="text-emerald-400 font-bold text-lg">SarrLux Chauffeur</span>
            <p className="text-gray-500 text-sm mt-1">Votre confort, notre priorité.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 text-gray-400 text-sm mb-6">
            <span>📞 +221 XX XXX XX XX</span>
            <span>📍 Dakar, Sénégal</span>
          </div>

          <div className="border-t border-emerald-500/10 pt-4 flex justify-between items-center">
            <a
              href="/admin"
              className="text-[#030712] hover:text-emerald-500/20 text-[10px] select-none transition-colors"
            >
              admin
            </a>
            <span className="text-gray-600 text-xs">© 2025 SarrLux Chauffeur</span>
          </div>
        </div>
      </footer>

      {/* Bannière PWA */}
      {showPwaBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#030712] border-t border-emerald-500/30 px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <p className="text-gray-300 text-sm flex-1">
              📲 Ajoutez SarrLux à votre écran d'accueil pour vos prochains trajets
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleInstall}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Installer
              </button>
              <button
                onClick={() => setShowPwaBanner(false)}
                className="text-gray-400 hover:text-white text-lg leading-none px-2"
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
