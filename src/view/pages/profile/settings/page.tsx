import ProfileAvatarEditor from "./components/ImageUploader";
import { useUser } from "@context/UserContext";
import { useState } from "react";
import supabase from "@services/supabaseClient";
import { useNavigate } from "react-router";

export default function page() {
  const { profile } = useUser();

  const [name, setName] = useState(profile?.name || "");
  const [file, setFile] = useState<File | null>(null);

  if (!profile) {
    return <div>You need to log in to view your profile settings.</div>;
  }

  const handleUpload = async () => {
    if (file) {
      const { error } = await supabase.storage
        .from("profile_pictures")
        .upload(`${profile.id}.png`, file, { upsert: true });

      if (error) {
        console.error("Ошибка загрузки изображения:", error.message);
      }
    }

    if (name !== profile.name) {
      const { error } = await supabase.from("profile").update({ name }).eq("id", profile.id);

      if (error) {
        console.error("Ошибка обновления имени:", error.message);
      }
    }

    window.location.reload();
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>

      <ProfileAvatarEditor profile={profile} setFile={setFile} />
      <input
        type="text"
        placeholder="Change your name"
        className="mt-4 p-2 border border-gray-300 rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleUpload}
      >
        Save Changes
      </button>
    </>
  );
}
