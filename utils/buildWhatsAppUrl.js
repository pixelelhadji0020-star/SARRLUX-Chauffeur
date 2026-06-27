import siteConfig from "../config/siteConfig.js";

/**
 * Construit l'URL wa.me complète à partir du template défini
 * dans siteConfig.contact.whatsapp.messageTemplate.
 *
 * @param {object} formData - { nom, telephone, service, date, heure, depart, arrivee, notes }
 * @returns {string} URL prête à ouvrir avec window.open()
 */
export function buildWhatsAppUrl(formData) {
  const { brandName, brandSuffix } = siteConfig.branding;
  const brandFull = `${brandName} ${brandSuffix}`;

  const notesLine = formData.notes ? `📝 *Notes :* ${formData.notes}` : "";

  let message = siteConfig.contact.whatsapp.messageTemplate;

  const replacements = {
    "{{brandFull}}": brandFull,
    "{{nom}}": formData.nom || "",
    "{{telephone}}": formData.telephone || "",
    "{{service}}": formData.service || "",
    "{{date}}": formData.date || "",
    "{{heure}}": formData.heure || "",
    "{{depart}}": formData.depart || "",
    "{{arrivee}}": formData.arrivee || "",
    "{{notesLine}}": notesLine,
  };

  Object.entries(replacements).forEach(([key, value]) => {
    message = message.split(key).join(value);
  });

  // Nettoie les lignes vides résiduelles laissées par {{notesLine}} si vide
  message = message
    .split("\n")
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encoded}`;
}
