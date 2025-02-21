import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface CarouselProps {
  children: React.ReactNode;
}

function Carousel({ children }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [childWidth, setChildWidth] = useState(150);

  useEffect(() => {
    if (scrollRef.current?.firstChild) {
      const firstChild = scrollRef.current.firstChild as HTMLElement;
      setChildWidth(firstChild.offsetWidth + 16);
    }
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -childWidth : childWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full flex items-center">
      {/* Кнопка влево */}
      <button
        onClick={() => scroll("left")}
        className="bg-gray-800 text-white p-2 rounded-l-2xl hover:bg-gray-700 mx-2"
      >
        <ChevronLeftIcon
          className="size-6"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1.5}
          fillRule="evenodd"
        />
      </button>

      {/* Контейнер с прокруткой */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 p-2 scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {children}
      </div>

      {/* Кнопка вправо */}
      <button
        onClick={() => scroll("right")}
        className="bg-gray-800 text-white p-2 rounded-r-2xl shadow-lg hover:bg-gray-700 mx-2"
      >
        <ChevronRightIcon
          className="size-6"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1.5}
          fillRule="evenodd"
        />
      </button>
    </div>
  );
}

export default Carousel;
