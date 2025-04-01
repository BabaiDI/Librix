import { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import supabase from "@services/supabaseClient";

type YearRangeProps = {
  from: number;
  setFrom: (value: number | null) => void;
  to: number;
  setTo: (value: number | null) => void;
};

export default function YearRange({ from, setFrom, to, setTo }: YearRangeProps) {
  const [publishDateMin, setPublishDateMin] = useState<number>();
  const [publishDateMax, setPublishDateMax] = useState<number>();

  useEffect(() => {
    supabase
      .from("book")
      .select("publish_date")
      .order("publish_date", { ascending: true })
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error || !data.publish_date) {
          return;
        }

        const minDate = new Date(data.publish_date).getFullYear();
        setPublishDateMin(minDate);
        if (from === 0 || from < minDate) setFrom(minDate);
      });

    supabase
      .from("book")
      .select("publish_date")
      .order("publish_date", { ascending: false })
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error || !data.publish_date) {
          return;
        }

        const maxDate = new Date(data.publish_date).getFullYear();
        setPublishDateMax(maxDate);
        if (to === 0 || to > maxDate) setTo(maxDate);
      });
  }, []);

  return (
    <div className="space-y-3">
      <label htmlFor="publish_date_range" className="text-white">
        Дата публікації:
      </label>
      <MultiRangeSlider
        min={publishDateMin}
        max={publishDateMax}
        step={1}
        minValue={from || publishDateMin}
        maxValue={to || publishDateMax}
        ruler={false}
        onInput={(e) => {
          setFrom(e.minValue == e.min ? null : e.minValue);
          setTo(e.maxValue == e.max ? null : e.maxValue);

          console.log("year: ", `${e.minValue}: ${e.min}`, `${e.maxValue}: ${e.max}`);
        }}
      />
    </div>
  );
}
