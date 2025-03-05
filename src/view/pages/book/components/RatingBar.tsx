interface RatingBarProps {
  value: any;
  count: number;
  maxCountRating: number;
}

export default function RatingBar({
  value,
  count,
  maxCountRating,
}: RatingBarProps) {
  const width = maxCountRating !== 0 ? (count / maxCountRating) * 100 : 0;

  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <span className="w-6 h-6 aspect-square p-0.5 flex items-center justify-center text-white bg-gray-500 rounded-md tabular-nums">
        {value}
      </span>
      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${width}%`,
          }}
        ></div>
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
