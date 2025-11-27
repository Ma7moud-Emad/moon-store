import { useState } from "react";

import AllProducts from "../features/products/components/AllProducts";
import ButtonTop from "../components/ui/ButtonTop";
import Loading from "../components/ui/Loading";
import Filtertion from "../features/products/components/Filtertion";

import useProducts from "../features/products/hooks/useProducts";

import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";
import ErrorMsg from "../components/ui/ErrorMsg";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);

  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const { data, isPending, error } = useProducts({
    page: currentPage,
  });

  const { data: products } = useProducts();

  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMsg msg={error.response.data.message} />;
  }

  return (
    <div className="relative pt-16 sm:pt-32 sm:pb-2">
      <ButtonTop />
      <Filtertion
        products={products}
        setFilteredProducts={setFilteredProducts}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {!isPending && (
        <>
          {filteredProducts && filteredProducts.length > 0 ? (
            <>
              <AllProducts
                data={filteredProducts}
                isPending={isPending}
                errorMsg={error}
              />
              <ResponsivePagination
                current={currentPage}
                total={2}
                onPageChange={setCurrentPage}
              />
            </>
          ) : filteredProducts && filteredProducts.length === 0 ? (
            <h1 className="text-center font-bold mt-92 ml-48 sm:mt-48 sm:ml-48 capitalize text-[1.2rem] sm:text-[2rem]">
              empty filter results
            </h1>
          ) : (
            <>
              <AllProducts data={data} isPending={isPending} errorMsg={error} />
              {data && data.length > 0 && (
                <ResponsivePagination
                  current={currentPage}
                  total={2}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
