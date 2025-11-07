import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eduhush.myapp',
  appName: 'EduhushApp',
  webDir: 'out', // ✅ should be 'out' (Next.js export folder, not 'public')
  server: {
    // ✅ optional: for live testing during development
    // comment this section out if you're building offline mode
    url: 'https://eduhush.vercel.app',
    cleartext: true
  }
};

export default config;
