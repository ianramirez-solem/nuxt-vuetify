<template>
    <v-container>
      <v-tabs v-model="activeTab" background-color="primary" dark>
        <v-tab v-for="tab in tabs" :key="tab.title">
          {{ tab.title }}
        </v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="tab in tabs" :key="tab.title">
          <v-card>
            <v-card-title>{{ tab.title }}</v-card-title>
            <v-card-text>{{ tab.content }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </template>


<script>
export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        { title: 'Home', content: 'Welcome to the homepage! Here is some random content.' },
        { title: 'Profile', content: 'This is your profile tab. You can manage your personal info here.' },
        { title: 'Settings', content: 'Settings tab allows you to customize your experience.' },
        { title: 'About', content: 'Learn more about this project in the About tab.' }
      ],
    };
  },
};

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>