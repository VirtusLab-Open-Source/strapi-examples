const { posts, comments } = require('./data.json');
async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup",
  });
  const initHasRun = await pluginStore.get({ key: "initHasRun" });
  await pluginStore.set({ key: "initHasRun", value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({
      where: {
        type: "public",
      },
    });

  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query("plugin::users-permissions.permission").create({
        data: {
          action: `${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

async function createEntry({ uid, entry }) {
  try {
    await strapi.entityService.create(uid, {
      data: entry,
    });
  } catch (error) {
    console.error({ uid, entry, error });
  }
}

async function importPosts() {
  for (const post of posts) {
    await createEntry({
      uid: "api::post.post",
      entry: {
        ...post,
        publishedAt: Date.now(), // Make sure it's not draft
      },
    });
  }
  console.log(`Imported ${posts.length} posts from 'data.json'`)
}

async function importComments() {
  for (const comment of comments) {
    await createEntry({
      uid: "plugin::comments.comment",
      entry: comment,
    });
  }
  console.log(`Imported ${comments.length} comments from 'data.json'`)
}

async function importSeedData() {
  await setPublicPermissions({
    "api::post.post": ["find", "findOne"],
    "plugin::comments.client": ["findAllFlat", "findAllInHierarchy", "post", "put", "removeComment", "reportAbuse"],
  });

  await importPosts();
  await importComments();
}

module.exports = async () => {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      await importSeedData();
      console.log("Data imported");
    } catch (error) {
      console.log("Could not import seed data");
      console.error(error);
    }
  }
}