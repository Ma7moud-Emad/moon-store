import BreButton from "./../../../components/ui/BreButton";
import Spinner from "../../../components/ui/Spinner";

import { useRemoveFromWishlist } from "../hooks/useRemoveFromWishlist";
import { useSelector } from "react-redux";
import { useAddToCart } from "../../products/hooks/useAddToCart";

import { IoHeart } from "react-icons/io5";

export default function WishlistItem({ product }) {
  const token = useSelector((state) => state.user.token);

  const { removeFromWishlistWithToast, isPending: isRemoveToWishlist } =
    useRemoveFromWishlist(token);

  const { addToCartWithToast, isPending: isAddToCart } = useAddToCart(token);

  const handleAddToCart = () => {
    addToCartWithToast(product._id);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlistWithToast(product._id);
  };

  return (
    <div className="px-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col">
      <img src={product.imageCover} alt={product.title} className="" />
      <div className="text-neutral-800 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold uppercase my-2">
            {product.title}
          </h3>
          <p>{product.price}$</p>
        </div>
        <div className="flex gap-4 my-4">
          <BreButton addCalsses="py-1">
            {isRemoveToWishlist ? (
              <Spinner color="rgba(58, 56, 69, 1)" />
            ) : (
              <IoHeart
                className="text-red-500 text-3xl"
                onClick={handleRemoveFromWishlist}
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
    </div>
  );
}
