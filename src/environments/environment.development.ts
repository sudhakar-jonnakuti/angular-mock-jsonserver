import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: false,
  environmentName: 'development',
  baseUrl: 'http://localhost:3000/api/',
};

export const environment = Object.assign(commonEnv, env);
