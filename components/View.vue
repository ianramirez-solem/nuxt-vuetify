<template>
  <v-main class="grey lighten-3">
      <v-fade-transition mode="out-in">
          <div id="core-view">
              <slot></slot>
          </div>
      </v-fade-transition>
  </v-main>
</template>

<script>

</script>
<style lang="scss">
#core-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  
}

</style>