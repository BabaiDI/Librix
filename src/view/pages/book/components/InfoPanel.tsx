interface InfoPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string | null;
}

export default function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <h3 className="text-wrap">{title}</h3>
      <div className="flex-auto">{children}</div>
    </div>
  );
}
