import { Enums, Tables } from "src/consts/database.types";
import { useUser } from "@context/UserContext";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import supabase from "@services/supabaseClient";

interface LibraryTypes {
  bookId: Tables<"book">["id"];
  userId: Tables<"profile">["id"] | undefined;
}

const statuses = [
  { label: "Хочу прочести", type: "want to read" },
  { label: "Читаю", type: "reading" },
  { label: "Прочитано", type: "read" },
  { label: "На паузі", type: "on hold" },
  { label: "Відкладено", type: "dropped" },
];

export default function UserBookStatus({ bookId, userId }: LibraryTypes) {
  const { openAuthModal } = useUser();
  const [status, setStatus] = useState<Enums<"book_status_enum"> | null>(null);

  const updateStatus = async (newStatus: Enums<"book_status_enum">) => {
    if (!userId) return;

    const { error } = await supabase
      .from("user_book_status")
      .upsert({ book_id: bookId, user_id: userId, status: newStatus });

    if (!error) {
      setStatus(newStatus);
    }
  };

  const removeStatus = async () => {
    if (!userId) return;

    const { error } = await supabase.from("user_book_status").delete().eq("book_id", bookId);

    if (!error) {
      setStatus(null);
    }
  };

  useEffect(() => {
    if (!userId) return;

    supabase
      .from("user_book_status")
      .select("status")
      .eq("book_id", bookId)
      .eq("user_id", userId)
      .single()
      .then(({ data, error }) => {
        if (!error) {
          setStatus(data.status);
        }
      });
  }, [userId, bookId]);

  const handleChangeUserBookStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!userId) {
      openAuthModal();
      return;
    }

    updateStatus(e.target.value as Enums<"book_status_enum">);
  };

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
              "Добавити в бібліотеку"
            </option>
            {statuses.map((status) => (
              <option key={status.type} value={status.type} className="w-full">
                {status.label}
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
            onClick={removeStatus}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
