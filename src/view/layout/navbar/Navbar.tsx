import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { NAVIGATION_LINKS } from "./config/navigations";
import UserMenu from "./components/UserMenu";
import { useUser } from "@context/UserContext";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/solid";
import NotificationsDropdown from "./components/NotificationMenu";

function Navbar() {
  const { profile, signOut, openAuthModal } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? "true" : "false"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon aria-hidden="true" className="size-6" />
              ) : (
                <Bars3Icon aria-hidden="true" className="size-6" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center text-xl font-bold text-white">Librix</div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {NAVIGATION_LINKS.map((nav) => (
                  <NavLink
                    key={nav.href}
                    to={nav.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      location.pathname === nav.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    aria-current={location.pathname === nav.href ? "page" : undefined}
                  >
                    {nav.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div>
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                onClick={() => setNotificationMenuOpen(true)}
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <BellIcon className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5} />
              </button>
              {notificationMenuOpen && (
                <NotificationsDropdown onClose={() => setNotificationMenuOpen(false)} />
              )}
            </div>

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
            {NAVIGATION_LINKS.map((nav) => (
              <NavLink
                key={nav.href}
                to={nav.href}
                className={`block rounded-md px-3 py-2 text-base font-medium  ${
                  location.pathname === nav.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                aria-current={location.pathname === nav.href ? "page" : undefined}
              >
                {nav.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
