import { useParams } from "react-router-dom";

import useProduct from "./../hooks/useProduct";
import { useAddToCart } from "../hooks/useAddToCart";
import { useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import { useAddToWishlist } from "../../wishlist/hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "../../wishlist/hooks/useRemoveFromWishlist";
import useWishlist from "../../wishlist/hooks/useGetWishlist";

import ShortProduct from "./ShortProduct";
import BreButton from "../../../components/ui/BreButton";
import Loading from "./../../../components/ui/Loading";
import Spinner from "../../../components/ui/Spinner";

import filterProducts from "../../../utilites/helpers";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ErrorMsg from "../../../components/ui/ErrorMsg";

export default function ProductDetails() {
  const { productId } = useParams();

  const token = useSelector((state) => state.user.token);

  const { data, isPending, error } = useProduct(productId);

  const { data: wishlist } = useWishlist(token);

  const isLoved = wishlist?.data?.find((item) => item._id === data?._id);

  const { addToCartWithToast, isPending: isAddToCart } = useAddToCart(token);

  const { addToWishlistWithToast, isPending: isAddToWishlist } =
    useAddToWishlist(token);

  const { removeFromWishlistWithToast, isPending: isRemoveToWishlist } =
    useRemoveFromWishlist(token);

  const handleAddToCart = () => {
    addToCartWithToast(data._id);
  };
  const handleAddToWishlist = () => {
    addToWishlistWithToast(data._id);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlistWithToast(data._id);
  };

  const { data: products } = useProducts();

  const similarItems =
    products &&
    filterProducts({
      data: products,
      selectedCategories: [data?.category._id],
      selectedBrands: [data?.brand._id],
      priceRange: { min: 0, max: Infinity },
    });

  const handleDotClick = (onClick) => {
    onClick();
  };

  const responsive = {
    all: {
      breakpoint: { max: Infinity, min: 0 },
      items: 1,
    },
  };

  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMsg msg={error.response.data.message} />;
  }

  return (
    <div className="pt-16 pb-20 sm:pt-32 sm:pb-4 md:grid md:grid-cols-6">
      <div className="md:col-span-2">
        <Carousel
          responsive={responsive}
          showDots={true}
          customDot={
            <CustomDot
              carouselImages={data.images}
              onDotClick={handleDotClick}
            />
          }
          containerClass="max-h-[70vh] product-details"
          itemClass="max-h-[70vh]"
        >
          {data.images.map((img, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-screen max-h-[70vh] p-4"
            >
              <img
                src={img}
                alt={`${data.title} - ${index + 1}`}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="px-2 md:col-span-4">
        <h1 className="text-xl font-semibold text-neutral-800 uppercase my-2">
          {data.title}
        </h1>
        <ProductRating
          ratingsAverage={data.ratingsAverage}
          ratingsQuantity={data.ratingsQuantity}
          quantity={data.quantity}
        />
        <div className="flex items-center gap-2 text-2xl my-2">
          {data.priceAfterDiscount && <p>${data.priceAfterDiscount}</p>}
          <p
            className={`${
              data.priceAfterDiscount
                ? "text-neutral-500 line-through text-lg"
                : "text-neutral-800 "
            }`}
          >
            ${data.price}
          </p>
        </div>
        <Description
          description={data.description}
          brand={data.brand}
          category={data.category}
          subCategory={data.subcategory[0]}
        />
        <div className="flex gap-4 my-4">
          <BreButton
            addCalsses="py-2 uppercase"
            // clickedFun={handleAddToCart}
            // disabled={isAddToCart}
          >
            {isAddToWishlist || isRemoveToWishlist ? (
              <Spinner color="rgba(58, 56, 69, 1)" />
            ) : isLoved ? (
              <IoHeart
                className="text-red-500 text-3xl"
                onClick={handleRemoveFromWishlist}
              />
            ) : (
              <IoHeartOutline
                className="text-3xl"
                onClick={handleAddToWishlist}
              />
            )}
          </BreButton>
          <BreButton
            title="add to cart"
            addCalsses="py-2 uppercase flex-1"
            clickedFun={handleAddToCart}
            disabled={isAddToCart}
          />
        </div>
      </div>
      <div className="px-2 md:col-span-6">
        <h1 className="font-bold text-neutral-800 uppercase text-3xl mt-10 mb-4">
          similar items
        </h1>
        <div className="flex gap-x-4 items-stretch overflow-x-scroll custom-scrollbar pb-4">
          {similarItems?.map((item) => (
            <ShortProduct
              key={item._id}
              product={item}
              addCalsses="shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function CustomDot({ onClick, carouselImages, onDotClick, ...rest }) {
  const { index, active } = rest;

  const handleClick = () => {
    onDotClick(onClick, index);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={`${active ? "active opacity-100" : "opacity-60"}`}
      >
        <img
          src={carouselImages[index]}
          alt={`Slide ${index + 1}`}
          className="w-[50px]  object-cover"
        />
      </button>
    </li>
  );
}
function ProductRating({ ratingsAverage, ratingsQuantity, quantity }) {
  const fullStars = Math.floor(ratingsAverage);
  const halfStars = Math.ceil(ratingsAverage) - fullStars;
  const emptyStars = 5 - (fullStars + halfStars);

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center text-light-brown gap-1">
          {Array.from({ length: fullStars }).map((_, index) => (
            <FaStar key={`full-star ${index}`} />
          ))}
          {Array.from({ length: halfStars }).map((_, index) => (
            <FaStarHalfAlt key={`half-star ${index}`} />
          ))}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <FaRegStar key={`empty-star ${index}`} />
          ))}
        </div>
        <span className="text-[#111827] capitalize">
          ({ratingsQuantity} reviews)
        </span>
      </div>
      <p>
        Stock:{" "}
        <span className="text-light-brown capitalize">
          {quantity > 0 ? "in stock" : "out of stock"}
        </span>
      </p>
    </div>
  );
}
function Description({ description, brand, category, subCategory }) {
  const Properties = [
    { property: "brand", value: brand.name },
    { property: "category", value: category.name },
    { property: "subcategory", value: subCategory.name },
  ];

  description
    .split("\n")
    .map((item) => item.split("\t"))
    .forEach((item) => {
      if (item.length === 2) {
        Properties.unshift({ property: item[0], value: item[1] });
      }
    });
  return (
    <div className="overflow-x-auto custom-scrollbar border border-light-brown">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-light-brown text-white text-left text-xs font-medium uppercase tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-3">
              Property
            </th>
            <th scope="col" className="px-6 py-3">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-light-brown">
          {Properties.map((spec, index) => (
            <tr
              key={index}
              //   className={index % 2 === 0 ? "bg-white" : "bg-light-brown/20"}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800 uppercase">
                {spec.property}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
