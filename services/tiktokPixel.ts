import { CONFIG } from '../constants';
import { hasMarketingConsent, getCookieConsent } from './cookieConsent';

declare global {
  interface Window {
    TiktokAnalyticsObject?: string;
    ttq?: {
      load: (pixelId: string, options?: any) => void;
      page: () => void;
      track: (event: string, params?: any) => void;
      identify: (params?: any) => void;
      holdConsent: () => void;
      grantConsent: () => void;
      revokeConsent: () => void;
      [key: string]: any;
    };
  }
}

let isPixelLoaded = false;
let lastTrackedPathname: string | null = null;

/**
 * Initializes the official TikTok ttq stub and queue without performing tracking yet.
 */
export const initTikTokSnippet = (): void => {
  if (typeof window === 'undefined') return;
  if (window.ttq && window.ttq.page) return;

  (function (w: any, d: Document, t: string) {
    w.TiktokAnalyticsObject = t;
    var ttq = (w[t] = w[t] || []);
    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
      "holdConsent",
      "revokeConsent",
      "grantConsent"
    ];
    ttq.setAndDefer = function (target: any, method: string) {
      target[method] = function () {
        target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }
    ttq.instance = function (instanceId: string) {
      for (var e = ttq._i[instanceId] || [], n = 0; n < ttq.methods.length; n++) {
        ttq.setAndDefer(e, ttq.methods[n]);
      }
      return e;
    };
    ttq.load = function (pixelId: string, options?: any) {
      var scriptUrl = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i = ttq._i || {};
      ttq._i[pixelId] = [];
      ttq._i[pixelId]._u = scriptUrl;
      ttq._t = ttq._t || {};
      ttq._t[pixelId] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[pixelId] = options || {};
      var scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.async = true;
      scriptTag.src = scriptUrl + "?sdkid=" + pixelId + "&lib=" + t;
      var firstScript = document.getElementsByTagName("script")[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(scriptTag, firstScript);
      } else {
        document.head.appendChild(scriptTag);
      }
    };
  })(window, document, 'ttq');

  // If user hasn't explicitly accepted marketing cookies yet, enforce holdConsent immediately
  const consent = getCookieConsent();
  if (consent === 'rejected') {
    window.ttq?.revokeConsent();
  } else if (consent !== 'accepted') {
    window.ttq?.holdConsent();
  }
};

/**
 * Loads the pixel bundle and enables tracking when marketing consent is granted.
 */
export const enableTikTokPixel = (currentPathname?: string): void => {
  if (typeof window === 'undefined') return;
  initTikTokSnippet();

  if (window.ttq) {
    window.ttq.grantConsent();

    if (!isPixelLoaded) {
      window.ttq.load(CONFIG.TIKTOK_PIXEL_ID);
      isPixelLoaded = true;
    }

    if (currentPathname) {
      trackTikTokPageView(currentPathname);
    }
  }
};

/**
 * Revokes TikTok consent and stops marketing tracking.
 */
export const revokeTikTokConsent = (): void => {
  if (typeof window === 'undefined') return;
  if (window.ttq) {
    window.ttq.revokeConsent();
  }
  lastTrackedPathname = null;
};

/**
 * Tracks a PageView event safely, respecting marketing consent and preventing duplicates.
 */
export const trackTikTokPageView = (pathname: string): void => {
  if (typeof window === 'undefined') return;

  // 1. Strictly require marketing consent
  if (!hasMarketingConsent()) {
    return;
  }

  // 2. Prevent duplicate PageViews on same pathname (e.g. React re-renders)
  if (lastTrackedPathname === pathname) {
    return;
  }

  // 3. Ensure pixel is enabled and loaded
  enableTikTokPixel();

  // 4. Send PageView
  if (window.ttq) {
    window.ttq.page();
    lastTrackedPathname = pathname;
  }
};

/**
 * Tracks the standard TikTok 'SubmitForm' conversion event upon successful form submission.
 * - Strictly checks that marketing consent is granted.
 * - Ensures the TikTok pixel is enabled and loaded.
 * - Sends NO personal data or identifiers.
 * - Fails silently to prevent ever interrupting the user experience or form flow.
 */
export const trackTikTokSubmitForm = (): void => {
  if (typeof window === 'undefined') return;

  try {
    // 1. Strictly require marketing cookie consent
    if (!hasMarketingConsent()) {
      return;
    }

    // 2. Ensure pixel snippet and pixel ID are loaded and ready
    enableTikTokPixel();

    // 3. Trigger the standard SubmitForm event (without any personal data)
    if (window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track('SubmitForm');
    }
  } catch (error) {
    // 4 & 5. Fail silently; never block the application or form flow
    console.error('Error tracking TikTok SubmitForm event:', error);
  }
};

