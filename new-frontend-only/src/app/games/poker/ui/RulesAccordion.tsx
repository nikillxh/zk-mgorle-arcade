import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function RulesAccordion({
  title,
  rules,
  defaultOpen = false,
}: {
  title: string;
  rules: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  return (
    <div className="border-t border-t-gray-700 py-5 last:border-b last:border-b-gray-700">
      <div
        className="flex cursor-pointer flex-row items-center justify-between font-medium text-lg text-blue-400 hover:text-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>

        <motion.svg
          width="22"
          height="12"
          viewBox="0 0 22 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
        >
          <path
            d="M1 11L11 1L21 11"
            stroke="#D2FF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
            className="flex items-center justify-start overflow-hidden pt-3 text-sm text-gray-300"
          >
            <div>{rules}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
