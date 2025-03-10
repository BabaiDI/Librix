import { useUser } from "@context/UserContext";
import supabase from "@services/supabaseClient";
import { useEffect, useState } from "react";
import { Tables } from "src/consts/database.types";
import ImageUploader from "./components/ImageUploader";

function Profile() {
  const { user, profile } = useUser();

  console.log(profile);

  if (!user || !profile) {
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

  const handleCropComplete = (croppedFile: File) => {
    console.log("Обрезанное изображение:", croppedFile);

    supabase.storage
      .from("profile_pictures")
      .upload(`${profile.id}.png`, croppedFile, {
        upsert: true,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        console.log(data);
      });
  };

  return (
    <>
      <>
        <title>{`Librix | Профиль`}</title>
        <meta name="description" content="Profile page" />
      </>
      <p>ID: {user.id}</p>
      <p>Name: {profile.name}</p>
      <p>Email: {user.email}</p>
      <ImageUploader onCropComplete={handleCropComplete} />
      <div>
        <ul>
          {bookStatus.map(({ book, status }) => (
            <li key={book.id} className="border-2">
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
