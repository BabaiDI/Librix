import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-80 bg-gray-500">
      <Navbar />
      <main className="container p-4 mb-auto mx-auto text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
