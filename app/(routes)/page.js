"use client";
import ArtilceItem from "../_components/article/item/ArtilceItem";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const HomePage = () => {
  const { data, error, isLoading } = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div className="c-page__homepage">
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="heading text-center">
          <h2 className="text-4xl font-semibold uppercase mb-2">News Event</h2>
          <p className="line-clamp-1 px-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
            nulla?
          </p>
        </div>
        <div className="listPost grid grid-cols-3 gap-x-10 gap-y-16 pt-12">
          {[...Array(9)].map((e, i) => (
            <ArtilceItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
