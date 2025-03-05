interface InfoPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string | null;
}

export default function InfoPanel({
  title,
  children,
  className = null,
}: InfoPanelProps) {
  return (
    <div className={`bg-gray-800 p-4 rounded-lg shadow-md h-full ${className}`}>
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <div className="text-white font-semibold">{children}</div>
    </div>
  );
}
