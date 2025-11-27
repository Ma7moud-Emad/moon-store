import { useState, useEffect } from "react";

export default function Navigations({ offersRef, modernRef, bestSellerRef }) {
  const [activeNav, setActiveNav] = useState("offers");

  const handleScrollToSection = (ref, navItem) => {
    setActiveNav(navItem);
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: offersRef, id: "offers" },
        { ref: modernRef, id: "modern" },
        { ref: bestSellerRef, id: "bestseller" },
      ];

      let closestSection = null;
      let closestDistance = Number.MAX_VALUE;

      sections.forEach((section) => {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (rect.top <= 100 && rect.bottom >= 100) {
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section.id;
            }
          }
        }
      });

      if (closestSection) {
        setActiveNav(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offersRef, modernRef, bestSellerRef]);

  const getNavItemClass = (navItem) => {
    const baseClass = "p-2 cursor-pointer transition-colors duration-200";
    const activeClass =
      "text-blue-600 font-semibold border-b-2 border-blue-600";
    const inactiveClass = "text-gray-600 hover:text-blue-500";

    return `${baseClass} ${
      activeNav === navItem ? activeClass : inactiveClass
    }`;
  };

  return (
    <ul className="font-medium capitalize flex gap-4 sm:gap-8 mx-auto max-sm:mb-4 items-center justify-center w-fit bg-white px-8 rounded-xl sticky top-16 sm:top-[7.1rem] z-40">
      <li
        className={getNavItemClass("offers")}
        onClick={() => handleScrollToSection(offersRef, "offers")}
      >
        offers
      </li>
      <li
        className={getNavItemClass("modern")}
        onClick={() => handleScrollToSection(modernRef, "modern")}
      >
        modern
      </li>
      <li
        className={getNavItemClass("bestseller")}
        onClick={() => handleScrollToSection(bestSellerRef, "bestseller")}
      >
        best seller
      </li>
    </ul>
  );
}
