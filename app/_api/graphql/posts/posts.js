export const getAllPosts = (limitPost) => ({
  query: `
  query getAllPost($first: Int = ${limitPost}) {
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

export const getPostBySlug = (slug) => ({
  query: `
  query PostBySlug($slug: String = "tap-doan-parkcity-property-holdings-den-tu-malaysia-tim-kiem-co-hoi-dau-tu-bat-dong-san-tai-da-nang-2") {
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
