import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useProfileAvatar from "@hooks/useProfileAvatar";
import supabase from "@services/supabaseClient";
import ImageCropper from "@shared/ImageCropper";
import { T } from "node_modules/tailwindcss/dist/types-B254mqw1.mjs";
import { Tables } from "@consts/database.types";

interface ProfileAvatarEditorProps {
  profile: Tables<"profile">;
  setFile: (file: File) => void;
}

export default function ProfileAvatarEditor({ profile, setFile }: ProfileAvatarEditorProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const profileAvatar = useProfileAvatar(profile.id, profile.name);

  return (
    <div>
      <div
        onClick={() => setModalOpen(true)}
        className="relative w-24 h-24 rounded-full bg-gray-700 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all duration-300"
      >
        <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <PencilIcon className="w-6 h-6 text-white" />
        </div>
      </div>

      <ImageCropper
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCropComplete={setFile}
      />
    </div>
  );
}
