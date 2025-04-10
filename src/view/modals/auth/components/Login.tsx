import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef, useState } from "react";
import Button from "@shared/Button";
import { InputField } from "@shared/InputField";
import { useUser } from "@context/UserContext";

interface LoginFormProps {
  onClose: () => void;
  setErrorMessage: (message: string | null) => void;
}

export default function LoginForm({ onClose, setErrorMessage }: LoginFormProps) {
  const { signIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!captchaToken) {
      setErrorMessage("Підтвердіть що ви не робот.");
      return;
    }

    signIn(email, password, captchaToken)
      .then(() => onClose())
      .catch((error) => {
        setErrorMessage(error?.message || "Ошибка входа");
        captchaRef.current?.resetCaptcha();
      });
  };

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
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
          theme="dark"
          ref={captchaRef}
        />
        <Button onClick={() => {}} className="bg-green-500 text-white hover:bg-green-600">
          Війти
        </Button>
      </form>
    </div>
  );
}
