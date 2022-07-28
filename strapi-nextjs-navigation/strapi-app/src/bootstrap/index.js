const { pages, navigations, navigationItems, navigationItemsRelations } = require('./data.json');
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

async function importPages() {
  for (const page of pages) {
    await createEntry({
      uid: "api::page.page",
      entry: {
        ...page,
        publishedAt: Date.now(), // Make sure it's not draft
      },
    });
  }
  console.log(`Imported ${pages.length} pages from 'data.json'`);
}

async function importNavigations() {
  for (const navigation of navigations) {
    await createEntry({
      uid: "plugin::navigation.navigation",
      entry: navigation,
    });
  }
  console.log(`Imported ${navigations.length} navigations from 'data.json'`);
}

async function importNavigationsItems() {
  for (const navigationItem of navigationItems) {
    await createEntry({
      uid: "plugin::navigation.navigation-item",
      entry: navigationItem,
    });
  }
  console.log(`Imported ${navigationItems.length} navigationItems from 'data.json'`);
}

async function importNavigationsItemsRelated() {
  for (const navigationItemsRelated of navigationItemsRelations) {
    await createEntry({
      uid: "plugin::navigation.navigations-items-related",
      entry: navigationItemsRelated,
    });
  }
  console.log(`Imported ${navigationItemsRelations.length} navigationItemsRelations from 'data.json'`);
}

async function importSeedData() {
  await setPublicPermissions({
    "api::post.post": ["find", "findOne"],
    "plugin::navigation.client": ["render"],
  });

  await importPages();
  await importNavigations();
  await importNavigationsItemsRelated();
  await importNavigationsItems();
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