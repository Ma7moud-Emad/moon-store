import heroProducts from "./../../../assets/hero-products.png";
import heroStyles from "./../../../assets/hero-styles.png";
import iconLogo from "./../../../assets/light-Icon.png";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Hero() {
  const heroSlides = [
    {
      id: 1,
      img: heroProducts,
      title: "Everything You Need, In One Place",
      subtitle: "Discover top products with unbeatable prices.",
    },
    {
      id: 3,
      img: heroStyles,
      title: "Style That Defines You",
      subtitle: "New arrivals & trending picks - just for you.",
    },
  ];

  const responsive = {
    all: {
      breakpoint: { max: Infinity, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="">
      <Carousel
        responsive={responsive}
        showDots={false}
        arrows={false}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={3000}
      >
        {heroSlides.map((item) => (
          <div
            key={item.id}
            className="h-[85vh] sm:h-[80.5vh] flex flex-col sm:flex-row-reverse"
          >
            <div className="flex-1">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="max-sm:flex-1 sm:w-1/3 px-4 bg-dark-brown text-[#fafaf9] flex flex-col items-center justify-center gap-2 ">
              <img src={iconLogo} alt="logo" className="w-18 h-auto" />
              <h2 className="text-3xl font-semibold text-center px-2">
                {item.title}
              </h2>
              <p className="text-center">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
