<template>
  <transition name="fade">
    <div v-if="display" class="toast">
      <div class="toast-inner" :style="{ backgroundColor: bgcolor }">
        <span>{{ toastText }}</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const bgcolor = computed(() => {
      switch (store.state.toast.type) {
        case "error":
          return "#FB3F39";
        case "success":
          return "#33AA45";
        default:
          return "#737475";
      }
    });
    const toastText = computed(() => store.state.toast.text);
    const display = computed(() => store.state.displayToast);

    watch(display, () => {
      if (display.value) {
        setTimeout(() => {
          store.dispatch("hideToast");
        }, 2000);
      }
    });

    return { bgcolor, toastText, display };
  }
});
</script>

<style lang="stylus" scoped>
.toast {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  bottom: 30px;
  z-index: 500;
  min-width: 100%;

  &-inner {
    position: relative;
    border-radius: 10px;
    max-width: 70vw;
    padding: 10px 20px;

    span {
      color: white;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>