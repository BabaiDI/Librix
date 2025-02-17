export const Button = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
}) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded-lg transition-all ${className}`}
  >
    {children}
  </button>
);
