import { useUser } from "@context/UserContext";
import supabase from "@services/supabaseClient";
import { useEffect, useState } from "react";
import { Tables } from "src/consts/database.types";

function Profile() {
  const { user } = useUser();

  if (!user) {
    return <div>Треба війти для перегляду профіля</div>;
  }

  const [bookStatus, setBookStatus] = useState<
    {
      status: Tables<"user_book_status">["status"];
      book: Tables<"book">;
    }[]
  >([]);

  useEffect(() => {
    supabase
      .from("user_book_status")
      .select("status, book(*)")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }

        setBookStatus(data);
      });
  }, [user]);

  return (
    <>
      <>
        <title>{`Librix | Профиль`}</title>
        <meta name="description" content="Profile page" />
      </>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <div>
        <ul>
          {bookStatus.map(({ book, status }) => (
            <li className="border-2">
              <p>{book.title}</p>
              {status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Profile;
