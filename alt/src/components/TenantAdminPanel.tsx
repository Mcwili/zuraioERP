import { motion, AnimatePresence } from "motion/react";
import { TenantSidebar } from "./TenantSidebar";

interface TenantAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
}

export function TenantAdminPanel({ isOpen, onClose, currentPage, onNavigate, isDarkMode }: TenantAdminPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          exit={{ x: -400 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
          className="fixed left-0 top-16 bottom-0 z-40 w-full sm:w-[400px]"
          style={{
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <TenantSidebar
            currentPage={currentPage}
            onNavigate={onNavigate}
            isDarkMode={isDarkMode}
            onToggle={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}