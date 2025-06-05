import { Tables } from "@consts/database.types";
import useProfileAvatar from "@hooks/useProfileAvatar";

export default function Profile({ profile }: { profile: Tables<"profile"> }) {
  const profileAvatar = useProfileAvatar(profile.id, profile.name);

  return (
    <div className="flex items-center mb-4 gap-4">
      <div className="relative w-24 h-24 rounded-full bg-gray-700 overflow-hidden">
        <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div className="text-xl">{profile.name}</div>
    </div>
  );
}
