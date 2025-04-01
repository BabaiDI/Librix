import { Tables } from "@consts/database.types";
import { useUser } from "@context/UserContext";
import useProfileAvatar from "@hooks/useProfileAvatar";
import supabase from "@services/supabaseClient";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user, profile } = useUser();
  const [booksStatus, setBooksStatus] = useState<
    {
      status: Tables<"user_book_status">["status"];
      book: Tables<"book">;
    }[]
  >();

  useEffect(() => {
    if (!user || !profile) return;

    supabase
      .from("user_book_status")
      .select("status, book(*)")
      .eq("user_id", profile.id)
      .then(({ data, error }) => {
        if (error) {
          return;
        }

        setBooksStatus(data);
      });
  }, [user, profile]);

  if (!profile || !user) {
    return <div>Треба війти для перегляду профіля</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <ProfileIcon profile={profile} />
        <div>
          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Мої книги</h3>
        <ul className="space-y-4">
          {!booksStatus ? (
            <p className="text-gray-400">Немає доданих книг</p>
          ) : (
            booksStatus.map((bookStatus) => (
              <li key={bookStatus.book.id} className="p-4 bg-gray-700 rounded-lg shadow">
                <p className="text-lg font-semibold">{bookStatus.book.title}</p>
                <p className="text-gray-400">Статус: {bookStatus.status}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

function ProfileIcon({ profile }: { profile: Tables<"profile"> }) {
  const profileAvatar = useProfileAvatar(profile.id, profile.name);

  return (
    <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden">
      <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
    </div>
  );
}

export default Profile;
