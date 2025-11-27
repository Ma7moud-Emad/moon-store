import { useEffect, useRef } from "react";

import Spinner from "../../../components/ui/Spinner";

import useCategories from "./../../categories/hooks/useCategories";
import useBrands from "./../../brands/hooks/useBrands";

import filterProducts from "../../../utilites/helpers";

import { RiFilter3Line } from "react-icons/ri";

export default function Filtertion({
  isFiltered,
  setIsFiltered,
  products,
  setFilteredProducts,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
}) {
  const { data: categories, isPending: categoriesLoading } = useCategories();
  const { data: brands, isPending: brandsLoading } = useBrands();

  useEffect(() => {
    if (products) {
      const newFiltered = filterProducts({
        data: products,
        selectedCategories,
        selectedBrands,
        priceRange,
      });
      setFilteredProducts(newFiltered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedBrands, priceRange, products]);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 pl-2 uppercase text-sm font-semibold cursor-pointer"
        onClick={() => {
          setIsFiltered(!isFiltered);
        }}
      >
        <RiFilter3Line className="text-2xl" />
        <p>filter</p>
      </button>

      {isFiltered && (
        <div className="absolute top-full left-0 z-10 bg-white p-4 mt-2 shadow-header min-w-36 h-[82vh] md:h-[73vh] overflow-y-scroll">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const newFiltered = filterProducts({
                data: products,
                selectedCategories,
                selectedBrands,
                priceRange,
              });
              setFilteredProducts(newFiltered);
            }}
          >
            <FilterSlice title="category">
              {categoriesLoading ? (
                <Spinner />
              ) : (
                <FilterCheckbox
                  items={categories}
                  checkboxName="categories"
                  selected={selectedCategories}
                  setSelected={setSelectedCategories}
                />
              )}
            </FilterSlice>

            <FilterSlice title="brands">
              {brandsLoading ? (
                <Spinner />
              ) : (
                <FilterCheckbox
                  items={brands}
                  checkboxName="brands"
                  selected={selectedBrands}
                  setSelected={setSelectedBrands}
                />
              )}
            </FilterSlice>

            <FilterSlice title="price range">
              <CustomRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </FilterSlice>
          </form>
        </div>
      )}
    </div>
  );
}

function FilterSlice({ title, children }) {
  return (
    <div className="border-b border-neutral-600 mt-2">
      <h3 className="text-neutral-800 font-semibold capitalize">{title}</h3>
      {children}
    </div>
  );
}

function FilterCheckbox({ items, checkboxName, selected, setSelected }) {
  const toggleItem = (_id) => {
    if (selected.includes(_id)) {
      setSelected(selected.filter((id) => id !== _id));
    } else {
      setSelected([...selected, _id]);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      {items.map((item) => (
        <label
          key={item._id}
          className="flex items-center justify-between gap-2 text-sm cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <img src={item.image} alt={item.slug} className="w-8 rounded-sm" />
            <span>{item.name}</span>
          </div>
          <input
            type="checkbox"
            name={checkboxName}
            checked={selected.includes(item._id)}
            onChange={() => toggleItem(item._id)}
          />
        </label>
      ))}
    </div>
  );
}

export function CustomRange({ priceRange, setPriceRange }) {
  const sliderRef = useRef(null);

  // LIMIT is constant initial max
  const initialMaxRef = useRef(priceRange.max);
  const LIMIT = initialMaxRef.current;

  const minPercent = (priceRange.min / LIMIT) * 100;
  const maxPercent = (priceRange.max / LIMIT) * 100;

  const handleMove = (e, type) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;

    const value = (percent / 100) * LIMIT;

    if (type === "min" && value < priceRange.max && value >= 0) {
      setPriceRange({ ...priceRange, min: value });
    }

    if (type === "max" && value > priceRange.min && value <= LIMIT) {
      setPriceRange({ ...priceRange, max: value });
    }
  };

  return (
    <div className="py-2 select-none">
      <div
        ref={sliderRef}
        className="relative bg-neutral-400 w-full h-2 rounded-[3px]"
      >
        {/* Selected range */}
        <div
          className="absolute h-2 bg-neutral-800 rounded-[3px]"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>

        {/* Left handle */}
        <div
          className="absolute w-4 h-4 bg-neutral border border-neutral-800 rounded-full cursor-pointer -top-1"
          style={{ left: `calc(${minPercent}% - 6px)` }}
          onMouseDown={() => {
            const move = (e) => handleMove(e, "min");
            document.addEventListener("mousemove", move);
            document.addEventListener(
              "mouseup",
              () => {
                document.removeEventListener("mousemove", move);
              },
              { once: true }
            );
          }}
        ></div>

        {/* Right handle */}
        <div
          className="absolute w-4 h-4 bg-neutral border border-neutral-800 rounded-full cursor-pointer -top-1"
          style={{ left: `calc(${maxPercent}% - 6px)` }}
          onMouseDown={() => {
            const move = (e) => handleMove(e, "max");
            document.addEventListener("mousemove", move);
            document.addEventListener(
              "mouseup",
              () => {
                document.removeEventListener("mousemove", move);
              },
              { once: true }
            );
          }}
        ></div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p>${Math.round(priceRange.min)}</p>
        <p>${Math.round(priceRange.max)}</p>
      </div>
    </div>
  );
}
