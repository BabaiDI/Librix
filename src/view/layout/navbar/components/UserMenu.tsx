import { User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

interface UserIconType {
  user: User;
  signOut: () => Promise<void>;
}

export default function UserIcon({ signOut }: UserIconType) {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const UserMenuDetails = [
    { name: "You Profile", href: "/profile", onClick: () => {} },
    { name: "Settings", href: "/profile/settings", onClick: () => {} },
    { name: "Sign out", href: "", onClick: signOut },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={userMenuRef}>
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <img
            className="size-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>

      {userMenuOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden">
          {UserMenuDetails.map((item) => {
            return (
              <NavLink
                key={item.name}
                to={item.href || "#"}
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                onClick={item.onClick}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}
