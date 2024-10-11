<template>
  <v-app>
      <Drawer />
      <appBar />
      <View >
          <slot></slot>
          <!-- <Footer /> -->
      </View>
  </v-app>
</template>