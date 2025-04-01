import { BellIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import NotificationsDropdown from "./NotificationMenu";

export default function Notification() {
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  return (
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
  );
}
