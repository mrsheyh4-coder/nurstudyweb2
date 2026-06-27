const SESSION_KEY = 'nurstudy_admin_session';

/** Vite exposes VITE_* to the client bundle — use only for casual protection, not real secrets. */
export function getConfiguredPassword() {
  const fromEnv = import.meta.env.VITE_ADMIN_PASSWORD;
  if (fromEnv) return fromEnv;
  if (import.meta.env.DEV) return 'admin';
  return '';
}

export function isAdminSession() {
  if (typeof sessionStorage === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function adminLogin(password) {
  const expected = getConfiguredPassword();
  if (!expected) {
    console.warn('Set VITE_ADMIN_PASSWORD for production admin access.');
    return false;
  }
  if (password !== expected) return false;
  sessionStorage.setItem(SESSION_KEY, '1');
  return true;
}

export function adminLogout() {
  sessionStorage.removeItem(SESSION_KEY);
}
