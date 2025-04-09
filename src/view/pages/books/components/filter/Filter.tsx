import { useSearchParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import { FormEvent } from "react";
import YearRange from "./YearRange";
import PageRange from "./PageRange";
import supabase from "@services/supabaseClient";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [publishDateFrom, setPublishDateFrom] = useState(
    searchParams.get("publish_date_from") || ""
  );
  const [publishDateTo, setPublishDateTo] = useState(searchParams.get("publish_date_to") || "");
  const [pagesFrom, setPagesFrom] = useState(searchParams.get("pages_from") || "");
  const [pagesTo, setPagesTo] = useState(searchParams.get("pages_to") || "");
  const [language, setLanguage] = useState(searchParams.get("language") || "");
  const [title, setTitle] = useState(searchParams.get("title") || "");

  const params = useMemo(
    () => ({
      title,
      language,
      publish_date_from: publishDateFrom,
      publish_date_to: publishDateTo,
      pages_from: pagesFrom,
      pages_to: pagesTo,
    }),
    [title, language, publishDateFrom, publishDateTo, pagesFrom, pagesTo]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      const trimmedValue = value.trim();
      trimmedValue ? newSearchParams.set(key, trimmedValue) : newSearchParams.delete(key);
    });

    setSearchParams(newSearchParams);
  };

  const [languages, setLanguages] = useState<string[]>([]);
  useEffect(() => {
    supabase
      .from("unique_languages")
      .select("*")
      .then(({ data, error }) => {
        if (error) return;

        setLanguages(
          data
            .map((data) => data.language)
            .filter((language): language is string => language !== null)
        );
      });
  }, []);

  return (
    <div className="w-fit p-4 border border-gray-600 rounded-xl shadow-lg bg-gray-900">
      <h2 className="text-xl font-semibold mb-4">Фільтр</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
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
          <YearRange
            from={Number(publishDateFrom) || 0}
            to={Number(publishDateTo) || 0}
            setFrom={(value) => setPublishDateFrom(String(value || ""))}
            setTo={(value) => setPublishDateTo(String(value || ""))}
          />
          <PageRange
            from={Number(pagesFrom) || 0}
            to={Number(pagesTo) || 0}
            setFrom={(value) => setPagesFrom(String(value || ""))}
            setTo={(value) => setPagesTo(String(value || ""))}
          />
          <div>
            <label htmlFor="language" className="text-white font-semibold">
              Мови
            </label>
          </div>
          <div>
            <label>Рейтинг</label>
          </div>
          <div>
            <label>Жанри</label>
          </div>
          <button type="submit" className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg">
            Пошук
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
