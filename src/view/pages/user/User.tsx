import ImageUploader from "./components/ImageUploader";
import BookList from "./components/BookList";
import { useLoaderData } from "react-router";

const Profile = () => {
  const { profile } = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg space-y-8">
      {/* Блок информации о аккаунте */}
      <div className="bg-gray-700 p-6 rounded-lg shadow">
        <div className="flex items-center space-x-6">
          <ImageUploader profile={profile} />
          <div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
          </div>
        </div>
      </div>

      <BookList user_id={profile.id} />

      <div className="bg-gray-700 p-6 rounded-lg shadow">TODO</div>
    </div>
  );
};

export default Profile;
