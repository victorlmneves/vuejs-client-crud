<template>
  <nav class="navbar navbar-dark bg-dark">
    <a href="#" class="navbar-brand">VictorNeves Tutorial API</a>
    <div class="navbar-nav">
      <li class="nav-item">
        <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/add" class="nav-link">Add</router-link>
      </li>
    </div>
  </nav>
  <div class="container-fluid mt-3">
    <router-view />
  </div>
</template>

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
