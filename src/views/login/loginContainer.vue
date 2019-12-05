<template>
    <form class="col-xl-6 col-lg-6 col-md-7">
      <v-img src="@/assets/l.png"/>
      <v-text-field label="Login" solo/>
      <v-text-field
        label="Password"
        :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
        solo/>
      <div class="d-flex justify-content-end w-100 mb-3">
        <router-link :to="'/remind-password'">Forgotten password ?</router-link>
      </div>
      <section class="d-flex justify-content-between w-100">
        <v-btn to="/register" large>Sign up</v-btn>
        <v-btn color="primary" large>Sign in</v-btn>
      </section>
    </form>
</template>

<script>
  export default {
    name: 'LoginContainer',
    data: () => ({
      showPassword: false,
    }),
  };
</script>

<style scoped lang="scss">


</style>
