import dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env.development',
});

const baseConfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrationsTableName: 'migrations',
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'dist/entities/*.js',
  },
};

const config =
  process.env.NODE_ENV === 'production'
    ? {
        ...baseConfig,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : baseConfig;

export default config;
