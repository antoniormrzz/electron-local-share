import { createStore } from "vuex";
const { ipcRenderer } = window.require("electron");

const store = createStore({
  state() {
    return {
      shareIP: '',
      shareLoading: false,
      toast: { text: '', type: 'success' },
      displayToast: false,
      settings: {}
    };
  },
  mutations: {
    changeShareIP(state: any, payload) {
      state.shareIP = payload.ip;
      state.shareLoading = false;
    },
    setShareIsLoading(state: any) {
      state.shareLoading = true;
    },
    setShareIsNotLoading(state: any) {
      state.shareLoading = false;
      state.shareIP = '';
    },
    changeToast(state, payload) {
      state.toast = payload;
      state.displayToast = true;
    },
    hideToast(state) {
      state.displayToast = false;
    },
    loadSettings(state, payload) {
      state.settings = { ...payload };
    }
  },
  actions: {
    shareOn(context) {
      context.commit('setShareIsLoading');
      ipcRenderer.send('share:on', { port: context.state.settings.port });
    },
    shareOff(context) {
      context.commit('setShareIsLoading');
      ipcRenderer.send('share:off');
    },
    changeShareIP(context, payload) {
      context.commit('changeShareIP', payload);
    },
    sharePortInUse(context) {
      context.dispatch('displayToast', { text: 'Port is busy, unable to share, you can change port in settings.', type: 'error' });
      context.commit('setShareIsNotLoading');
    },
    displayToast(context, payload) {
      context.commit('changeToast', payload);
    },
    hideToast(context) {
      context.commit('hideToast');
    },
    success(context) {
      context.dispatch('displayToast', { text: 'Success', type: 'success' })
    },
    error(context) {
      context.dispatch('displayToast', { text: 'Error', type: 'error' })
    },
    errorDirectoryUnavailable(context) {
      context.dispatch('displayToast', { text: 'Could not access selected directory!', type: 'error' })
      context.commit('setShareIsNotLoading');
    },
    loadSettings(context, payload) {
      context.commit('loadSettings', payload);
    },
    saveSettings(context, payload) {
      ipcRenderer.send('settings:save', payload);
    }
  },
  getters: {

  }
});

export default store;
