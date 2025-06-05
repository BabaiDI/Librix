import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";

interface Option {
  value: any;
  label: string;
}

interface MultiSelectInputProps {
  selected: Option[];
  setSelected: (val: Option[]) => void;
  available: Option[];
  placeholder?: string;
  id?: string;
}

const MultiSelectInput = ({
  selected,
  setSelected,
  available,
  placeholder = "Введіть значення...",
  id = "multi-select",
}: MultiSelectInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const filtered = useMemo(() => {
    const query = inputValue.toLowerCase();
    return available.filter(
      (item) =>
        item.label.toLowerCase().includes(query) &&
        !selected.some((sel) => sel.value === item.value)
    );
  }, [inputValue, available, selected]);

  const addItem = (item: Option) => {
    setSelected([...selected, item]);
    setInputValue("");
  };

  const removeItem = (value: any) => {
    setSelected(selected.filter((i) => i.value !== value));
  };

  return (
    <div>
      <input
        id={id}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 border border-gray-400 rounded-md"
        placeholder={placeholder}
      />

      {inputValue && filtered.length > 0 && (
        <ul className="border mt-1 rounded-md bg-white text-black max-h-40 overflow-y-auto">
          {filtered.map((item) => (
            <li
              key={item.value}
              onClick={() => addItem(item)}
              className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((item) => (
            <span
              key={item.value}
              className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
            >
              {item.label}
              <button
                type="button"
                onClick={() => removeItem(item.value)}
                className="ml-2 hover:text-red-300"
              >
                <XMarkIcon className="size-4" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
