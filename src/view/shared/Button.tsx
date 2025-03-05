interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
}

export default function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={`py-2 px-4 rounded-lg transition-all ${className}`}>
      {children}
    </button>
  );
}
