<template>
  <div class="window">
    <ToastComponent />
    <header class="toolbar toolbar-header">
      <h1 class="title">Givetron</h1>
    </header>
    <div class="window-content">
      <div class="pane-group">
        <div class="pane pane-sm sidebar d-flex flex-col">
          <nav class="nav-group">
            <router-link class="nav-group" v-slot="{ isExactActive }" to="/">
              <span class="nav-group-item" :class="{ active: isExactActive }">
                <span class="icon icon-home"></span>
                Home
              </span>
            </router-link>
            <router-link
              class="nav-group"
              v-slot="{ isExactActive }"
              to="/settings"
            >
              <span class="nav-group-item" :class="{ active: isExactActive }">
                <span class="icon icon-tools"></span>
                Settings
              </span>
            </router-link>
            <router-link
              class="nav-group"
              v-slot="{ isExactActive }"
              to="/about"
            >
              <span class="nav-group-item" :class="{ active: isExactActive }">
                <span class="icon icon-info"></span>
                About
              </span>
            </router-link>
          </nav>
          <div id="credits">
            made with <span class="icon icon-heart"></span> by
            <strong>Antonio Ramirez</strong>
          </div>
        </div>
        <div class="pane">
          <router-view />
        </div>
      </div>
    </div>
    <GlobalStyles />
  </div>
</template>

<script>
import GlobalStyles from "./components/GlobalStyles";
import ToastComponent from "./components/Toast";
import store from "./store";

export default {
  components: {
    GlobalStyles,
    ToastComponent
  },
  store
};
</script>

<style scoped lang="stylus">
#credits {
  margin: 20px auto;
}

.sidebar {
  min-height: 100%;
  justify-content: space-between;
}
</style>
