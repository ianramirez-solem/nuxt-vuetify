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
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <!-- Input del nombre de usuario con v-model -->
      <v-text-field
        v-model="name"
        name="name"
        density="compact"
        placeholder="User"
        prepend-inner-icon="mdi-account"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <!-- Input de la contraseña con v-model -->
      <v-text-field
        v-model="password"
        name="password"
        type="password"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
      ></v-text-field>

      <!-- Botón de login -->
      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        type="submit"
        @click="login"
      >
        Log In
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';  // Asegúrate de importar ref
import { useAuthStore } from '@/stores/auth'; // Ajusta el path según tu proyecto

const name = ref('');     // Variable reactiva para el nombre de usuario
const password = ref(''); // Variable reactiva para la contraseña

const authStore = useAuthStore();

const login = async () => {
  try {
    // Envía los valores de name y password a la función de autenticación
    await authStore.signIn({ name: name.value, password: password.value });

    if (authStore.loggedIn) {
      return await navigateTo("/dashboard");  // Redirige a /dashboard si el login es exitoso
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);
    // Aquí podrías manejar los errores, como mostrar mensajes de error
  }
};

definePageMeta({
  middleware: "already-logged-in",
})

</script>
