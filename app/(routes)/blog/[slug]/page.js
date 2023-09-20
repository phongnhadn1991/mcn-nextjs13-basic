"use client";
import { getPostBySlug } from "@/app/_api/graphql/posts/posts";
import useSWR from "swr";
import API from "../../../_api/configAxios";

const DetailBlog = ({ params }) => {
  const fetcher = async () => {
    return await API.post(process.env.WP_API_GRAPHQL, getPostBySlug()).then(
      (res) => res.data.data
    );
  };

  const { data: postData } = useSWR("graphql_getPostBySlug", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log(postData)

  return (
    <div className="c-page__homepage">
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="heading text-center">
          <h2 className="text-4xl font-semibold uppercase mb-2">
           Lorem
          </h2>
          <div
            className=" text-gray-600 leading-relaxed"
          >Lorem</div>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
