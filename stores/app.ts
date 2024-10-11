export const useAppStore = defineStore('app', {
  state: () => ({
      miniVariant: false,
      drawer: false,
      color: 'success',
  }),
  actions: {
      setDrawer(value: boolean) {
          this.drawer = value;
      },
      setColor(value: string) {
          this.color = value;
      },
      toggleDrawer() {
          this.drawer = !this.drawer;
      },
      toggleMiniVariant() {
          this.miniVariant = !this.miniVariant;
      },
  },
});