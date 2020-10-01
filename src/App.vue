<template>
  <div>
    <Header></Header>
    <div class="container-fluid mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar {
  padding: 1rem;

  &-nav {
    flex-direction: row;
  }
}

.nav-item:not(:last-child) {
  margin-right: 1rem;
}
</style>
