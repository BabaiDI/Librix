import { useState } from "react";
import { Database } from "@consts/database.types";
import StatisticButton from "./StatisticButton";
import StatisticRatingList from "./StatisticRatingList";
import StatisticStatusList from "./StatisticStatusList";

interface StatisticProps {
  ratings: Database["public"]["Functions"]["get_book_rating_count_grouped"]["Returns"] | null;
  statuses: Database["public"]["Functions"]["get_book_status_count_grouped"]["Returns"] | null;
}

export default function Statistic({ ratings, statuses }: StatisticProps) {
  const [selectedStatistic, setSelectedStatistic] = useState<"Rating" | "Status">("Rating");

  const toggleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatistic(e.target.value as "Rating" | "Status");
  };

  return (
    <div className="flex flex-col gap-2">
      <strong className="mb-2 text-xl">Статистика</strong>
      <div className="flex gap-2 text-white p-2 bg-gray-700 rounded-xl">
        <StatisticButton
          text="Рейтинг"
          value="Rating"
          valueSelected={selectedStatistic}
          onChange={toggleVisibility}
        />
        <StatisticButton
          text="Списки"
          value="Status"
          valueSelected={selectedStatistic}
          onChange={toggleVisibility}
        />
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <ul className="flex flex-col gap-3">
          {selectedStatistic === "Status" && <StatisticStatusList items={statuses} />}
          {selectedStatistic === "Rating" && <StatisticRatingList items={ratings} />}
        </ul>
      </div>
    </div>
  );
}
