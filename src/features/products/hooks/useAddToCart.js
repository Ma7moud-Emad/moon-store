import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProductToCart } from "../services/apis";

export function useAddToCart(token) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId) => addProductToCart(productId, token), // v5
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const addToCartWithToast = (productId) => {
    return toast.promise(
      mutation
        .mutateAsync(productId)
        .then((res) => {
          return res.message || "Product added successfully";
        })
        .catch((err) => {
          throw (
            err.response.data.message || err.message || "Failed to add product"
          );
        }),
      {
        loading: "Adding product to cart...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, addToCartWithToast };
}
