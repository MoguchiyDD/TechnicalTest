/*
Developer & Owner: МогучийДД (MoguchiyDD)
LICENSE: MIT License which is located in the text file LICENSE

Goal: Determine SCREEN Size
Result: Accurate SCREEN Size

Past Modification: Adding COPYRIGHT
Last Modification: Adding The «useScreenWidth» FUNCTION
Modification Date: 2024.01.01, 03:00 PM

Create Data: 2023.12.31, 07:03 PM
*/


import { useEffect, useState } from "react";


/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description The SURPRISE from Above
 * @returns Display SCREEN Width
 */
export function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("reaize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
