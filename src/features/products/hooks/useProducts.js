import { useQuery } from "@tanstack/react-query";
import getProducts from "../services/apis";

export default function useProducts(params = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}
