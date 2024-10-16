<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <material-card style="overflow: visible;" color="green" title="Edit Profile" text="Complete your profile">
          <v-form>
            <v-container class="py-0">
              <v-row>
                <!-- Campo de usuario no editable -->
                <v-col cols="12" md="4">
                  <v-text-field
                    label="User Name"
                    v-model="form.name"
                    disabled
                  />
                </v-col>

                <!-- Campo de nombre completo editable -->
                <v-col cols="12" md="8">
                  <v-text-field
                    label="Full Name"
                    v-model="form.fullName"
                    class="purple-input"
                  />
                </v-col>

                <!-- Campo de RUT editable -->
                <v-col cols="12" md="6">
                  <v-text-field
                    label="RUT"
                    v-model="form.rut"
                    class="purple-input"
                  />
                </v-col>

                <!-- Campo de Documento editable -->
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Document"
                    v-model="form.doc"
                    class="purple-input"
                  />
                </v-col>

                <!-- Campo de contraseña obligatorio para confirmar cambios -->
                <v-col cols="12" md="12">
                  <v-text-field
                    label="Password"
                    v-model="form.password"
                    type="password"
                    class="purple-input"
                    :rules="[rules.required]"
                    hint="Enter your password to confirm changes"
                    persistent-hint
                  />
                </v-col>

                <!-- Botón de actualización -->
                <v-col cols="12" class="text-right">
                  <v-btn color="success" @click="updateProfile">Update Profile</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>

      <!-- Card con Avatar y detalles del usuario -->
      <v-col cols="12" md="4">
        <material-card style="overflow: visible;" class="v-card-profile">
          <template #offset>
            <v-avatar
              class="mx-auto d-block elevation-6 mt-5"
              :image="useAuthStore().user.avatar"
              size="130"
            ></v-avatar>
          </template>

          <v-card-text class="text-center">
            <h3 class="overline mb-3">Profile</h3>

            <!-- Mostrar nombre completo -->
            <h4 class="font-weight-light">{{ useAuthStore().user.fullName }}</h4>

            <!-- Mostrar RUT -->
            <p class="font-weight-light mt-5">
              Rut: {{ useAuthStore().user.rut }}
            </p>

            <!-- Mostrar Documento -->
            <p class="font-weight-light mt-5">
              Doc: {{ useAuthStore().user.doc }}
            </p>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth"; // Asumiendo que usas Pinia o algo similar

// Variables reactivas para los datos editables
const form = reactive({
  name: useAuthStore().user.name,
  fullName: useAuthStore().user.fullName,
  rut: useAuthStore().user.rut,
  doc: useAuthStore().user.doc,
  password: '',
});

// Reglas de validación
const rules = {
  required: value => !!value || 'Password is required',
};

// Función para manejar la actualización del perfil
function updateProfile() {
  // Aquí deberías llamar a la función que actualiza el perfil del usuario
  // Puede ser una acción de Pinia o un API call
  console.log("Perfil actualizado", form);
}

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>

<style>
.material-card {
  overflow: visible;
}
</style>