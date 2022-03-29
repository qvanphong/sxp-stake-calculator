export default ($axios) => ({
  getTopDelegates: async () => await $axios.get("/api/v1/delegates/"),
});
