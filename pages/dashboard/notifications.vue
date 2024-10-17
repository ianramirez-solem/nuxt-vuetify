<template>
  <v-container>
    <v-card>
      <v-card-title>
        Notificaciones
      </v-card-title>

      <v-list>
        <v-list-item
          v-for="(notification, index) in notifications"
          :key="index"
          class="flex justify-space-between align-center"
        >
          <!-- Contenedor para icono y texto -->
          <div class="d-flex align-center">
            <!-- Icono -->
            <v-icon :color="notification.color" class="me-4">{{ notification.icon }}</v-icon>

            <!-- Título y mensaje -->
            <div>
              <v-list-item-title>{{ notification.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>
            </div>

            <!-- Botón de acción -->
            <v-btn icon @click="removeNotification(index)" class="no-shadow-btn ms-auto">
              <v-icon>mdi-close</v-icon>
            </v-btn>

          </div>

        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-btn color="primary" @click="markAllAsRead">Marcar todas como leídas</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<script>

export default {
  data() {
    return {
      notifications: [
        { title: 'Nuevo mensaje', message: 'Has recibido un nuevo mensaje.', icon: 'mdi-email', color: 'blue' },
        { title: 'Actualización de sistema', message: 'El sistema se actualizará a las 3:00 AM.', icon: 'mdi-update', color: 'orange' },
        { title: 'Error', message: 'Ha ocurrido un error en la operación.', icon: 'mdi-alert', color: 'red' },
        { title: 'Éxito', message: 'La operación se completó con éxito.', icon: 'mdi-check-circle', color: 'green' }
      ],
    };
  },
  methods: {
    removeNotification(index) {
      this.notifications.splice(index, 1);
    },
    markAllAsRead() {
      this.notifications = [];
    }
  }
};

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>

<style>
.me-4 {
  margin-right: 16px;
}

.no-shadow-btn {
  background: none !important; /* Sin fondo */
  box-shadow: none !important; /* Sin sombra */
  transition: transform 0.2s ease, color 0.2s ease;
}

.no-shadow-btn:hover {
  color: red; /* Color más llamativo al hover */
  transform: scale(1.2); /* Aumenta el tamaño para ser más clickeable */
}

</style>