import { useState } from "react";
import { NavLink } from "react-router";
import { NAVIGATION_LINKS } from "./config/navigations";
import UserMenu from "./components/UserMenu";
import { useUser } from "@context/UserContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Notification from "./components/notification/Notification";

const MobileMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    type="button"
    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
    aria-controls="mobile-menu"
    aria-expanded={isOpen ? "true" : "false"}
    onClick={onClick}
  >
    <span className="absolute -inset-0.5"></span>
    <span className="sr-only">Open main menu</span>
    {isOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
  </button>
);

const Navbar = () => {
  const { profile, signOut, openAuthModal } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            />
          </div>

          {/* Logo & Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center text-xl font-bold text-white">Librix</div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {NAVIGATION_LINKS.map(({ href, name }) => (
                  <NavLink
                    key={href}
                    to={href}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications & User Menu */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Notification />

            {/* User Menu */}
            <div className="relative ml-3">
              {profile ? (
                <UserMenu profile={profile} signOut={signOut} />
              ) : (
                <button className="text-white" onClick={openAuthModal}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {NAVIGATION_LINKS.map(({ href, name }) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
                aria-current={location.pathname === href ? "page" : undefined}
              >
                {name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
