<template>
  <div class="page">
    <div class="d-flex flex-row panel-share">
      <div>
        <p class="panel-share__text font-sfbold">Share</p>
      </div>
      <div class="panel-share__checkbox">
        <img v-if="isShareLoading" src="@/assets/loading.gif" />
        <input
          v-if="!isShareLoading"
          type="checkbox"
          :checked="shareChecked"
          @change="event => shareSwitchHandler(event.target.checked)"
        />
      </div>
    </div>
      <div>{{shareIP}}</div>
    <transition name="fade">
      <div v-show="shareIP" id="qrcode"></div>
    </transition>
    <hr />
  </div>
</template>

<script lang="ts">
import { onMounted, watch, defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const shareIP = computed(() => store.state.shareIP);
    const isShareLoading = computed(() => store.state.shareLoading);
    const shareChecked = computed(()=>!!store.state.shareIP);

    const renderQR = () => {
      if (shareIP.value) {
        document.getElementById("qrcode").innerHTML = "";
        const qrcode = new (window as any).QRCode(
          document.getElementById("qrcode"),
          {
            width: 100,
            height: 100
          }
        );
        qrcode.makeCode(shareIP.value);
      } else {
        document.getElementById("qrcode").innerHTML = "";
      }
    };

    const shareSwitchHandler = value => {
      if (value) {
        store.dispatch("shareOn");
      } else {
        store.dispatch("shareOff");
      }
    };

    onMounted(renderQR);

    watch(()=>shareIP.value, renderQR);

    return { shareIP, shareSwitchHandler, isShareLoading, shareChecked };
  }
});
</script>

<style lang="stylus" scoped>
.page {
  padding: 15px;
}

.panel-share {
  justify-content: space-between;
  width: 100%;

  &__text {
    font-size: 25px;
    margin: 0;
  }

  &__checkbox {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      margin-right: 5px;
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
