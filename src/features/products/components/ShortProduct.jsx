import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { useAddToCart } from "./../hooks/useAddToCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWishlist from "./../../wishlist/hooks/useGetWishlist";
import { useAddToWishlist } from "./../../wishlist/hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "./../../wishlist/hooks/useRemoveFromWishlist";

import BreButton from "./../../../components/ui/BreButton";
import Spinner from "../../../components/ui/Spinner";

export default function ShortProduct({ product, addCalsses }) {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const { addToCartWithToast, isPending: isAddToCart } = useAddToCart(token);

  const { addToWishlistWithToast, isPending: isAddToWishlist } =
    useAddToWishlist(token);

  const { removeFromWishlistWithToast, isPending: isRemoveToWishlist } =
    useRemoveFromWishlist(token);

  const { data: wishlist } = useWishlist(token);

  const isLoved = wishlist?.data?.find((item) => item._id === product._id);

  const handleAddToCart = () => {
    addToCartWithToast(product._id);
  };
  const handleAddToWishlist = () => {
    addToWishlistWithToast(product._id);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlistWithToast(product._id);
  };

  return (
    <div
      className={`relative flex flex-col group space-y-2 shadow-sm p-2 rounded-sm hover:translate-y-0.5 transition ${addCalsses}`}
    >
      <img
        src={product.imageCover}
        alt={product.title}
        className="cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      />

      <button
        className={`absolute top-4 right-4 text-2xl cursor-pointer group-hover:opacity-100 transition-opacity duration-500`}
      >
        {isAddToWishlist || isRemoveToWishlist ? (
          <Spinner color="rgba(58, 56, 69, 1)" />
        ) : isLoved ? (
          <IoHeart
            className="text-red-500"
            onClick={handleRemoveFromWishlist}
          />
        ) : (
          <IoHeartOutline onClick={handleAddToWishlist} />
        )}
      </button>

      <div className="flex-1 flex flex-col justify-between space-y-4 px-2">
        <div className="space-y-4">
          <div className="text-sm text-neutral-800 font-semibold">
            <h1>{product.title}</h1>
            <p className="mt-2 text-light-brown">${product.price}</p>
          </div>

          <p className="text-sm text-neutral-600 font-normal">
            {product.description}
          </p>
        </div>

        <BreButton
          title="add to cart"
          addCalsses="w-full py-2 uppercase"
          clickedFun={handleAddToCart}
          disabled={isAddToCart}
        />
      </div>
    </div>
  );
}
