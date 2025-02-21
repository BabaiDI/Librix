import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span className="rounded m-2 p-2 bg-red-700 text-white flex flex-row">
      <ExclamationTriangleIcon fill="currentColor" className="size-6 mr-2" />
      {message}
    </span>
  );
};
