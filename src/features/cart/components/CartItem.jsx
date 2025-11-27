import { useState } from "react";
import Spinner from "../../../components/ui/Spinner";

import { useRemoveFromCart } from "../../products/hooks/useRemoveFromCart";
import { useSelector } from "react-redux";
import { useResetCount } from "./../../products/hooks/useResetCound";

import { FaXmark } from "react-icons/fa6";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import BreButton from "../../../components/ui/BreButton";
import { useNavigate } from "react-router-dom";
import { useClearCart } from "../hooks/useClearCart";

export default function CartItem({ item }) {
  return (
    <>
      <div className="md:hidden border-b border-neutral-600 px-2">
        <div>
          <RemoveButton id={item.product._id} />
          <div className="flex items-center gap-4">
            <Poster
              imageCover={item.product.imageCover}
              alt={item.product.title}
            />
            <Title title={item.product.title} />
          </div>
        </div>
        <div className="text-sm text-neutral-800 font-normal uppercase py-2 space-y-3 ">
          <Price price={item.price} />
          <Quantity count={item.count} id={item.product._id} />
          <Subtotal count={item.count} price={item.price} />
        </div>
      </div>
    </>
  );
}
function Title({ title }) {
  return (
    <h2 className="font-semibold text-sm text-neutral-800 uppercase">
      {title}
    </h2>
  );
}
function Poster({ imageCover, alt }) {
  return <img src={imageCover} alt={alt} className="w-30" />;
}
function RemoveButton({ id }) {
  const token = useSelector((state) => state.user.token);
  const { removeFromCartWithToast, isPending } = useRemoveFromCart(token);

  const handleRemoveFromCart = () => {
    removeFromCartWithToast(id);
  };
  return (
    <button className="py-2" onClick={handleRemoveFromCart}>
      {isPending ? (
        <Spinner color="rgba(58, 56, 69, 1)" width="1.5rem" height="1.5rem" />
      ) : (
        <FaXmark className="text-2xl text-[#e54335] cursor-pointer" />
      )}
    </button>
  );
}
function Slice({ children }) {
  return <div className="flex justify-between items-center ">{children}</div>;
}
function Price({ price }) {
  return (
    <Slice>
      <p className="md:hidden">Price: </p>
      <p className="font-semibold">${price}</p>
    </Slice>
  );
}
function Quantity({ count, id }) {
  const [curCount, setCurCount] = useState(count);
  const token = useSelector((state) => state.user.token);
  const { resetCountWithToast, isPending } = useResetCount(token);

  const handleIncCount = () => {
    const newCount = Number(curCount) + 1;
    setCurCount(newCount);
    resetCountWithToast(id, newCount);
  };

  const handleDecCount = () => {
    const newCount = Number(curCount) - 1;
    setCurCount(newCount);
    resetCountWithToast(id, newCount);
  };

  const handleResetCount = (newCount) => {
    resetCountWithToast(id, newCount);
  };

  return (
    <Slice>
      <p className="md:hidden">Quantity: </p>
      <div
        className={`flex items-center gap-4 border px-1 py-1 ${
          isPending && "px-7"
        }`}
      >
        {isPending ? (
          <Spinner color="rgba(58, 56, 69, 1)" width="24" height="24" />
        ) : (
          <>
            <button
              type="button"
              className=" cursor-pointer"
              onClick={handleDecCount}
            >
              <AiOutlineMinus />
            </button>
            <input
              className="font-semibold outline-neutral-800 w-10 text-center border-0 hide-up-down-input-number"
              type="number"
              value={curCount}
              onChange={(e) => {
                setCurCount(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (curCount != count) {
                    handleResetCount(Number(curCount));
                  }
                }
              }}
            />
            <button
              type="button"
              className=" cursor-pointer"
              onClick={handleIncCount}
            >
              <AiOutlinePlus />
            </button>
          </>
        )}
      </div>
    </Slice>
  );
}
function Subtotal({ count, price }) {
  return (
    <Slice>
      <p className="md:hidden">subtotal: </p>
      <p className="font-semibold text-light-brown">${count * price}</p>
    </Slice>
  );
}

export function Table({ items }) {
  return (
    <table className="hidden md:grid md:grid-cols-6">
      <thead className="sticky top-[20%] col-span-6 bg-light-brown text-neutral capitalize py-2">
        <tr className="md:grid md:grid-cols-[fit-content(100%)_repeat(5,1fr)]">
          <th>
            <MdDeleteOutline className="text-2xl" />
          </th>
          <th>photo</th>
          <th>title</th>
          <th>price</th>
          <th>count</th>
          <th>subtotal</th>
        </tr>
      </thead>
      <tbody className="col-span-6">
        {items?.map((item) => (
          <tr
            key={item.product._id}
            className="md:grid md:grid-cols-[fit-content(100%)_repeat(5,1fr)] md:items-center md:place-items-center border-b-2 last:border-b-0 border-neutral-600"
          >
            <td>
              <RemoveButton id={item.product._id} />
            </td>
            <td>
              <Poster
                imageCover={item.product.imageCover}
                alt={item.product.title}
              />
            </td>
            <td>
              <Title title={item.product.title} />
            </td>
            <td>
              <Price price={item.price} />
            </td>
            <td>
              <Quantity count={item.count} id={item.product._id} />
            </td>
            <td>
              <Subtotal count={item.count} price={item.price} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function TotalCartPrice({ totalPrice, cartId }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const { cleartCartWithToast, isPending } = useClearCart(token);
  return (
    <div className="bg-light-brown text-neutral text-xl font-semibold p-2 capitalize grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
      <div className="col-span-4 md:col-span-2 flex justify-between md:grid grid-cols-2 ">
        <div>Total Price</div>
        <div>${totalPrice}</div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <BreButton
          type="button"
          title="Check Out"
          addCalsses="bg-neutral text-neutral-800 text-sm border-0"
          clickedFun={() =>
            navigate("/payment", {
              state: {
                cartId,
              },
            })
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1 md:text-right">
        <BreButton
          type="button"
          title="Clear Cart"
          addCalsses="bg-neutral text-neutral-800 text-sm border-0"
          clickedFun={cleartCartWithToast}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
