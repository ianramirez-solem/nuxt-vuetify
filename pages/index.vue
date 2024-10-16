<template>
  <div>
    <v-container class="text-center mt-16">
      <h1>Login Form</h1>
    </v-container>

    <v-card
      class="mx-auto pa-12 pb-8 mt-5"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <!-- Mostrar mensaje de error si existe -->
      <v-alert
        v-if="errorMessage"
        type="error"
        border="start"
        border-color="red"
        class="mb-4"
        text
      >
        {{ errorMessage }}
      </v-alert>

      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <!-- Input del nombre de usuario con validación -->
      <v-text-field
        v-model="name"
        name="name"
        density="compact"
        placeholder="User"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :error="nameError" 
        :error-messages="nameErrorMessage" 
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
        <a class="text-caption text-decoration-none text-blue" href="#">
          Forgot login password?
        </a>
      </div>

      <!-- Input de la contraseña con validación -->
      <v-text-field
        v-model="password"
        name="password"
        type="password"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        :error="passwordError" 
        :error-messages="passwordErrorMessage" 
      ></v-text-field>

      <!-- Botón de login con loading y deshabilitado si está cargando -->
      <v-btn
        :loading="loading"
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        type="submit"
        @click="login"
        :disabled="loading"
      >
        Log In
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Ajusta el path según tu proyecto

const name = ref('');          // Variable reactiva para el nombre de usuario
const password = ref('');      // Variable reactiva para la contraseña
const loading = ref(false);    // Estado de carga
const errorMessage = ref('');  // Mensaje de error general

// Variables para los errores de validación específicos
const nameError = ref(false);
const nameErrorMessage = ref('');
const passwordError = ref(false);
const passwordErrorMessage = ref('');

const authStore = useAuthStore();

const validateFields = () => {
  let isValid = true;
  
  // Validación para el campo de nombre
  if (!name.value) {
    nameError.value = true;
    nameErrorMessage.value = 'El nombre de usuario es obligatorio.';
    isValid = false;
  } else {
    nameError.value = false;
    nameErrorMessage.value = '';
  }

  // Validación para el campo de contraseña
  if (!password.value) {
    passwordError.value = true;
    passwordErrorMessage.value = 'La contraseña es obligatoria.';
    isValid = false;
  } else {
    passwordError.value = false;
    passwordErrorMessage.value = '';
  }

  return isValid;
};

const login = async () => {
  if (!validateFields()) {
    return; 
  }

  loading.value = true;  // Activar el estado de carga
  errorMessage.value = '';  // Limpiar cualquier mensaje de error previo

  try {
    // Envía los valores de name y password a la función de autenticación
    await authStore.signIn({ name: name.value, password: password.value });

    if (authStore.loggedIn) {
      loading.value = false;  // Detener el estado de carga
      return await navigateTo("/dashboard");  // Redirige a /dashboard si el login es exitoso
    }
  } catch (error) {
    loading.value = false;  // Detener el estado de carga
    
    // Manejo de errores específicos
    if (error.response) {
      // Si el servidor devuelve un código de error
      const statusCode = error.response.status;

      if (statusCode === 500) {
        errorMessage.value = 'Error al conectarse a la base de datos. Inténtalo de nuevo más tarde.';
      } else if (statusCode === 401 || statusCode === 403) {
        errorMessage.value = 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.';
      } else {
        errorMessage.value = 'Ocurrió un error. Por favor, intenta de nuevo.';
      }
    } else {
      // Si ocurre un error en el cliente o no hay conexión con el servidor
      errorMessage.value = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
    }
  }
};

definePageMeta({
  middleware: "already-logged-in",
});
</script>
