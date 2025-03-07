import { useCallback, useMemo, useState } from "react";
import ValueBar from "@shared/ValueBar";
import { Database, Enums } from "src/database.types";
import { BookOpenIcon, CheckIcon, PauseIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface StatisticProps {
  bookRatingCountGrouped:
    | Database["public"]["Functions"]["get_book_rating_count_grouped"]["Returns"]
    | null;
  bookStatusCountGrouped:
    | Database["public"]["Functions"]["get_book_status_count_grouped"]["Returns"]
    | null;
}

export default function Statistic({
  bookRatingCountGrouped,
  bookStatusCountGrouped,
}: StatisticProps) {
  const [selectedStatistic, setSelectedStatistic] = useState<"Rating" | "Status">("Rating");

  const toggleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatistic(e.target.value as "Rating" | "Status");
  };

  const maxCount = useCallback((arr: { count: number }[] = []) => {
    return Math.max(0, ...arr.map(({ count }) => count));
  }, []);

  const statusItemsList = useMemo(() => {
    const getIconByReadStatus = (status: Enums<"book_status_enum">) => {
      const iconSize = "size-6";

      switch (status) {
        case "read":
          return <CheckIcon className={iconSize} />;
        case "reading":
          return <BookOpenIcon className={iconSize} />;
        case "want to read":
          return <PlusIcon className={iconSize} />;
        case "on hold":
          return <PauseIcon className={iconSize} />;
        case "dropped":
          return <XMarkIcon className={iconSize} />;
      }
    };

    const color = {
      read: { main: "bg-green-500", bg: "bg-green-900" },
      reading: { main: "bg-blue-500", bg: "bg-blue-900" },
      "want to read": { main: "bg-yellow-500", bg: "bg-yellow-800" },
      "on hold": { main: "bg-gray-500", bg: "bg-gray-700" },
      dropped: { main: "bg-red-500", bg: "bg-red-900" },
    };

    const maxStatusCount = maxCount(bookStatusCountGrouped ?? []);

    return bookStatusCountGrouped?.map(({ status, count }, index) => (
      <li key={index}>
        <ValueBar
          value={getIconByReadStatus(status)}
          count={count}
          bgSlideClass={color[status].bg}
          slideClass={color[status].main}
          maxCountRating={maxStatusCount}
        />
      </li>
    ));
  }, [bookStatusCountGrouped]);

  const ratingItemsList = useMemo(() => {
    const maxRatingCount = maxCount(bookRatingCountGrouped ?? []);

    return bookRatingCountGrouped?.map(({ rating, count }, index) => (
      <li key={index}>
        <ValueBar value={rating.toString()} count={count} maxCountRating={maxRatingCount} />
      </li>
    ));
  }, [bookRatingCountGrouped]);

  return (
    <div className="flex flex-col gap-2">
      <strong className="mb-2 text-xl">Статистика</strong>
      <div className="flex gap-2 text-white p-2 bg-gray-700 rounded-xl">
        <StatisticsRadioButtonItem
          text="Рейтинг"
          value="Rating"
          valueSelected={selectedStatistic}
          onChange={toggleVisibility}
        />
        <StatisticsRadioButtonItem
          text="Списки"
          value="Status"
          valueSelected={selectedStatistic}
          onChange={toggleVisibility}
        />
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <ul className="flex flex-col gap-3">
          {selectedStatistic === "Status" && statusItemsList}
          {selectedStatistic === "Rating" && ratingItemsList}
        </ul>
      </div>
    </div>
  );
}

interface StatisticsRadioButtonProps {
  value: string;
  text: string;
  valueSelected: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function StatisticsRadioButtonItem({
  value,
  text,
  valueSelected,
  onChange,
}: StatisticsRadioButtonProps) {
  return (
    <label
      key={value}
      className="w-full text-center py-1 cursor-pointer transition-all duration-300 ease-in-out rounded-md has-checked:bg-gray-600 hover:bg-gray-700"
    >
      <input
        type="radio"
        name="statistic"
        value={value}
        hidden
        checked={valueSelected === value}
        onChange={onChange}
        readOnly
      />
      {text}
    </label>
  );
}
