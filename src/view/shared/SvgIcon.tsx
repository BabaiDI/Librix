interface SvgIconProps {
  d: string;
  className?: string;
  fill: string;
}

export default function SvgIcon({ d, className, fill }: SvgIconProps) {
  return (
    <svg
      className={className}
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
