import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SUCCESS_CONTENT } from '@/config/constants';
import { CalendarEmbed } from '@/components/onboarding/CalendarEmbed';

/**
 * Zeigt den animierten Erfolgs-Haken. Nach Klick auf "Termin auswählen"
 * schiebt sich der Inhalt nach oben und der Kalender erscheint darunter –
 * ohne Seitenwechsel oder Reload.
 */
export function SuccessScreen() {
  const [calendarVisible, setCalendarVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mx-auto mb-[18px] flex h-14 w-14 items-center justify-center rounded-full bg-brand-light"
      >
        <Check className="h-7 w-7 text-brand" aria-hidden="true" />
      </motion.div>

      <h2 className="mb-2 text-lg font-medium text-ink-900">{SUCCESS_CONTENT.title}</h2>
      <p className="mb-5 whitespace-pre-line text-sm leading-relaxed text-ink-500">
        {SUCCESS_CONTENT.body}
      </p>

      {!calendarVisible && (
        <button
          type="button"
          onClick={() => setCalendarVisible(true)}
          className="rounded-control bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
        >
          {SUCCESS_CONTENT.cta}
        </button>
      )}

      {calendarVisible && <CalendarEmbed />}
    </motion.div>
  );
}
