import { useUser } from "@context/UserContext";
import { NavLink, Outlet, useSearchParams } from "react-router";
import { Database } from "@consts/database.types";
import useProfileAvatar from "@hooks/useProfileAvatar";
import Profile from "./components/profile";

const bookStatuses: {
  value: Database["public"]["Enums"]["book_status_enum"] | null;
  label: string;
}[] = [
  { value: null, label: "Всі книги" },
  { value: "reading", label: "Читаю" },
  { value: "read", label: "Прочитано" },
  { value: "want to read", label: "Заплановано" },
  { value: "on hold", label: "На паузі" },
  { value: "dropped", label: "Кинуто" },
];

const page = () => {
  const { profile } = useUser();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  if (!profile) {
    return <div>Треба війти для перегляду профіля</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg space-y-8">
      <div className="bg-gray-700 p-6 rounded-lg shadow">
        <Profile profile={profile} />

        <div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <NavLink
              key={"/profile/favorite"}
              to={`/profile/favorite`}
              className={({ isActive }) =>
                `col-span-2 px-4 py-1.5 rounded transition font-medium ${
                  isActive ? "bg-gray-500 text-white" : "bg-gray-600 hover:bg-gray-500"
                }`
              }
            >
              Улюблені книги
            </NavLink>
            {bookStatuses.map((s) => (
              <NavLink
                key={s.value}
                to={`/profile/list` + (s.value ? `?status=${s.value}` : "")}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded transition font-medium ${
                    isActive && status == s.value
                      ? "bg-gray-500 text-white"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`
                }
              >
                {s.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default page;
