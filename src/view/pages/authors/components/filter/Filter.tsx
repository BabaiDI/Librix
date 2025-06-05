import { useSearchParams } from "react-router";
import { useState, useEffect, useMemo, FormEvent } from "react";
import supabase from "@services/supabaseClient";

const AuthorFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Состояния из URL
  const [name, setName] = useState(searchParams.get("full_name") || "");
  const [nationality, setNationality] = useState(searchParams.get("nationality") || "");

  const [availableNationalities, setAvailableNationalities] = useState<string[]>([]);

  // Получаем список национальностей
  useEffect(() => {
    const fetchNationalities = async () => {
      const { data, error } = await supabase.from("unique_nationalities").select("nationality");
      if (!error && data) {
        const list = data.map((d) => d.nationality).filter((n): n is string => !!n);
        setAvailableNationalities(list);
      }
    };
    fetchNationalities();
  }, []);

  const queryParams = useMemo(
    () => ({
      full_name: name,
      nationality,
    }),
    [name, nationality]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    Object.entries(queryParams).forEach(([key, value]) => {
      const trimmed = value.trim();
      trimmed ? newParams.set(key, trimmed) : newParams.delete(key);
    });
    setSearchParams(newParams);
  };

  return (
    <div className="w-md p-4 border border-gray-600 rounded-xl shadow-lg bg-gray-900">
      <h2 className="text-xl font-semibold mb-4 text-white">Фільтр авторів</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ПІБ */}
        <div>
          <label htmlFor="name" className="text-white">
            Ім'я або прізвище
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-400 rounded-md"
            placeholder="Пошук за ПІБ"
          />
        </div>

        <div>
          <label htmlFor="nationality" className="text-white">
            Національність
          </label>
          <select
            id="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-400 rounded-md bg-white text-black"
          >
            <option value="">Усі</option>
            {availableNationalities.map((nat) => (
              <option key={nat} value={nat}>
                {nat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg">
          Пошук
        </button>
      </form>
    </div>
  );
};

export default AuthorFilter;
