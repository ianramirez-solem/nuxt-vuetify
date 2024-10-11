import { defineStore } from "pinia";
import { ref, computed } from "vue";
import faker from "@faker/faker.js";

type Customer = {
  CustomerID: string;
  FullName: string;
  EmailAddress: string;
};

export const useUsersStore = defineStore("Users", () => {
  const users = ref<Customer[]>([]);
  const searchQuery = ref(""); // Agregando una propiedad para la búsqueda
  const currentPage = ref(1);
  const itemsPerPage = 20;

  // Computed para filtrar los usuarios según la búsqueda
  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    return users.value.filter((customer) =>
      customer.FullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      customer.EmailAddress.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  // Computed para obtener solo los usuarios filtrados y paginados
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredUsers.value.slice(start, end);
  });

  const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));

  // Cargar datos desde el endpoint
  const loadData = async () => {
    try {
      users.value = await $fetch("/api/customers");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.data.message,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Funciones para cambiar de página
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  return { users, loadData, paginatedUsers, currentPage, totalPages, nextPage, prevPage, searchQuery, filteredUsers };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}
