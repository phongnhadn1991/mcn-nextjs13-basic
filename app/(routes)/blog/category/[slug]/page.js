"use client";
import ArtilceItem from "@/_components/article/post/ArtilceItem";
import ArticleItemSkeleton from "@/_components/article/post/ArticleItemSkeleton";
import useSWR from "swr";

import { getPostBySlug, getTotalPosts  } from "@/_api/graphql/posts/posts";
import Pagination from "@/_components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import API from "@/_api/configAxios";

const CategoryPage = ({ params }) => {
  const router = useRouter();
  const pageParam = useSearchParams().get("page");

  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_PER = 9;

  const fetcherPostByCategorySlug = async () => {
    return await API.post(
      process.env.WP_API_GRAPHQL,
      getPostBySlug(params.slug)
    ).then((res) => {
      return res.data.data.posts
    });
  };
  const {
    data: posts,
    error: postError,
    isLoading: postIsLoading,
  } = useSWR(`graphql_getAllPosts/blog/category${params.slug}`,
    fetcherPostByCategorySlug
  );


  const PAGE_COUNT = Math.ceil(
    posts?.pageInfo?.offsetPagination?.total / PAGE_PER
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    router.push(`?page=${selected + 1}`);
  };

  useEffect(() => {
    if (pageParam && parseInt(pageParam) > PAGE_COUNT) {
      router.replace("?page=1", { scroll: false });
    } else {
      pageParam && parseInt(pageParam) <= PAGE_COUNT
        ? setCurrentPage(parseInt(pageParam) - 1)
        : 0;
    }
  }, [pageParam, PAGE_COUNT]);

  useEffect(() => {
    console.log("🚀  posts :", posts)
  }, [posts]);

  return (
    <div className="c-page__blogpage">
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="heading text-center">
          <h2 className="text-4xl font-semibold uppercase mb-2">Blog</h2>
        </div>
        <div className="listPost grid grid-cols-3 gap-x-10 gap-y-16 pt-12">
          {postIsLoading &&
            [...Array(3)].map((e, i) => <ArticleItemSkeleton key={i} />)}

          {posts?.nodes &&
            posts?.nodes?.map((post, i) => (
              <ArtilceItem post={post} key={post.id} />
            ))}
        </div>
        {posts && (
          <Pagination
            pageCount={PAGE_COUNT}
            onPageChange={handlePageChange}
            forcePage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
