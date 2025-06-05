const defaultCover = "/default-cover.jpg";

interface AuthorCardProps {
  imageCover: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
}

export default function AuthorCard({
  imageCover,
  firstName,
  middleName = "",
  lastName,
}: AuthorCardProps) {
  return (
    <div
      className="relative flex flex-col justify-end p-6 shadow-xl rounded-2xl aspect-[9/16] bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${imageCover ?? defaultCover})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-1">
          {firstName} {middleName} {lastName}
        </h3>
      </div>
    </div>
  );
}
