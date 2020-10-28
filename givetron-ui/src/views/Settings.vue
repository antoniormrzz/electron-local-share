<template>
  <div class="page">
    <div class="settings-header d-flex flex-row">
      <div class="font-sfbold settings-header__text">Settings</div>
      <button
        @click="saveHandler"
        class="btn btn-large btn-default settings-header__button"
      >
        Save
      </button>
    </div>
    <div class="d-flex flex-row settings-port">
      <div class="form-group">
        <label>Share Port (non-zero):</label>
        <input
          v-mask="'#####'"
          class="form-control"
          placeholder="default 3000"
          :value="port"
          @change="event => portChangeHandler(Number(event.target.value))"
        />
      </div>
    </div>
    <hr />
    <div class="settings-dir">
      <div class="settings-dir-title">
        Shared Folder (defaults to home/user)
      </div>
      <div class="d-flex flex-row settings-dir-wrapper">
        <p class="settings-dir-wrapper__text">
          {{ dir }}
        </p>
        <button
          @click="selectDirHandler"
          class="btn btn-large btn-primary settings-dir-wrapper__button"
        >
          Choose
        </button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { onMounted, watch, defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { selectPath } from "../electron";

export default defineComponent({
  setup() {
    const store = useStore();
    const settings = computed(() => store.state.settings);
    const port = ref(3000);
    const dir = ref("");

    const selectDirHandler = () => {
      const path = selectPath();
      if (path) {
        dir.value = path[0];
      }
    };

    const loadSettings = () => {
      port.value = settings.value.port;
      dir.value = settings.value.filesPath[0].path;
    };

    onMounted(() => loadSettings());

    watch(settings, loadSettings);

    const saveHandler = () => {
      if (port.value > 0) {
        store.dispatch("saveSettings", {
          port: port.value,
          filesPath: [{ path: dir.value }]
        });
      } else {
        store.dispatch("displayToast", {
          text: "Invalid port",
          type: "error"
        });
      }
    };

    const portChangeHandler = value => {
      port.value = value;
    };

    return {
      saveHandler,
      port,
      portChangeHandler,
      dir,
      selectDirHandler
    };
  }
});
</script>

<style lang="stylus" scoped>
.page {
  padding: 15px;

  .settings-header {
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &__text {
      font-size: 30px;
      margin: 0;
    }

    &__button {
      height: 30px;
      padding: 0 20px;
    }
  }

  .settings-port {
    .form-group {
      width: 100%;
    }

    label {
      margin: 0 0 0 2px;
    }

    input {
      margin: 0;
    }
  }

  .settings-dir {
    &-title {
      margin: 0 0 0 2px;
    }

    &-wrapper {
      justify-content: space-between;

      &__text {
        color: gray;
        font-size: 20px;
        max-width: 80%;
        overflow-wrap: break-word;
        margin: 0 0 5px 10px;
      }

      &__button {
        height: 30px;
        padding: 0 20px;
      }
    }
  }
}
</style>
