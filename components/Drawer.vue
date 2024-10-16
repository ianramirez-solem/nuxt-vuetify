<template>
  <v-navigation-drawer 
    id="app-drawer"
    v-model="inputValue"
    :width="miniVariant ? 56 : 260"
    :mini-variant="miniVariant"
    :style="{ height: '100vh', position: 'fixed', top: '0', left: '0'  }"
    elevation="5"
    floating
  >
       <v-list-item
          align-self-center
          class="text-center justify-center align-center"
          style="height: 34px"
        >
          <h4 v-if="!miniVariant" class="my-6 text-cyan-lighten-1">CHECKID</h4>
        </v-list-item>  

      <v-list density="compact" nav>
          <v-list-item v-for="(link, i) in links" :key="i" :to="link.to" active-class="primary white--text">
              <template #prepend>
                  <v-icon>{{ link.icon }}</v-icon>
              </template>
              <v-list-item-title v-if="!miniVariant">{{ link.text }}</v-list-item-title>
          </v-list-item>
      </v-list>

      <template #append>
          <v-list density="compact" nav>
              <v-list-item to="/logout">
                  <template #prepend>
                      <v-icon>mdi-exit-to-app</v-icon>
                  </template>
                  <v-list-item-title v-if="!miniVariant" class="font-weight-light">Logout</v-list-item-title>
              </v-list-item>
          </v-list>
      </template>
  </v-navigation-drawer>
</template>

<script>
// Utilities

import { mapActions, mapState } from 'pinia';

export default {
  data: () => ({
      links: [
          {
              to: '/dashboard',
              icon: 'mdi-view-dashboard',
              text: 'Dashboard',
          },
          {
              to: '/dashboard/user-profile',
              icon: 'mdi-account',
              text: 'User Profile',
          },
          {
              to: '/dashboard/table-list',
              icon: 'mdi-clipboard-outline',
              text: 'Table List',
          },
          {
              to: '/dashboard/tabs',
              icon: 'mdi-format-list-bulleted',
              text: 'Tabs',
          },
          {
              to: '/dashboard/notifications',
              icon: 'mdi-bell',
              text: 'notifications',
          },

      ],
  }),

  computed: {
      ...mapState(useAppStore, ['color', 'miniVariant']),
      inputValue: {
          get() {
              return useAppStore().drawer;
          },
          set(val) {
              this.setDrawer(val);
          },
      },
  },

  methods: {
    ...mapActions(useAppStore, ['setDrawer', 'toggleDrawer', 'toggleMiniVariant']),
  },
};
</script>