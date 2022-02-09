export default ($axios) => ({
  getTopDelegates: async () => await $axios.get("/api/delegates?limit=51"),
});
