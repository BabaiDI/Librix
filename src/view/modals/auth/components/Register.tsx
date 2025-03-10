import { useRef, useState } from "react";
import { useUser } from "@context/UserContext";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Button from "@shared/Button";
import { InputField } from "@shared/InputField";

interface RegisterFormProps {
  onClose: () => void;
  onEmailConfirmation: () => void;
  setErrorMessage: (message: string | null) => void;
}

export default function RegisterForm({
  onClose,
  setErrorMessage,
  onEmailConfirmation,
}: RegisterFormProps) {
  const { signUp } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!captchaToken) {
      setErrorMessage("Підтвердіть що ви не робот.");
      return;
    }

    signUp(email, password, username, captchaToken)
      .then((res) => {
        if (!res.needsConfirmation) {
          onClose();
        }
        onEmailConfirmation();
      })
      .catch((res) => {
        setErrorMessage(res.message);
        captchaRef.current?.resetCaptcha();
      });
  };

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <HCaptcha
          sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
          onVerify={setCaptchaToken}
          onExpire={() => setCaptchaToken(null)}
          onError={(err) => console.error("Ошибка капчи:", err)}
          ref={captchaRef}
        />
        <Button onClick={() => {}} className="bg-blue-500 text-white hover:bg-blue-600">
          Зареєструватися
        </Button>
      </form>
    </div>
  );
}
