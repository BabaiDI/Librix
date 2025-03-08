import ValueBar from "@shared/ValueBar";
import { memo } from "react";
import { Database } from "src/database.types";

interface RatingItemsListProps {
  items: Database["public"]["Functions"]["get_book_rating_count_grouped"]["Returns"] | null;
}

function RatingItemsList({ items }: RatingItemsListProps) {
  const maxRatingCount = Math.max(0, ...(items ?? []).map(({ count }) => count));

  return items?.map(({ rating, count }) => (
    <li key={rating}>
      <ValueBar value={rating.toString()} count={count} maxCount={maxRatingCount} />
    </li>
  ));
}

export default memo(RatingItemsList);
