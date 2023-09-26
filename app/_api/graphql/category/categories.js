export const getCategories = (params) => {
  const { category_slug } = params;
  const category_slug_Val = `"${category_slug}"` || null;
  return {
    query: `
    query getCategoryBySlug($slug: [String] = ${category_slug_Val}) {
        categories(where: {slug: $slug}) {
            edges {
            node {
                id
                name
                slug
                count
                categoryId
                description
                parentId
                taxonomyName
                uri
            }
            }
        }
    }
    `,
  };
};
