import { useTranslation } from "react-i18next";

const SuccessModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        id="success-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-11/12 max-w-sm sm:max-w-md text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="modal-icon mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="48px"
            height="48px"
            color="#28a745"
            className="mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {t("modal_success_title")}
        </h3>
        <p id="modal-desc" className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {t("modal_success_message")}
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
