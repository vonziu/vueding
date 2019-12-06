<template>
  <main class="auth">
    <section class="auth__left-panel col-lg-5 col-xl-5">
      <article>
        <h1>Welcome to Vueding</h1>
        <p>Tired of calling your guest for invitation confirm ?
          <br>
          Sign in and let the magic begins
        </p>
      </article>
    </section>
    <section class="col-xl-7 col-lg-6 col-md-12 auth__right-panel">
      <transition mode="out-in" name="fade">
        <router-view/>
      </transition>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'authPanel',
  };
</script>

<style scoped lang="scss">
  $primary-color: #42b983;
  .auth {
    min-height: 100%;
    display: flex;

    &__left-panel {
      padding: 3rem;
      display: flex;
      align-items: center;
      background: $primary-color;
      color: white;

      h1 {
        font-size: 35px;
        margin-bottom: 1rem;
      }

      p {
        font-size: 18px;
      }
    }

    &__right-panel {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f7f7f7;
    }
  }

  @media all and (max-width: 992px) {
    .auth__left-panel {
      display: none;
    }
  }
</style>
