export default defineNuxtRouteMiddleware( async (to) => {
    //console.log('Middleware de autenticación ejecutado');
     const user = await useAuthStore().loggedIn;
  
     if (!user) {
      return await navigateTo({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
     }
  });
  