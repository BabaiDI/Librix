import { StarIcon } from "@heroicons/react/24/solid";

const defaultCover =
  "https://i.pinimg.com/736x/29/e9/0f/29e90fbcac66748657516eb12f85832c.jpg";

interface BookCoverProps {
  title: string;
  coverUrl: string | null;
  rating: number | null;
  year: number;
}

export default function BookCover({
  title,
  coverUrl,
  rating,
  year,
}: BookCoverProps) {
  return (
    <div
      className="relative flex flex-col justify-end p-4 shadow-lg rounded-2xl aspect-[9/16] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${coverUrl ?? defaultCover})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl"></div>

      <div
        className="absolute flex items-center top-2 right-2 bg-black/70 px-2 py-1 text-sm font-bold rounded-lg"
        aria-label="Рейтинг"
      >
        <StarIcon fill="currentColor" className="size-5 text-amber-300 mr-1" />
        {rating ? rating.toFixed(1) : "—"}
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <span className="text-sm opacity-80">{year}</span>
      </div>
    </div>
  );
}
