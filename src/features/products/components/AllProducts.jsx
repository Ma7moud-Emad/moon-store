import ShortProduct from "./ShortProduct";
import Loading from "../../../components/ui/Loading";
import ErrorMsg from "../../../components/ui/ErrorMsg";

export default function AllProducts({ data, isPending, errorMsg }) {
  if (isPending) {
    return <Loading />;
  }

  if (errorMsg != null) {
    return <ErrorMsg msg={errorMsg} />;
  }
  return (
    <section className="p-2.5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data?.map((item) => {
        return <ShortProduct product={item} key={item.id} />;
      })}
    </section>
  );
}
