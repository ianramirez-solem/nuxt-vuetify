import { createVuetify } from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    // add theme
    theme: {
      defaultTheme: 'light'
    },
    // Add the custom iconset
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });

  app.vueApp.use(vuetify);
});