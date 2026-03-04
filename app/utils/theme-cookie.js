const COOKIE_NAME = 'theme';
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

export function getThemeFromCookieHeader(cookieHeader) {
  if (!cookieHeader) return null;

  const pairs = cookieHeader.split(';');

  for (const pair of pairs) {
    const [rawKey, ...rawValueParts] = pair.trim().split('=');
    if (rawKey !== COOKIE_NAME) continue;
    const rawValue = rawValueParts.join('=');
    const value = decodeURIComponent(rawValue || '');

    return value === 'light' || value === 'dark' ? value : null;
  }

  return null;
}

export function createThemeCookie(theme) {
  const safeTheme = theme === 'light' ? 'light' : 'dark';
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';

  return `${COOKIE_NAME}=${encodeURIComponent(safeTheme)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${ONE_WEEK_SECONDS}${secure}`;
}
