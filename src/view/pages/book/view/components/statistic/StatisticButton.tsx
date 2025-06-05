interface StatisticButtonProps {
  value: string;
  text: string;
  valueSelected: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StatisticButton({
  value,
  text,
  valueSelected,
  onChange,
}: StatisticButtonProps) {
  return (
    <label
      key={value}
      className="w-full text-center py-1 cursor-pointer transition-all duration-300 ease-in-out rounded-md has-checked:bg-gray-600 hover:bg-gray-700"
    >
      <input
        type="radio"
        name="statistic"
        value={value}
        hidden
        checked={valueSelected === value}
        onChange={onChange}
        readOnly
      />
      {text}
    </label>
  );
}
