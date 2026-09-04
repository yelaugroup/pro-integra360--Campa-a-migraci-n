import { CONFIG } from '../constants';

export type CookieConsentStatus = 'accepted' | 'rejected' | null;

export const COOKIE_CONSENT_EVENT = 'proi360_cookie_consent_changed';

export const getCookieConsent = (): CookieConsentStatus => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONFIG.COOKIE_CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      return stored;
    }
  } catch (e) {
    console.error('Error reading cookie consent from localStorage', e);
  }
  return null;
};

export const hasMarketingConsent = (): boolean => {
  return getCookieConsent() === 'accepted';
};

export const setCookieConsent = (status: 'accepted' | 'rejected'): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONFIG.COOKIE_CONSENT_KEY, status);
  } catch (e) {
    console.error('Error saving cookie consent to localStorage', e);
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { status } }));
};
