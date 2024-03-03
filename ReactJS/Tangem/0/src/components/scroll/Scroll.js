/*
Developer & Owner: МогучийДД (MoguchiyDD)
LICENSE: MIT License which is located in the text file LICENSE

Goal: Find The SCROLL DIRECTION
Result: Found The SCROLL DIRECTION

Past Modification: Adding The «useScrollDirection» FUNCTION
Last Modification: Editing The «useScrollDirection» FUNCTION (LOGIC)
Modification Date: 2024.01.02, 02:18 AM

Create Data: 2024.01.01, 10:23 PM
*/


import { useEffect, useState } from "react";


/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description Find out The DIRECTION of SCROLLING
 * @returns The DIRECTION of SCROLLING
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState({
    count: 0,
    scroll: "hide"
  });

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      const direction = ((scrollY >= 0) && (scrollY <= 120)) ? "hide" : "show";
      if (direction !== scrollDirection) {
        if (scrollDirection.count === 0) {
          setScrollDirection({
            count: direction === "show" ? ++scrollDirection.count : scrollDirection.count,
            scroll: direction
          });
        } else {
          setScrollDirection({
            count: direction === "show" ? ++scrollDirection.count : scrollDirection.count,
            scroll: direction
          });
        }
      }
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    }
  }, [scrollDirection]);

  return scrollDirection;
}
