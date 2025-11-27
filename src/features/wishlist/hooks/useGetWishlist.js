import { useQuery } from "@tanstack/react-query";
import getWishlist from "../services/apis";

export default function useWishlist(token) {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(token),
  });
}
