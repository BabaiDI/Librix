import { useUser } from "@context/UserContext";
import { StarIcon } from "@heroicons/react/24/solid";
import supabase from "@services/supabaseClient";
import { useEffect, useState } from "react";

export default function Rating({ bookId }: { bookId: number }) {
  const { profile } = useUser();

  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (!profile?.id) return;

    supabase
      .from("book_rating")
      .select("rating")
      .eq("book_id", bookId)
      .eq("user_id", profile?.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching rating:", error);
          return;
        }
        setRating(data?.rating ?? null);
      });
  }, [bookId, profile?.id]);

  const handleRatingChange = async (newRating: number) => {
    if (!profile?.id) return;

    const { data, error } = await supabase
      .from("book_rating")
      .upsert({
        book_id: bookId,
        user_id: profile.id,
        rating: newRating,
      })
      .select("rating")
      .single();
    if (error) {
      console.error("Error updating rating:", error);
      return;
    }
    setRating(data?.rating ?? null);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Рейтинг</h3>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(star)}
            className={`text-2xl ${
              rating !== null && rating >= star ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            <StarIcon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
}
