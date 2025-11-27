import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { onlineOrder } from "../servies/apis";

export default function useOnlineOrder(token) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ cartId, shippingAddress }) =>
      onlineOrder(token, cartId, shippingAddress), // v5
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const onlinePaymentWithToast = (cartId, shippingAddress) => {
    return toast.promise(
      mutation
        .mutateAsync({ cartId, shippingAddress })
        .then((res) => {
          window.open(res.session.url, "_self");
          return res.message || "Online payment successfully";
        })
        .catch((err) => {
          throw (
            err.response.data.message || err.message || "Failed online payment"
          );
        }),
      {
        loading: "Online payment is being processed...",
        success: (msg) => msg,
        error: (msg) => msg,
      }
    );
  };

  return { ...mutation, onlinePaymentWithToast };
}
