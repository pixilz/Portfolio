import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://zoeclarno.com',
  integrations: [vue()],
  build: { inlineStylesheets: 'always' },
});
