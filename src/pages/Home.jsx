import { useMemo } from "react";

import Loading from "../components/ui/Loading";
import Section from "../features/home/components/Section";
import ButtonTop from "../components/ui/ButtonTop";
import Hero from "./../features/home/components/Hero";
import Categories from "../features/home/components/Categories";

import useProducts from "../features/products/hooks/useProducts";
import ErrorMsg from "../components/ui/ErrorMsg";

export default function Home() {
  const { data, isPending, error } = useProducts({ limit: 80 });

  const top10 = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 10);
  }, [data]);

  const modern10 = useMemo(() => {
    if (!data) return [];
    return [...data]
      .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
      .slice(0, 10);
  }, [data]);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg msg={error.response.data.message} />;
  }
  return (
    <div className="relative pt-14 sm:pt-27 pb-8 sm:pb-2">
      <Hero />

      <Categories />

      <Section
        heading="Best sellers"
        data={modern10}
        loading={isPending}
        error={error}
      />

      <Section
        heading="Discover new arrivals"
        data={top10}
        loading={isPending}
        error={error}
      />

      <ButtonTop />
    </div>
  );
}
