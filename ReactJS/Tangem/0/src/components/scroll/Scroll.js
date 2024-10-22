import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState({ count: 0, scroll: "hide" });

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = (scrollY >= 0 && scrollY <= 120) ? "hide" : "show";

      setScrollDirection(prevDirection => ({
        count: direction === "show" ? prevDirection.count + 1 : prevDirection.count,
        scroll: direction
      }));
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return scrollDirection;
}
