export default {
  install(Vue) {
    /**
     * Permission plugin
     *
     * Create a global $hasPermission instance property to check
     * if the logged in user has a specific permissions
     *
     * @param {string} value - permission to check
     *
     * @returns {boolean}
     */
    Vue.prototype.$hasPermission = function (value) {
      const permissions = this.$store.getters['auth/permissions'];

      if (Array.isArray(permissions)) {
        return value && permissions.includes(value);
      }

      return false;
    };
  },
};
