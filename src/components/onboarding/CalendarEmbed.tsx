import { motion } from 'framer-motion';
import { YOUCANBOOKME_URL } from '@/config/constants';

/**
 * Bindet YouCanBookMe per iframe ein. Kein Seitenwechsel, keine neue URL –
 * erscheint per Animation direkt unterhalb der Erfolgsmeldung.
 */
export function CalendarEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mt-6"
    >
      <iframe
        title="Terminbuchung"
        src={YOUCANBOOKME_URL}
        className="h-[1100px] w-full rounded-control border-0 sm:h-[850px]"
        loading="lazy"
      />
    </motion.div>
  );
}
