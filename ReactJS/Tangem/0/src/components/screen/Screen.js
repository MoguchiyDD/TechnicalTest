/*
Developer & Owner: МогучийДД (MoguchiyDD)
LICENSE: MIT License which is located in the text file LICENSE

Goal: Determine SCREEN Size
Result: Accurate SCREEN Size

Past Modification: Adding The «useScreenWidth» FUNCTION
Last Modification: Editing The «useScreenWidth» FUNCTION (LOGIC)
Modification Date: 2024.01.01, 11:12 PM

Create Data: 2023.12.31, 07:03 PM
*/


import { useEffect, useState } from "react";


/**
 * @copyright Copyright (c) 2023 MoguchiyDD
 * @license MIT License
 * @description The COMPONENT from Above
 * @returns Display SCREEN Width
 */
export function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return width;
}
