<template>
  <form class="col-xl-6 col-lg-6 col-md-7">
    <v-img src="@/assets/l.png"/>
    <v-text-field label="Name" solo/>
    <v-text-field label="Login" solo/>
    <v-text-field label="Email" solo/>
    <v-text-field
      label="Password"
      :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
      solo/>
    <v-text-field
      label="Repeat password"
      :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
      solo/>
    <section class="d-flex justify-content-center w-100">
      <v-btn color="primary" large>Register account</v-btn>
    </section>
    <section class="d-flex justify-content-center w-100 mt-3">
      <router-link :to="'/login'">Already registered ? Sign in</router-link>
    </section>
  </form>
</template>

<script>
  export default {
    name: 'registerContainer',
    data: () => ({
      showPassword: false,
    }),
  };
</script>

<style scoped lang="scss">

</style>
