import { Outlet } from "react-router";
import Navbar from "./navbar/Navbar";
import Loader from "./components/Loader";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-800 font-[Nunito]">
      <Navbar />
      <main className="container p-4 mb-auto mx-auto text-gray-200">
        <Loader />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
