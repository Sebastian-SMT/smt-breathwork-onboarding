import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '@/config/constants';

interface ProgressBarProps {
  currentStepIndex: number; // 0-basiert
}

/** Zeigt "Schritt X von 7" plus animierten Fortschrittsbalken. */
export function ProgressBar({ currentStepIndex }: ProgressBarProps) {
  const percent = ((currentStepIndex + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="mb-7">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink-500">
          Schritt {currentStepIndex + 1} von {TOTAL_STEPS}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-ink-border">
        <motion.div
          className="h-full rounded-full bg-brand"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
