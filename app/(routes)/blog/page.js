"use client";
import ArtilceItem from "../../_components/article/post/ArtilceItem";
import ArticleItemSkeleton from "../../_components/article/post/ArticleItemSkeleton";
import useSWR from "swr";
import API from "../../_api/configAxios";
import { getAllPosts, getTotalPosts } from "../../_api/graphql/posts/posts";
import Pagination from "@/app/_components/pagination/Pagination";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BlogPage = () => {
  const router = useRouter();
  const pageParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_PER = 9;

  const fetcherPosts = async (page) => {
    return await API.post(
      process.env.WP_API_GRAPHQL,
      getAllPosts({ per_page: PAGE_PER, offset: page * PAGE_PER })
    ).then((res) => res.data.data.posts);
  };
  const {
    data: posts,
    error: postError,
    isLoading: postIsLoading,
  } = useSWR(`graphql_getAllPosts/blogpage/${currentPage}`, () =>
    fetcherPosts(currentPage)
  );

  const fetcherPostTotal = async () => {
    return await API.post(process.env.WP_API_GRAPHQL, getTotalPosts()).then(
      (res) => res.data.data.posts
    );
  };
  const { data: postsTotal } = useSWR(`graphql_getPostTotal`, fetcherPostTotal);

  const PAGE_COUNT = Math.ceil(
    postsTotal?.pageInfo?.offsetPagination?.total / PAGE_PER
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    router.push(`?page=${selected + 1}`, { scroll: false });
  };

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
        {postsTotal && (
          <Pagination pageCount={PAGE_COUNT} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
