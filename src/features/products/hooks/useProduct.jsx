import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/apis";

export default function useProduct(ProductId) {
  return useQuery({
    queryKey: ["product", ProductId],
    queryFn: () => getProduct(ProductId),
  });
}
