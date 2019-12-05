<template>
  <section class="col-xl-6 col-lg-6 col-md-7">
    <v-img src="@/assets/l.png"/>
    <section class="d-flex justify-content-center flex-wrap w-100">
      <h1>
        Hooray!<br>
        We activated your account in Vueding. <br>
        You can <router-link to="/login">sign in</router-link> to start inviting guests.
      </h1>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'activateAccountContainer',
  };
</script>

<style scoped>
  a {
    font-size: 22px;
    text-decoration: underline;
  }
h1 {
  font-size: 22px;
  text-align: center;
}
</style>
