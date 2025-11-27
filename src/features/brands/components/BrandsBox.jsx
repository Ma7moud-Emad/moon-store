import Brand from "./Brand";
import useBrands from "./../hooks/useBrands";
import Loading from "./../../../components/ui/Loading";
import ErrorMsg from "../../../components/ui/ErrorMsg";

export default function BrandsBox() {
  const { data, isPending, error } = useBrands();

  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMsg msg={error.response.data.message} />;
  }

  return (
    <div className="pt-16 sm:pt-32 px-4 mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data && data.map((brand) => <Brand key={brand._id} brand={brand} />)}
    </div>
  );
}
