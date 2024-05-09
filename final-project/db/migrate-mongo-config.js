const config = {
  mongodb: {
      url: "mongodb://localhost:27017",
      databaseName: "bookShopMigrations",
      options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'esm',
};

export default config;