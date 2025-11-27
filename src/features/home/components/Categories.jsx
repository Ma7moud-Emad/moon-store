import useCategories from "./../../categories/hooks/useCategories";
import Category from "./../../categories/components/Category";

export default function Categories() {
  const { data } = useCategories();
  return (
    <div className="flex flex-nowrap overflow-x-scroll custom-scrollbar gap-4 my-8">
      {data?.map((category) => (
        <Category
          key={category._id}
          category={category}
          addClasses="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
        />
      ))}
    </div>
  );
}
