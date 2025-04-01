import { Tables } from "@consts/database.types";
import supabase from "@services/supabaseClient";
import { useEffect, useState } from "react";

const bucket = "profile_pictures";

export default function useProfileAvatar(userId: Tables<"profile">["id"], avatarTapmlate: string) {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(avatarTapmlate)}`
  );

  useEffect(() => {
    const filename = `${userId}.png`;

    supabase.storage
      .from(bucket)
      .exists(filename)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        if (data) {
          setAvatarUrl(supabase.storage.from(bucket).getPublicUrl(filename).data.publicUrl);
        }
      });
  }, [userId]);

  return avatarUrl;
}
