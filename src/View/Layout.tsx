import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar
        navigation={[
          { name: "Home", href: "/", current: location.pathname === "/" },
          {
            name: "Book 1",
            href: "/book/1",
            current: location.pathname === "/book/1",
          },
          {
            name: "Book 2",
            href: "/book/2",
            current: location.pathname === "/book/2",
          },
        ]}
      />
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
}

export default Layout;
