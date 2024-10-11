export default defineNuxtRouteMiddleware( async (to,from) => {
    const user = await useAuthStore().loggedIn;
    if (user) {
      return await navigateTo("/dashboard");
    }
  })
  