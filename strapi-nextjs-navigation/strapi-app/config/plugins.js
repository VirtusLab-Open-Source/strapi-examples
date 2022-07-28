module.exports = {
  navigation: {
    enable: true,
    config:
    {
      additionalFields: [],
      contentTypes: ['api::page.page'],
      contentTypesNameFields: {
        'api::page.page': ['name']
      },
      contentTypesPopulate: {},
      allowedLevels: 2,
      gql: { navigationItemRelated: ['Page'] },
      i18nEnabled: false,
      pruneObsoleteI18nNavigations: false,
    },
  }
}