export const getAllPosts = (params) => {
  const { per_page, offset, category_slug } = params;
  const per_page_Val = per_page || 9;
  const offset_Val = offset || 0;
  const category_slug_Val = category_slug || "";
  return {
    query: `
    query getAllPost($categoryName: String = "${category_slug_Val}", $size: Int = ${per_page_Val}, $offset: Int = ${offset_Val}) {
      posts(where: {categoryName: $categoryName, offsetPagination: { offset: $offset, size: $size}}) {
        nodes {
          id
          postId
          date
          slug
          title(format: RENDERED)
          excerpt(format: RENDERED)
          featuredImage {
            node {
              sourceUrl
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                  name
                }
              }
            }
          }
          categories {
            nodes {
              id
              categoryId
              name
              count
              slug
              taxonomyName
              uri
            }
          }
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
    }
    `,
  };
};

export const getPostBySlug = (slug) => ({
  query: `
  query PostBySlug($slug: String = "${slug}") {
    postBy(slug: $slug) {
      id
      content
      excerpt
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
  `,
});