import ErrorMsg from "../components/ui/ErrorMsg";
import Loading from "../components/ui/Loading";
import Category from "../features/categories/components/Category";

import useCategories from "../features/categories/hooks/useCategories";

export default function Categories() {
  const { data, isPending, error } = useCategories();

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg msg={error.response.data.message} />;
  }

  return (
    <div className="pt-16 sm:pt-32 px-4 mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data &&
        data.map((category) => (
          <Category key={category._id} category={category} />
        ))}
    </div>
  );
}
