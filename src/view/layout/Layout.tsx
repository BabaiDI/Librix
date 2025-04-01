import { Outlet } from "react-router";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Loader from "./components/Loader";
import { memo } from "react";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-800 font-[Nunito]">
      <Navbar />
      <main className="container p-4 mb-auto mx-auto text-gray-200">
        <Loader />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
