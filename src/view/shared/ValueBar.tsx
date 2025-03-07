interface RatingBarProps {
  value: any;
  count: number;
  maxCountRating: number;
  bgSlideClass?: string;
  slideClass?: string;
}

export default function ValueBar({
  value,
  count,
  maxCountRating,
  bgSlideClass = "bg-blue-900",
  slideClass = "bg-blue-500",
}: RatingBarProps) {
  const width = maxCountRating !== 0 ? (count / maxCountRating) * 100 : 0;

  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <span className="w-6 h-6 aspect-square p-0.5 flex items-center justify-center text-white bg-gray-700 rounded-md tabular-nums">
        {value}
      </span>
      <div className={`h-2.5 rounded-full w-full overflow-hidden ${bgSlideClass}`}>
        <div
          className={`h-2.5 rounded-full ${slideClass}`}
          style={{
            width: `${width}%`,
          }}
        />
      </div>

      <span
        className="tabular-nums text-right text-gray-300 text-sm"
        style={{
          minWidth: `${maxCountRating.toLocaleString().length}ch`,
        }}
      >
        {count.toLocaleString()}
      </span>
    </div>
  );
}
