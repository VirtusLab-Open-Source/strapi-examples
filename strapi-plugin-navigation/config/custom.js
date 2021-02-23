module.exports = {
    plugins: {
        navigation: {
            additionalFields: ['audience'],
            excludedContentTypes: ["plugins::", "strapi"],
            allowedLevels: 2,
            contentTypesNameFields: {
              'blog_posts': ['Title'],
            },
        },
    },
};
