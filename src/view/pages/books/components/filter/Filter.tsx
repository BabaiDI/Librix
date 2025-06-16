import { useSearchParams } from "react-router";
import { useState, useMemo, useEffect, FormEvent } from "react";
import YearRange from "./YearRange";
import PageRange from "./PageRange";
import RatingRange from "./RatingRange";
import supabase from "@services/supabaseClient";
import { Tables } from "@consts/database.types";
import MultiSelectInput from "@shared/MultiSelectInput";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // States from URL search params
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [language, setLanguage] = useState(searchParams.get("language") || "");
  const [publishDateFrom, setPublishDateFrom] = useState(
    searchParams.get("publish_date_from") || ""
  );
  const [publishDateTo, setPublishDateTo] = useState(searchParams.get("publish_date_to") || "");
  const [pagesFrom, setPagesFrom] = useState(searchParams.get("pages_from") || "");
  const [pagesTo, setPagesTo] = useState(searchParams.get("pages_to") || "");
  const [ratingFrom, setRatingFrom] = useState(searchParams.get("rating_from") || "0");
  const [ratingTo, setRatingTo] = useState(searchParams.get("rating_to") || "10");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    (searchParams.get("genres") || "").split("+").filter(Boolean)
  );

  const [availableGenres, setAvailableGenres] = useState<Tables<"genre">["name"][]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [genreInput, setGenreInput] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      const { data, error } = await supabase.from("genre").select("name");
      if (!error && data) setAvailableGenres(data.map(({ name }) => name));
    };

    const fetchLanguages = async () => {
      const { data, error } = await supabase.from("unique_languages").select("language");
      if (!error && data) {
        const langs = data.map((d) => d.language).filter((l): l is string => l !== null);
        setAvailableLanguages(langs);
      }
    };

    fetchGenres();
    fetchLanguages();
  }, []);

  const filteredGenres = useMemo(() => {
    const input = genreInput.toLowerCase();
    return availableGenres.filter(
      (g) => g.toLowerCase().includes(input) && !selectedGenres.includes(g)
    );
  }, [genreInput, availableGenres, selectedGenres]);

  const queryParams = useMemo(
    () => ({
      title,
      language,
      publish_date_from: publishDateFrom,
      publish_date_to: publishDateTo,
      pages_from: pagesFrom,
      pages_to: pagesTo,
      rating_from: ratingFrom,
      rating_to: ratingTo,
      genres: selectedGenres.join("+"),
    }),
    [
      title,
      language,
      publishDateFrom,
      publishDateTo,
      pagesFrom,
      pagesTo,
      ratingFrom,
      ratingTo,
      selectedGenres,
    ]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams((prevParams) => {
      Object.entries(queryParams).forEach(([key, value]) => {
        const trimmed = value.trim();
        if (trimmed) {
          prevParams.set(key, trimmed);
        } else {
          prevParams.delete(key);
        }
      });
      return prevParams;
    });
  };

  return (
    <div className="md:w-md p-4 border border-gray-600 rounded-xl shadow-lg bg-gray-900">
      <h2 className="text-xl font-semibold mb-4 text-white">Фільтр</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Назва */}
        <div>
          <label htmlFor="title" className="text-white">
            Назва
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-400 rounded-md"
          />
        </div>

        {/* Рік публікації */}
        <YearRange
          from={Number(publishDateFrom) || 0}
          to={Number(publishDateTo) || 0}
          setFrom={(val) => setPublishDateFrom(String(val || ""))}
          setTo={(val) => setPublishDateTo(String(val || ""))}
        />

        {/* Кількість сторінок */}
        <PageRange
          from={Number(pagesFrom) || 0}
          to={Number(pagesTo) || 0}
          setFrom={(val) => setPagesFrom(String(val || ""))}
          setTo={(val) => setPagesTo(String(val || ""))}
        />

        {/* Рейтинг */}
        <RatingRange
          from={Number(ratingFrom) || 0}
          to={Number(ratingTo) || 10}
          setFrom={(val) => setRatingFrom(String(val))}
          setTo={(val) => setRatingTo(String(val))}
        />

        {/* Мова */}
        <div>
          <label htmlFor="language" className="text-white font-semibold">
            Мова
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-400 rounded-md bg-white text-black"
          >
            <option value="">Усі мови</option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Genres</label>
          <MultiSelectInput
            id="genres"
            selected={selectedGenres.map((genre) => ({ value: genre, label: genre }))}
            setSelected={(items) => setSelectedGenres(items.map((i) => i.value))}
            available={availableGenres.map((genre) => ({ value: genre, label: genre }))}
          />
        </div>

        <button type="submit" className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg">
          Пошук
        </button>
      </form>
    </div>
  );
};

export default Filter;
