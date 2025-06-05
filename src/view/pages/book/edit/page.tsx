import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import supabase from "@services/supabaseClient";
import { loaderType } from "./loader";
import { Tables } from "@consts/database.types";
import MultiSelectInput from "@shared/MultiSelectInput";
import { p } from "node_modules/react-router/dist/development/lib-B8x_tOvL.mjs";

export default function page() {
  const navigate = useNavigate();
  const { book, bookAuthor, genre, allAuthors, allGenres } = useLoaderData<loaderType>();

  const [isLoading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(book.title);
  const [description, setDescription] = useState<string>(book.description || "");
  const [language, setLanguage] = useState<string>(book.language || "");
  const [pages, setPages] = useState<number>(book.pages || 0);
  const [publishDate, setPublishDate] = useState<Date>(new Date(book.publish_date ?? ""));
  const [publisherName, setPublisherName] = useState<string>(book.publisher_name ?? "");
  const [selectedAuthors, setSelectedAuthors] = useState<
    { value: Tables<"author">["id"]; label: string }[]
  >(bookAuthor.map((a) => ({ value: a.id, label: a.first_name })));
  const [selectedGenres, setSelectedGenres] = useState<
    { value: Tables<"genre">["id"]; label: string }[]
  >(genre.map((g) => ({ value: g.id, label: g.name })));
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Ви впевнені, що хочете видалити цю книгу?")) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("book").delete().eq("id", book.id);
      if (error) {
        alert("Помилка при видаленні книги");
        return;
      }
      navigate("/books");
    } catch (err) {
      console.error(err);
      alert("Сталася помилка при видаленні книги");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      let newCoverPath = book.cover_url;

      if (coverFile) {
        const fileExt = coverFile.name.split(".").pop();
        const fileName = `${book.id}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("book-covers")
          .upload(fileName, coverFile, { upsert: true });

        if (error) {
          alert("Помилка при завантаженні обкладинки");
          return;
        }
        newCoverPath = data?.path || newCoverPath;
      }

      const { error: bookError } = await supabase
        .from("book")
        .update({
          title,
          description,
          language,
          pages,
          publish_date: publishDate.toISOString(),
          publisher_name: publisherName,
          cover_url: newCoverPath,
        })
        .eq("id", book.id);

      if (bookError) {
        alert("Помилка при збереженні книги");
        return;
      }

      // Обновление авторов
      await supabase.from("book_author").delete().eq("book_id", book.id);
      await supabase
        .from("book_author")
        .insert(selectedAuthors.map(({ value }) => ({ book_id: book.id, author_id: value })));

      // Обновление жанрів
      await supabase.from("book_genre").delete().eq("book_id", book.id);
      await supabase
        .from("book_genre")
        .insert(selectedGenres.map(({ value }) => ({ book_id: book.id, genre_id: value })));

      navigate(`/books/${book.id}`);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-4">Редагувати книгу</h1>

      <div className="flex flex-col gap-4">
        <input
          className="p-2 rounded bg-gray-700 text-white"
          placeholder="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="p-2 rounded bg-gray-700 text-white"
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="p-2 rounded bg-gray-700 text-white"
          placeholder="Мова"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <input
          className="p-2 rounded bg-gray-700 text-white"
          type="number"
          placeholder="Сторінки"
          value={pages}
          onChange={(e) => setPages(Number(e.target.value))}
        />

        <input
          className="p-2 rounded bg-gray-700 text-white"
          type="date"
          value={publishDate.toISOString().split("T")[0]}
          onChange={(e) => setPublishDate(new Date(e.target.value))}
        />

        <input
          className="p-2 rounded bg-gray-700 text-white"
          placeholder="Видавництво"
          value={publisherName}
          onChange={(e) => setPublisherName(e.target.value)}
        />

        <div>
          <label className="text-white block mb-2">Автори</label>
          <MultiSelectInput
            id="authors"
            selected={selectedAuthors}
            setSelected={setSelectedAuthors}
            available={allAuthors.map((a) => ({
              value: a.id,
              label: `${a.first_name} ${a.last_name}`,
            }))}
          />
        </div>

        <div>
          <label className="text-white block mb-2">Жанри</label>
          <MultiSelectInput
            id="genres"
            selected={selectedGenres}
            setSelected={setSelectedGenres}
            available={allGenres.map((g) => ({
              value: g.id,
              label: g.name,
            }))}
          />
        </div>

        <input type="file" accept="image/*" onChange={handleCoverChange} className="text-white" />

        <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Збереження..." : "Зберегти"}
        </button>
        <button
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition disabled:opacity-50"
          onClick={handleDelete}
        >
          {isLoading ? "Видалення..." : "Видалити"}
        </button>
      </div>
    </div>
  );
}
