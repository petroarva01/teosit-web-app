/** localStorage key holding the visitor's cookie choice as JSON. */
export const consentStorageKey = "teosit-consent"

/**
 * Runs in <head> before the first paint. The cookie banner is rendered on the
 * server so it paints with the page; visitors who already chose get this flag
 * and CSS hides the banner until React takes over, so it never flashes.
 */
export const consentScript = `try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(consentStorageKey)}));if(c&&typeof c==="object")document.documentElement.dataset.consent="set"}catch(e){}`
