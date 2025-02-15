import { useState } from "react";
import { useUser } from "../../Context/UserContext";
import Modal from "./Modal";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RegisterForm({ onClose }: { onClose: () => void }) {
  const { signUp } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Сбрасываем старую ошибку

    signUp(email, password)
      .then(() => onClose())
      .catch((res) => setError(res.error.message));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border p-2 w-64"
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <input
        className="border p-2 w-64"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}

function LoginForm({ onClose }: { onClose: () => void }) {
  const { signIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Очистка перед отправкой
    try {
      await signIn(email, password);
      onClose();
    } catch (error: any) {
      setError(error?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border p-2 w-64"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-64"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 flex flex-col items-center">
        {isRegistering ? (
          <RegisterForm onClose={onClose} />
        ) : (
          <LoginForm onClose={onClose} />
        )}
        <button
          onClick={() => setIsRegistering((prev) => !prev)}
          className="mt-4 text-blue-500 hover:underline"
        >
          {isRegistering ? "Go to Login" : "Go to Register"}
        </button>
      </div>
    </Modal>
  );
};
