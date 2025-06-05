import { useUser } from "@context/UserContext";
import { HeartIcon } from "@heroicons/react/16/solid";
import supabase from "@services/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface FavoriteProps {
  userId: User["id"] | undefined;
  bookId: number;
}

const Favorite = ({ userId, bookId }: FavoriteProps) => {
  const { user } = useUser();

  const handleAddToFavorites = () => {
    if (!userId) return;

    supabase
      .from("user_book_favorite")
      .insert({ book_id: bookId, user_id: userId })
      .then(({ error }) => {
        if (error) {
          console.error("Error adding to favorites:", error);
        } else {
          console.log(`Added book ${bookId} to favorites for user ${userId}`);
          setIsFavorite(true);
        }
      });
  };

  const handleRemoveFromFavorites = () => {
    if (!userId) return;

    supabase
      .from("user_book_favorite")
      .delete()
      .eq("user_id", userId)
      .eq("book_id", bookId)
      .then(({ error }) => {
        if (error) {
          console.error("Error removing from favorites:", error);
        } else {
          console.log(`Removed book ${bookId} from favorites for user ${userId}`);
          setIsFavorite(false);
        }
      });
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFromFavorites();
    } else {
      handleAddToFavorites();
    }
  };

  useEffect(() => {
    if (!userId) return;

    supabase
      .from("user_book_favorite")
      .select("*")
      .eq("user_id", userId)
      .eq("book_id", bookId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching favorite status:", error);
          return;
        }

        setIsFavorite(!!data);
      });
  }, [userId, bookId]);

  return (
    <button
      onClick={toggleFavorite}
      className="absolute bottom-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full transition"
      title={isFavorite ? "Прибрати з улюблених" : "Додати в улюблені"}
    >
      <HeartIcon
        className="w-8 h-8 transition"
        fill={isFavorite ? "red" : "none"}
        stroke="red"
        strokeWidth={1.5}
      />
    </button>
  );
};

export default Favorite;
