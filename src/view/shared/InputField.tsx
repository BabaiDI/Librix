interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const InputField = ({
  type,
  value,
  onChange,
  placeholder,
}: InputFieldProps) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="bg-gray-700 text-white border border-gray-600 p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
    required
  />
);
