import { useQuery } from "@tanstack/react-query";
import getBrands from "../services/apis";

export default function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });
}
