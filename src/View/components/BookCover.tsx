export default function BookCover({
  title,
  cover_url,
  rating,
}: {
  title: string;
  cover_url: string | null;
  rating: number;
}) {
  return (
    <div>
      <img src={cover_url ?? ""} title={title} alt="BookCover" />
      <span>{title}</span>
      <span>{rating}</span>
    </div>
  );
}
