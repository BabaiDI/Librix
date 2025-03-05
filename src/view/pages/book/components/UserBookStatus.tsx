import supabase from "@services/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Enums, Tables } from "src/database.types";
import { useUser } from "@context/UserContext";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface LibraryTypes {
  bookId: Tables<"book">["id"];
  userId: User["id"] | undefined;
}

const statuses = [
  { name: "Хочу прочитать", type: "want to read" },
  { name: "Читаю", type: "reading" },
  { name: "Прочитано", type: "read" },
  { name: "На паузе", type: "on hold" },
  { name: "Отложено", type: "dropped" },
];

export default function UserBookStatus({ bookId, userId }: LibraryTypes) {
  const { openAuthModal } = useUser();
  const [status, setStatus] = useState<Enums<"book_status_enum"> | null>(null);

  const handleChangeUserBookStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!userId) {
      openAuthModal();
      return;
    }

    const selectedStatus = e.target.value as Enums<"book_status_enum">;
    setStatus(selectedStatus);

    supabase
      .from("user_book_status")
      .upsert({ book_id: bookId, user_id: userId, status: selectedStatus })
      .select()
      .then(({ error, status }) => {
        if (error) {
          console.log("Error while upsert user book status:", error);
          loadStatusFromDB();
          return;
        }

        console.log("Upsert user book status:", status);
      });
  };

  const handleRemoveUserBookStatus = () => {
    if (!userId) {
      openAuthModal();
      return;
    }

    setStatus(null);

    supabase
      .from("user_book_status")
      .delete()
      .eq("book_id", bookId)
      .eq("user_id", userId)
      .select()
      .then(({ error, status }) => {
        if (error) {
          console.error("Error while removing user book status:", error);
          loadStatusFromDB();
          return;
        }

        console.log("Deleted user book status:", status);
      });
  };

  const loadStatusFromDB = () => {
    if (userId && bookId) {
      supabase
        .from("user_book_status")
        .select("status")
        .eq("book_id", bookId)
        .eq("user_id", userId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error(error);
            setStatus(null);
            return;
          }

          setStatus(data.status);
        });
    }
  };

  useEffect(() => {
    loadStatusFromDB();

    const userBookStatusChannel = supabase
      .channel("userBookStatus")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_book_status",
          filter: `book_id=eq.${bookId}`,
        },
        (payload) => {
          switch (payload.eventType) {
            case "UPDATE":
            case "INSERT":
              setStatus(payload.new.status);
              return;
            case "DELETE":
              setStatus(null);
              return;
          }
        }
      )
      .subscribe();

    return () => {
      userBookStatusChannel.unsubscribe();
    };
  }, [userId, bookId]);

  return (
    <div>
      <div className="flex items-stretch min-h-[40px] relative">
        <div className="relative w-full">
          <select
            className={`bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 w-full shadow-md appearance-none focus:outline-none transition ${
              status === null ? "rounded-lg" : "rounded-l-lg"
            }`}
            value={status ?? "default"}
            onChange={handleChangeUserBookStatus}
          >
            <option value="default" hidden>
              Добавить в библиотеку
            </option>
            {statuses.map((status) => (
              <option key={status.type} value={status.type} className="w-full">
                {status.name}
              </option>
            ))}
          </select>

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDownIcon className="w-5 h-5 text-white" />
          </div>
        </div>

        {status !== null && (
          <button
            className="bg-gray-600 hover:bg-gray-700 border-l border-gray-500 text-white px-3 flex items-center justify-center rounded-r-lg focus:outline-none transition"
            onClick={handleRemoveUserBookStatus}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
