import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";

export default function ButtonTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled past the screen height
  const toggleVisibility = () => {
    if (window.pageYOffset > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const classNum = `fixed bottom-24 sm:bottom-16 right-4 z-10  bg-light-brown text-white cursor-pointer rounded-full p-2 text-2xl hover:bg-light-brown/90 transition-all ${
    isVisible ? "block" : "hidden"
  }`;

  return (
    <button className={classNum} onClick={scrollToTop}>
      <MdArrowUpward />
    </button>
  );
}
