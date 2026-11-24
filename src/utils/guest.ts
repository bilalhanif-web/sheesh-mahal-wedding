// Utility to extract, sanitize and format guest names safely from URL params

export function getGuestFromUrl(): { rawName: string; displayName: string; salutation: string } {
  if (typeof window === 'undefined') {
    return {
      rawName: '',
      displayName: 'Guest',
      salutation: 'Dear Guest',
    };
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest');

    if (!guestParam || !guestParam.trim()) {
      return {
        rawName: '',
        displayName: 'Guest',
        salutation: 'Dear Guest',
      };
    }

    // Strip out potential html tags or control characters for safety
    const sanitized = guestParam
      .trim()
      .replace(/[<>\"'`]/g, '')
      .slice(0, 50);

    return {
      rawName: sanitized,
      displayName: sanitized,
      salutation: `Dear ${sanitized}`,
    };
  } catch {
    return {
      rawName: '',
      displayName: 'Guest',
      salutation: 'Dear Guest',
    };
  }
}
