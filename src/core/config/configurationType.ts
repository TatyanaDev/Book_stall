import process from 'process';

const getSettings = () => ({
  apiSettings: {
    PORT: Number.parseInt(process.env.PORT || '5000'),
  },
  dbSettings: {
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number.parseInt(process.env.DB_PORT || '5432'),
    DB_TYPE: process.env.DB_TYPE,
    USERNAME: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
  },
});

export type ConfigurationType = ReturnType<typeof getSettings>;

export default getSettings;
