<script>
import Navbar from "@/components/Navbar.vue";
import { HTTP, isSuccess } from "@/util/http-common.js";
import { useDelegateStore } from '@/stores/delegate'

export default {
  components: {
    Navbar,
  },

  created() {
    const delegateStore = useDelegateStore();

    HTTP.get('/info').then(response => {
      if (isSuccess) {
        delegateStore.setDelegateInfo(response.data);
      }
    })

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
