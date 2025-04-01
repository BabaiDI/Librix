import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

const notifications = [
  {
    id: 1,
    avatar: "/docs/images/people/profile-picture-1.jpg",
    name: "Jese Leos",
    message: 'New message from Jese Leos: "Hey, what\'s up? All set for the presentation?"',
    time: "a few moments ago",
    iconBg: "bg-blue-600",
  },
  {
    id: 2,
    avatar: "/docs/images/people/profile-picture-2.jpg",
    name: "Joseph Mcfall",
    message: "Joseph Mcfall and 5 others started following you.",
    time: "10 minutes ago",
    iconBg: "bg-gray-900",
  },
  {
    id: 3,
    avatar: "/docs/images/people/profile-picture-3.jpg",
    name: "Bonnie Green",
    message: "Bonnie Green and 141 others love your story. See it and view more stories.",
    time: "44 minutes ago",
    iconBg: "bg-red-600",
  },
];

interface NotificationsDropdownType {
  onClose: () => void;
}

const NotificationsDropdown = ({ onClose }: NotificationsDropdownType) => {
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={notificationMenuRef}
      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20"
    >
      <div className="px-4 py-2 font-medium text-center bg-gray-50 dark:bg-gray-800 dark:text-white">
        Notifications
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="relative shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src={notification.avatar}
                alt={notification.name}
              />
              <div
                className={`absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 border border-white rounded-full dark:border-gray-800 ${notification.iconBg}`}
              >
                <XMarkIcon className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="w-full ps-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {notification.name}
                </span>
                {": "}
                {notification.message}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">{notification.time}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="block w-full py-2 text-sm font-medium text-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
        View all
      </button>
    </div>
  );
};

export default NotificationsDropdown;
