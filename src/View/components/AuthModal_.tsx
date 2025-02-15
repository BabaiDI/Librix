import { useState } from "react";
import { useUser } from "../../Context/UserContext";
import Modal from "./Modal";

export interface AuthModalType {
  isOpen: boolean;
  onClose: () => void;
}

function RegisterForm({ onClose }: { onClose: () => void }) {
  return <div className="text-center">is Registration</div>;
}

function LoginForm({ onClose }: { onClose: () => void }) {
  const { signIn } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    signIn(email, password)
      .then(() => onClose())
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border p-2 w-64"
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <input
        className="border p-2 w-64"
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Login
      </button>
    </form>
  );
}

export const AuthModal = ({ isOpen, onClose }: AuthModalType) => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isRegistering ? (
        <RegisterForm onClose={onClose} />
      ) : (
        <LoginForm onClose={onClose} />
      )}
      <button onClick={() => setIsRegistering((prev) => !prev)}>
        Go to {isRegistering ? "Login" : "Registering"}
      </button>
    </Modal>
  );
};
