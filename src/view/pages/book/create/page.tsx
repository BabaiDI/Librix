import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import supabase from "@services/supabaseClient";
import { Tables } from "@consts/database.types";
import MultiSelectInput from "@shared/MultiSelectInput";
import { loaderType } from "./loader";

export default function page() {
  const navigate = useNavigate();
  const { allAuthors, allGenres } = useLoaderData<loaderType>();

  const [isSaving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [pages, setPages] = useState(0);
  const [publishDate, setPublishDate] = useState(new Date());
  const [publisherName, setPublisherName] = useState<string>("");
  const [selectedAuthors, setSelectedAuthors] = useState<
    { value: Tables<"author">["id"]; label: string }[]
  >([]);
  const [selectedGenres, setSelectedGenres] = useState<
    { value: Tables<"genre">["id"]; label: string }[]
  >([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // 1. Створити нову книгу
      const { data: bookInsert, error: bookError } = await supabase
        .from("book")
        .insert({
          title,
          description,
          language,
          pages,
          publish_date: publishDate.toISOString(),
          publisher_name: publisherName,
        })
        .select("id")
        .single();

      if (bookError || !bookInsert) {
        alert("Помилка при створенні книги");
        return;
      }

      const bookId = bookInsert.id;

      // 2. Завантажити обкладинку (якщо є)
      let coverPath = null;
      if (coverFile) {
        const fileExt = coverFile.name.split(".").pop();
        const fileName = `${bookId}.${fileExt}`;
        const { data: storageData, error: storageError } = await supabase.storage
          .from("book-covers")
          .upload(fileName, coverFile, { upsert: true });

        if (storageError) {
          alert("Помилка при завантаженні обкладинки");
        } else {
          coverPath = storageData.path;

          // 3. Оновити книгу з обкладинкою
          await supabase.from("book").update({ cover_url: coverPath }).eq("id", bookId);
        }
      }

      // 4. Вставити авторів
      if (selectedAuthors.length > 0) {
        await supabase
          .from("book_author")
          .insert(selectedAuthors.map(({ value }) => ({ book_id: bookId, author_id: value })));
      }

      // 5. Вставити жанри
      if (selectedGenres.length > 0) {
        await supabase
          .from("book_genre")
          .insert(selectedGenres.map(({ value }) => ({ book_id: bookId, genre_id: value })));
      }

      navigate(`/books/${bookId}`);
    } catch (err) {
      console.error(err);
      alert("Сталася помилка");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-4">Створити нову книгу</h1>

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
          disabled={isSaving}
        >
          {isSaving ? "Збереження..." : "Створити"}
        </button>
      </div>
    </div>
  );
}
