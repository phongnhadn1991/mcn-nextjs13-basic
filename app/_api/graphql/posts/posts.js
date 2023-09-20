export const getAllPosts = (limitPost) => ({
  query: `
  query NewQuery($first: Int = ${limitPost}) {
    posts(first: $first) {
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
    }
  }
  `,
});
