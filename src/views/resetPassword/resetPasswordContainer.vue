<template>
  <form class="col-xl-6 col-lg-6 col-md-7">
    <v-img src="@/assets/l.png"/>
    <v-text-field label="Password" solo/>
    <v-text-field label="Repeat password" solo/>
    <section class="d-flex justify-content-center w-100">
      <v-btn color="primary" large>Reset password</v-btn>
    </section>
    <section class="d-flex justify-content-center w-100 mt-3">
      <router-link :to="'/login'">Want to sign in ?</router-link>
    </section>
  </form>
</template>

<script>
  export default {
    name: 'resetPasswordContainer',
    data: () => ({
      showPassword: false,
    }),
  };
</script>

<style scoped lang="scss">

</style>
