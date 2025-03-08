import { Database, Enums } from "@consts/database.types";
import { CheckIcon, BookOpenIcon, PlusIcon, PauseIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ValueBar from "@shared/ValueBar";
import { memo } from "react";

interface StatusItemsListProps {
  items: Database["public"]["Functions"]["get_book_status_count_grouped"]["Returns"] | null;
}

const ICONS: Record<Enums<"book_status_enum">, React.ElementType> = {
  read: CheckIcon,
  reading: BookOpenIcon,
  "want to read": PlusIcon,
  "on hold": PauseIcon,
  dropped: XMarkIcon,
};

const COLORS: Record<Enums<"book_status_enum">, { main: string; bg: string }> = {
  read: { main: "bg-green-500", bg: "bg-green-900" },
  reading: { main: "bg-blue-500", bg: "bg-blue-900" },
  "want to read": { main: "bg-yellow-500", bg: "bg-yellow-800" },
  "on hold": { main: "bg-gray-500", bg: "bg-gray-700" },
  dropped: { main: "bg-red-500", bg: "bg-red-900" },
};

function StatusItemsList({ items }: StatusItemsListProps) {
  const maxStatusCount = Math.max(0, ...(items ?? []).map(({ count }) => count));

  return items?.map(({ status, count }) => {
    const Icon = ICONS[status];

    return (
      <li key={status}>
        <ValueBar
          value={<Icon className="size-6" />}
          count={count}
          bgSlideClass={COLORS[status].bg}
          slideClass={COLORS[status].main}
          maxCount={maxStatusCount}
        />
      </li>
    );
  });
}

export default memo(StatusItemsList);
