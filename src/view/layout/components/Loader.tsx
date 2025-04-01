import { useNavigation } from "react-router";

export default function Loader() {
  const navigation = useNavigation();

  if (navigation.state !== "loading") {
    return;
  }

  return (
    <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-600 animate-pulse w-full fixed top-0 left-0 z-50 shadow-lg rounded-b-lg"></div>
  );
}
