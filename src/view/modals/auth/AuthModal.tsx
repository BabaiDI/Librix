import { useEffect, useState } from "react";
import Modal from "@shared/Modal";
import Button from "@shared/Button";
import { ErrorMessage } from "@shared/ErrorMessage";
import RegisterForm from "./components/Resister";
import LoginForm from "./components/Login";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [emailConfirmation, setEmailConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCloseModal = () => {
    setError(null);
    setIsRegistering(false);
    onClose();
  };

  useEffect(() => {
    setError(null);
  }, [isRegistering, emailConfirmation]);

  if (emailConfirmation) {
    return (
      <Modal
        title="Підтвердження пошти"
        isOpen={emailConfirmation}
        onClose={() => setEmailConfirmation(false)}
      >
        <div className="p-4 rounded-lg text-center text-white">
          Підтвердіть ваш email. Перевірте вашу пошту для активації.
        </div>
        <div className="text-center space-x-4 mt-4">
          <Button
            onClick={() => {
              setEmailConfirmation(false);
              setIsRegistering(false);
            }}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Ввійти
          </Button>
          <Button
            onClick={() => {
              setEmailConfirmation(false);
              onCloseModal();
            }}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Закрити
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title={isRegistering ? "Реєстрація" : "Вхід"}
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <div className={`p-6 flex flex-col items-center ${error && "pt-0"}`}>
        {error && <ErrorMessage message={error} />}
        {isRegistering ? (
          <RegisterForm
            onClose={onCloseModal}
            onEmailConfirmation={() => setEmailConfirmation(true)}
            setErrorMessage={setError}
          />
        ) : (
          <LoginForm onClose={onCloseModal} setErrorMessage={setError} />
        )}
        <Button
          onClick={() => setIsRegistering((prev) => !prev)}
          className="mt-4 text-gray-200 hover:underline"
        >
          {isRegistering
            ? "Вже є аккаунт? Війти"
            : "Немає аккаунта? Зареєструватися"}
        </Button>
      </div>
    </Modal>
  );
};
