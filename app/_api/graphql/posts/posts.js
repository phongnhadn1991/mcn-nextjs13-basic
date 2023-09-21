export const getAllPosts = (params) => {
  const { per_page, offset } = params;
  const per_page_Val = per_page ? per_page : 9;
  const offset_Val = offset ? offset : null;
  return {
    query: `
  query getAllPost($size: Int = ${per_page_Val}, $offset: Int = ${offset_Val}) {
    posts(where: {offsetPagination: {offset: $offset, size: $size}}) {
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
