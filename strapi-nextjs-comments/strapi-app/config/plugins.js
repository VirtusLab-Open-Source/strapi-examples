module.exports = {
  comments: {
    enable: true,
    config: {
      moderatorRoles: [],
      badWords: true,
      enabledCollections: [ 'api::post.post' ],
      approvalFlow: [],
      entryLabel: {
        'api::post.post': [ 'Title' ]
      },
      reportReasons: {
        BAD_LANGUAGE: 'BAD_LANGUAGE',
        DISCRIMINATION: 'DISCRIMINATION',
        OTHER: 'OTHER'
      }
    }
  }
}