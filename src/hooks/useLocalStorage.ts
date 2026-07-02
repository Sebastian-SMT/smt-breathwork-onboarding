import { useCallback, useEffect, useState } from 'react';

/**
 * Persistiert einen Wert in localStorage. Wird für den Formular-Entwurf
 * genutzt, damit ein Nutzer, der den Browser schließt, beim Wiederkommen
 * fortsetzen kann (siehe UX-Anforderung "Willkommen zurück").
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage kann in privaten Modi fehlschlagen – bewusst ignoriert,
      // die App funktioniert auch ohne Persistenz weiter.
    }
  }, [key, value]);

  const clear = useCallback(() => {
    localStorage.removeItem(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return { value, setValue, clear };
}
