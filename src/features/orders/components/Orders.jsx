import { useSelector } from "react-redux";
import useOrders from "../hooks/useOrders";
import Loading from "../../../components/ui/Loading";
import OrderDetails from "./OrderDetails";
import { jwtDecode } from "jwt-decode";
import EmptyBox from "../../../components/ui/EmptyBox";
import ErrorMsg from "../../../components/ui/ErrorMsg";

export default function Orders() {
  const token = useSelector((state) => state.user.token);
  const decoded = token && jwtDecode(token);

  const { data, isPending, error } = useOrders(token, decoded.id);
  const sortedArray = data?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg msg={error.response.data.message} />;
  }

  return (
    <div className="pt-16 sm:pt-32 sm:pb-2">
      {sortedArray.length == 0 ? (
        <EmptyBox
          title="Your order history is empty"
          description="You haven't placed any orders yet. Start shopping and your order history will appear here."
          btnName="Start Shopping"
          navigation="products"
        />
      ) : (
        sortedArray.map((order) => (
          <OrderDetails key={order.id} order={order} />
        ))
      )}
    </div>
  );
}
