import { useQuery } from "@tanstack/react-query";
import getCart from "../services/apis";

export default function useGetCart(token) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(token),
  });
}
