import supabase from "@services/supabaseClient";

const defaultCover = "/default-cover.jpg";

interface BookCoverProps {
  cover_url: string | null;
  title: string;
}

export default function BookCover({ cover_url, title }: BookCoverProps) {
  const imageCover = cover_url
    ? supabase.storage.from("book_covers").getPublicUrl(cover_url).data.publicUrl
    : defaultCover;

  console.log(imageCover);

  return (
    <div
      className="relative flex flex-col justify-end p-6 shadow-xl rounded-2xl aspect-[9/16] bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${imageCover})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
      </div>
    </div>
  );
}
