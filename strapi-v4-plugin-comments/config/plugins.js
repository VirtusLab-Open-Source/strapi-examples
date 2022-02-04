module.exports = {
  'graphql': {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  'comments': {
      enabled: true,
      config: {
        approvalFlow: ['api::blog-post.blog-post'],
        entryLabel: {
          'api::blog-post.blog-post': ['alternative_subject'],
        },
      },
    },
};