// Single source of truth for all contact details.
// Update the number here ONLY — every button/link in the app reads from this file.

export const BUSINESS_NAME = "Swastik Institution";
export const PHONE_DISPLAY = "7889169106";
export const PHONE_TEL = "tel:7889169106";

// WhatsApp requires the country code (91 = India) with no leading zero or plus sign.
export const WHATSAPP_NUMBER = "917889169106";
export const WHATSAPP_MESSAGE =
  "Hello Swastik Institution, I would like to know more about your courses.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const ADDRESS = "Subhash Nagar, Ludhiana, Punjab, India";
export const ADDRESS_MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Subhash Nagar, Ludhiana, Punjab, India");
