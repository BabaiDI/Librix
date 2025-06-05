import MultiRangeSlider from "multi-range-slider-react";

type RatingRangeProps = {
  from: number;
  setFrom: (value: number | null) => void;
  to: number;
  setTo: (value: number | null) => void;
};

export default function RatingRange({ from, setFrom, to, setTo }: RatingRangeProps) {
  const minRating = 0;
  const maxRating = 10;

  return (
    <div className="space-y-3">
      <label htmlFor="rating_range" className="text-white">
        Рейтинг:
      </label>
      <MultiRangeSlider
        min={minRating}
        max={maxRating}
        step={1}
        minValue={from || minRating}
        maxValue={to || maxRating}
        ruler={false}
        onInput={(e) => {
          setFrom(e.minValue === minRating ? null : e.minValue);
          setTo(e.maxValue === maxRating ? null : e.maxValue);
        }}
      />
    </div>
  );
}
