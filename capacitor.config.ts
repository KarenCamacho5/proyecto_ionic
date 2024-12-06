import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Proyecto-ionic',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true, 
  },
};

export default config;
