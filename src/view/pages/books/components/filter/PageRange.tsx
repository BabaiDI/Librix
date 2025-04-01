import { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import supabase from "@services/supabaseClient";

type PageRangeProps = {
  from: number;
  setFrom: (value: number | null) => void;
  to: number;
  setTo: (value: number | null) => void;
};

export default function PageRange({ from, setFrom, to, setTo }: PageRangeProps) {
  const [pagesMin, setPagesMin] = useState<number>();
  const [pagesMax, setPagesMax] = useState<number>();

  useEffect(() => {
    supabase
      .from("book")
      .select("pages")
      .order("pages", { ascending: true })
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error || !data.pages) {
          return;
        }

        setPagesMin(data.pages);
        if (from === 0 || from < data.pages) setFrom(data.pages);
      });

    supabase
      .from("book")
      .select("pages")
      .order("pages", { ascending: false })
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error || !data.pages) {
          return;
        }

        setPagesMax(data.pages);
        if (to === 0 || to > data.pages) setTo(data.pages);
      });
  }, []);

  return (
    <div className="space-y-3">
      <label htmlFor="pages_range" className="text-white">
        Сторінок:
      </label>
      <MultiRangeSlider
        min={pagesMin}
        max={pagesMax}
        step={1}
        minValue={from || pagesMin}
        maxValue={to || pagesMax}
        ruler={false}
        onInput={(e) => {
          setFrom(e.minValue === e.min ? null : e.minValue);
          setTo(e.maxValue === e.max ? null : e.maxValue);

          console.log("page: ", `${e.minValue}: ${e.min}`, `${e.maxValue}: ${e.max}`);
        }}
      />
    </div>
  );
}
