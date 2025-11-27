import { useQuery } from "@tanstack/react-query";
import getOrders from "../services/apis";

export default function useOrders(token, userId) {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(token, userId),
  });
}
