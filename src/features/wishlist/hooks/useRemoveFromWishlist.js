import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeProductFromWishlist } from "../services/apis";

export function useRemoveFromWishlist(token) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId) => removeProductFromWishlist(productId, token), // v5
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const removeFromWishlistWithToast = (productId) => {
    return toast.promise(
      mutation
        .mutateAsync(productId)
        .then((res) => {
          return res.message || "Product removed successfully to your wishlist";
        })
        .catch((err) => {
          throw (
            err.response?.data?.message ||
            "Failed to removed product to wishlist"
          );
        }),
      {
        loading: "removing product from your wishlist...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, removeFromWishlistWithToast };
}
