import { Tables } from "@consts/database.types";

const defaultCover = "/default-cover.jpg";

export default function AuthorCover({ author }: { author: Tables<"author"> }) {
  return (
    <div
      className="relative flex flex-col justify-end p-6 shadow-xl rounded-2xl aspect-[9/16] bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${author.image_url ?? defaultCover})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-1">
          {author.first_name} {author.middle_name ?? ""} {author.last_name}
        </h3>
      </div>
    </div>
  );
}
