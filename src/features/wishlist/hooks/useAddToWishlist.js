import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProductToWishlist } from "../services/apis";

export function useAddToWishlist(token) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId) => addProductToWishlist(productId, token), // v5
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const addToWishlistWithToast = (productId) => {
    return toast.promise(
      mutation
        .mutateAsync(productId)
        .then((res) => {
          return res.message || "Product added successfully to your wishlist";
        })
        .catch((err) => {
          throw (
            err.response?.data?.message || "Failed to added product to wishlist"
          );
        }),
      {
        loading: "adding product to wishlist...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, addToWishlistWithToast };
}
