<template>
  <v-container class="py-5">
    <!-- Campo de búsqueda -->
    <v-row class="my-5">
      <v-col>
        <v-text-field
          v-model="searchQuery"
          placeholder="Search by name or email"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <!-- Mensaje si no hay clientes -->
    <v-row v-if="!paginatedUsers.length" class="flex flex-col gap-5 items-center">
      <v-col class="text-center">
        <v-icon size="40">mdi-account-group</v-icon>
        <p>No customers loaded</p>
      </v-col>
    </v-row>

    <!-- Tabla de clientes -->
    <v-row v-else>
      <v-col cols="12">
        <material-card color="cyan" title="Customer Data" text="Manage customers here">
          <v-data-table :headers="headers" :items="paginatedUsers" hide-default-footer />
        </material-card>
      </v-col>
    </v-row>

    <!-- Controles de paginación -->
    <v-row class="mt-4 justify-space-between">
      <v-btn @click="prevPage" :disabled="currentPage === 1" outlined>
        Anterior
      </v-btn>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <v-btn @click="nextPage" :disabled="currentPage === totalPages" outlined>
        Siguiente
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores/users';

const userStore = useUsersStore();
const { paginatedUsers, currentPage, totalPages, searchQuery } = storeToRefs(userStore);
const { loadData, nextPage, prevPage } = userStore;

const headers = [
  { sortable: false, title: "ID", value: "CustomerID" },
  { sortable: false, title: "Name", value: "FullName" },
  { sortable: false, title: "Email", value: "EmailAddress" },
];

onMounted(() => {
  loadData();
});

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>

