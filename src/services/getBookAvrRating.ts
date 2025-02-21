import { Tables } from "../database.types";

export default function getBookAvrRating(
  data: Tables<"book_rating">[]
): number | null {
  if (data.length == 0) {
    return null;
  }

  const ratingSum = data.reduce(
    (sum: number, { rating }: { rating: number }) => sum + rating,
    0
  );

  const averageRating = ratingSum / data.length;

  return averageRating;
}
