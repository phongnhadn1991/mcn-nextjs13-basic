"use client";
import ArtilceItem from "@/_components/article/post/ArtilceItem";
import ArticleItemSkeleton from "@/_components/article/post/ArticleItemSkeleton";
import useSWR from "swr";
import API from "@/_api/configAxios";
import { getAllPosts } from "@/_api/graphql/posts/posts";
import Pagination from "@/_components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BlogPage = () => {
  const router = useRouter();
  const pageParam = useSearchParams().get("page");

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
  } = useSWR(`${currentPage}, '/blog'`, () =>
    fetcherPosts(currentPage)
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

export default BlogPage;
