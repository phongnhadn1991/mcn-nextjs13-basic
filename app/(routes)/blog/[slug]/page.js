"use client";
import { getPostBySlug } from "@/app/_api/graphql/posts/posts";
import useSWR from "swr";
import API from "../../../_api/configAxios";

const DetailBlog = ({ params }) => {
  const fetcher = async () => {
    return await API.post(
      process.env.WP_API_GRAPHQL,
      getPostBySlug(params?.slug)
    ).then((res) => res.data.data.postBy);
  };

  const key = params.slug ? `graphql_getPostBySlug/blog/${params?.slug}` : null;

  const { data: postData, isLoading: postIsLoading } = useSWR(key, fetcher);

  return (
    <div className="c-page__homepage">
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        {postIsLoading && !postData && <LoadingPageDetail />}
        {postData && <DetailPage postData={postData} />}
      </div>
    </div>
  );
};

export const LoadingPageDetail = () => (
  <div className="body_detail">
    <div className="isLoadingPage animate-pulse px-16">
      <div className="heading text-center m-5">
        <h2 className="text-4xl font-semibold uppercase mb-2 leading-snug w-3/6 m-auto h-4 bg-gray-200 rounded-full mb-2"></h2>
        <h2 className="text-4xl font-semibold uppercase mb-2 leading-snug w-5/6 m-auto h-4 bg-gray-200 rounded-full mb-2"></h2>
        <h2 className="text-4xl font-semibold uppercase mb-2 leading-snug w-5/6 m-auto h-4 bg-gray-200 rounded-full mb-2"></h2>
      </div>
      <div className="w-3/6 m-auto flex items-center justify-center h-80 mb-4 bg-gray-300 rounded-2xl mb-8">
        <svg
          className="w-10 h-10 text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      {[...Array(15)].map((e, i) => (
        <div
          key={i}
          className="text-gray-600 leading-relaxed box-content h-2 bg-gray-200 rounded-full w-full mb-3"
        ></div>
      ))}
    </div>
  </div>
);

export const DetailPage = ({ postData }) => (
  <div className="body_detail">
    <div className="heading text-center">
      <h2 className="text-4xl font-semibold uppercase mb-2 leading-snug">
        {postData?.title}
      </h2>
    </div>
    <article
      className="post-content text-gray-600 leading-relaxed box-content"
      dangerouslySetInnerHTML={{ __html: postData?.content }}
    ></article>
  </div>
);

export default DetailBlog;
