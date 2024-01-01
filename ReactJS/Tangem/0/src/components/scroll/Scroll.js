/*
Developer & Owner: МогучийДД (MoguchiyDD)
LICENSE: MIT License which is located in the text file LICENSE

Goal: Find The SCROLL DIRECTION
Result: Found The SCROLL DIRECTION

Past Modification: Adding COPYRIGHT
Last Modification: Adding The «useScrollDirection» FUNCTION
Modification Date: 2024.01.01, 11:16 PM

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
  const [scrollDirection, setScrollDirection] = useState("hide");

  useEffect(() => {
    let previousScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > previousScrollY ? "show" : "hide";
      if ((direction !== scrollDirection) && (((currentScrollY - previousScrollY) > 10) || ((currentScrollY - previousScrollY) < -10))) {
        setScrollDirection(direction);
      }
      previousScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
}
