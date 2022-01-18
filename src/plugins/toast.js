export default {
  install(Vue) {
    /**
     * Toast plugin
     * Create global $toast instance property
     *
     * @param {Object} config - config object
     * @property {string} type - Alert type. You can use either the info, warning, error, or success.
     * @property {string} message - Alert message.
     */
    Vue.prototype.$toast = function (config) {
      this.$store.dispatch('alert/showAlert', config);
    };
  },
};
