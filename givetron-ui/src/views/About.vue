<template>
  <div class="about">
    <p class="about__title font-sfbold">About Givetron</p>
    <p class="about__text">
      Givetron is a free and open-source wifi sharing app, made by me, Antonio
      Ramirez. Givetron is part of my free software releases. You can check my
      projects out
      <a
        target="_blank"
        @click.prevent="openExternalBrowser"
        href="https://github.com/antoniormrzz"
        >here</a
      >.
      <br />
      <br />
      For your ideas, bug reports, offers or donations please contact
      <a href="mailto:sepehralizade@live.com">my email</a>.
      <br />
      <br />
      <span class="icon icon-heart"></span>
    </p>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { openRemoteLink } from "../electron";

export default defineComponent({
  setup() {
    function openExternalBrowser(e) {
      openRemoteLink(e.target.href);
    }

    return {
      openExternalBrowser
    };
  }
});
</script>
<style lang="stylus" scoped>
.about {
  padding: 15px;

  &__title {
    font-size: 30px;
    color: black;
    margin-top: 0;
  }

  &__text {
    color: gray;
  }
}
</style>