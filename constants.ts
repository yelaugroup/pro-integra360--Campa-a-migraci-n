export const CONFIG = {
  BRAND_NAME: "PRO Integra360",
  BASE_URL: "https://registro.prointegra360.com",
  FORM_SUBMIT_URL: "https://sswebhook.yelaugroup.info/webhook/proi360-form-submit",
  OPTIN_CONFIRM_URL: "https://sswebhook.yelaugroup.info/webhook/proi360-optin-confirm",
  UNSUBSCRIBE_URL: "https://sswebhook.yelaugroup.info/webhook/proi360-unsubscribe",
  EVENT_TRACK_URL: "https://sswebhook.yelaugroup.info/webhook/proi360-event",
  CALENDLY_URL: "https://calendly.com/pro-integra360/demo",
  PROVINCIAS_ESPANA: [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Baleares", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lérida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza", "Ceuta", "Melilla"
  ]
};

export interface FormSubmissionPayload {
  nombre: string;
  apellidos: string;
  taller: string;
  provincia: string;
  ciudad: string;
  telefono: string;
  email: string;
  preocupacion: string;
  consents: {
    privacidad: boolean;
    marketing: boolean;
    contactoDirecto: boolean;
  };
  metadata: {
    timestamp: string;
    page_url: string;
    user_agent: string;
    ip: string;
    utm: {
      source: string | null;
      medium: string | null;
      campaign: string | null;
      content: string | null;
      term: string | null;
    };
  };
}