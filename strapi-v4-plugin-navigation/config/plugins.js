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
  'navigation': {
      enabled: true,
      config: {
        additionalFields: ['audience'],
        allowedLevels: 2,
        contentTypes: ['api::page.page'],
        contentTypesNameFields: {
          'api::page.page': ['Title'],
        },
      },
    },
};