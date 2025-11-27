import AllProducts from "../../products/components/AllProducts";

export default function Section({ heading, data, loading, error }) {
  return (
    <section>
      <h1 className="uppercase font-bold font-garamond text-3xl text-light-brown text-center py-5">
        {heading}
      </h1>
      <AllProducts data={data} isPending={loading} errorMsg={error} />
    </section>
  );
}
