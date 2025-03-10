import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

function Modal({ children, isOpen, onClose, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-fit rounded-lg shadow-xl transition-all transform scale-95 animate-fade-in"
      >
        <div className="bg-gray-800 rounded-t flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl text-white font-semibold">{title || "Модальне вікно"}</h2>
          <button
            onClick={onClose}
            className="text-purple-500 hover:text-purple-700 transition-colors"
            aria-label="Закрити"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-6"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        <div className="rounded-b p-6 bg-gray-600">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
