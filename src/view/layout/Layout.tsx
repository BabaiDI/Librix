import { Outlet, useNavigation } from "react-router";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

function Layout() {
  const navigation = useNavigation();

  return (
    <>
      <div className="flex flex-col min-h-screen justify-between bg-gray-800 font-[Nunito]">
        <Navbar />
        <main className="container p-4 mb-auto mx-auto text-gray-200">
          {navigation.state === "loading" && (
            <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-600 animate-pulse w-full fixed top-0 left-0 z-50 shadow-lg rounded-b-lg"></div>
          )}
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
