<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },

  created() {
    this.checkAndEnableDarkMode();
  },

  methods: {
    checkAndEnableDarkMode() {
      if (localStorage.theme && localStorage.theme == 'dark') {
        document.documentElement.classList.add('dark')
      }
    }
  }
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
@import "@/assets/index.css";
</style>
