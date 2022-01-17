export default {
  install(Vue) {
    /**
     * Alert plugin
     * Create global $alert instance property
     *
     * @param {string} config - config object
     * @property {string} variant - Alert variant. You can use either the info, warning, error, or success.
     * @property {string} message - Alert message.
     */
    Vue.prototype.$alert = function (config) {
      this.$store.dispatch('alert/showAlert', config);
    };
  },
};
