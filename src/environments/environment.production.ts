import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: true,
  environmentName: 'production',
  baseUrl: 'http://portal-service/api/',
};

export const environment = Object.assign(commonEnv, env);
