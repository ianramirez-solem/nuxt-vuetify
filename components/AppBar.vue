<template>
  <v-app-bar id="core-app-bar" absolute color="transparent" flat height="64">
      <v-toolbar-title class="font-weight-light align-self-center height: 33px">
          <v-btn v-show="!responsive" icon @click.stop="onClick">
              <v-icon>mdi-view-list</v-icon>
          </v-btn>
          <v-btn v-show="responsive" icon @click="toggleMiniVariant">
            <v-icon v-if="miniVariant">mdi-chevron-right</v-icon> <!-- Ícono cuando está colapsado -->
            <v-icon v-else>mdi-chevron-left</v-icon> <!-- Ícono cuando está expandido -->
          </v-btn>
          {{ formattedTitle }}
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items class="flex-fill">
          <v-row align="center" class="mx-0">
              <v-text-field class="mr-4 purple-input" variant="outlined" prepend-inner-icon="mdi-magnify" color="purple" label="Search..." hide-details/>

              <!-- <v-btn height="48" to="/dashboard" icon>
                  <v-icon color="tertiary">mdi-view-dashboard</v-icon>
              </v-btn> -->

              <v-menu bottom left offset-y transition="slide-y-transition">
                  <template #activator="{ props }">
                      <v-btn class="toolbar-items" height="48" to="" v-bind="props" icon>
                          <v-badge color="error">
                              <template #badge>
                                  {{ notifications.length }}
                              </template>
                              <v-icon color="tertiary">mdi-bell</v-icon>
                          </v-badge>
                      </v-btn>
                  </template>
                  <v-list>
                      <v-list-item v-for="(item, index) in notifications" :key="index" :value="index">
                          <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                  </v-list>
              </v-menu>

              <v-btn height="48" icon @click="toggleTheme">
                  <v-icon color="tertiary">mdi-theme-light-dark</v-icon>
              </v-btn>

              <v-btn to="/dashboard/user-profile" height="48" icon>
                  <v-icon color="tertiary">mdi-account</v-icon>
              </v-btn>
          </v-row>
      </v-toolbar-items>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapActions, mapState } from 'pinia';
import { useDisplay, useTheme } from 'vuetify';

export default {
  setup() {
      const theme = useTheme();
      const cookieTheme = useCookieTheme();

      return {
          theme,
          toggleTheme: () => {
              const themeValue = theme.global.current.value.dark ? 'light' : 'dark';
              theme.global.name.value = themeValue;
              cookieTheme.value = themeValue;
          },
      };
  },

  data: () => ({
      notifications: [
          'Correo',
          'Aviso',
          "Aviso",
          'Recordatorio',
          'Incremento',
          'Estadisticas',
      ],
      title: null,
  }),

  computed: {
      responsive() {
          const display = useDisplay();
          return display.lgAndUp.value;
      },
      formattedTitle() {
      // Reemplaza todos los guiones por espacios
      return this.title.replace(/-/g, ' ').toUpperCase();
      },
      ...mapState(useAppStore, ['miniVariant']),
  },

  watch: {
      $route(val) {
          this.title = val.name;
      },
  },

  created() {
      this.setDrawer(this.responsive);
      this.title = this.$route.name;
  },

  methods: {
      ...mapActions(useAppStore, ['setDrawer', 'toggleDrawer', 'toggleMiniVariant']),
      onClick() {
          this.setDrawer(!useAppStore().drawer);
      },
  },
};
</script>

<style>
/* Fix coming in v2.0.8 */
#core-app-bar {
  width: auto;
}

#core-app-bar a {
  text-decoration: none;
}
</style>