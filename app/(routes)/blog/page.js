"use client";
import ArtilceItem from "../../_components/article/post/ArtilceItem";
import ArticleItemSkeleton from "../../_components/article/post/ArticleItemSkeleton";
import useSWR from "swr";
import API from "../../_api/configAxios";
import { getAllPosts } from "../../_api/graphql/posts/posts";

const BlogPage = () => {
  const fetcher = async () => {
    return await API.post(
      process.env.WP_API_GRAPHQL,
      getAllPosts({ per_page: 9 })
    ).then((res) => res.data.data.posts.nodes);
  };

  const {
    data: posts,
    error: postError,
    isLoading: postIsLoading,
  } = useSWR("graphql_getAllPosts/blogpage", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (postError) return "An error has occurred.";

  return (
    <div className="c-page__blogpage">
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="heading text-center">
          <h2 className="text-4xl font-semibold uppercase mb-2">Blog</h2>
        </div>
        <div className="listPost grid grid-cols-3 gap-x-10 gap-y-16 pt-12">
          {postIsLoading &&
            [...Array(3)].map((e, i) => <ArticleItemSkeleton key={i} />)}

          {posts &&
            posts?.map((post, i) => <ArtilceItem post={post} key={post.id} />)}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
