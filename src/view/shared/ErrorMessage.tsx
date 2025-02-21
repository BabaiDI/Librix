import SvgIcon from "./SvgIcon";
import { exclamationTriangle } from "@assets/iconsSVGPaths";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span className="rounded m-2 p-2 bg-red-700 text-white flex flex-row">
      <SvgIcon
        fill="currentColor"
        className="size-6 mr-2"
        d={exclamationTriangle}
      />
      {message}
    </span>
  );
};
