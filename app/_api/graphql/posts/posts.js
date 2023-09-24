export const getAllPosts = (params) => {
  const { per_page, offset, category_slug } = params;
  const per_page_Val = per_page ? per_page : 9;
  const offset_Val = offset ? offset : null;
  const category_slug_val = params?.category_slug
    ? JSON.stringify(params?.category_slug)
    : null;
  return {
    query: `
  query getAllPost($size: Int = ${per_page_Val}, $offset: Int = ${offset_Val}) {
    posts(where: {offsetPagination: { offset: $offset, size: $size}, categoryName: null}) {
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

export const getPostBySlug = (slug) => (
  slug ? slug : '',
  {
    query: `
    query PostBySlug($categoryName: String = "${slug}") {
      posts(where: {categoryName: $categoryName}) {
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
  });
