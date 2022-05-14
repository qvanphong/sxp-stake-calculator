<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="border-b border-theme-secondary-300 dark:border-theme-secondary-800 dark:bg-theme-secondary-900 mx-4 md:mx-auto">
    <header
      class="flex flex-row container mx-auto items-stretch"
    >
      <div class="navbar-name py-4">
        <a>
          <span class="flex flex-row items-center text-black dark:text-white">
            <IconSolar class="h-10 mr-4" />
            <router-link to="/">
              <span class="text-2xl font-bold">SXP Stake Calculator</span>
            </router-link>
          </span>
        </a>
      </div>

      <div class="hidden md:flex ml-auto">
        <div class="flex space-x-6">
          <template
            v-for="menuItem in menuItems"
            :key="menuItem.title"
          >
            <a
              v-if="menuItem.externalLink"
              class="navbar-item flex justify-center aligns-center font-medium ease-in-out duration-200 dark:text-white"
              :href="menuItem.link"
              target="_blank"
            >
              <span class="flex items-center"> {{ menuItem.title }} </span>
            </a>

            <router-link
              v-else
              class="navbar-item flex justify-center aligns-center font-medium ease-in-out duration-200 dark:text-white"
              :to="menuItem.link"
            >
              <span class="flex items-center"> {{ menuItem.title }} </span>
            </router-link>
          </template>
        </div>
      </div>

      <div class="hidden md:flex flex-row items-center">
        <span class="h-5 ml-5 border-theme-secondary-300 border-r" />
        <span class="ml-5 font-medium dark:text-white">SXP/USD: {{ price }}</span>
      </div>

      <div class="hidden md:flex flex-row items-center">
        <span class="h-5 ml-5 border-theme-secondary-300 border-r" />
        <button @click="toggleDarkMode">
          <font-awesome-icon
            class="ml-5 dark:text-white"
            :icon="onDarkMode ? 'sun' : 'moon'"
          />
        </button>
      </div>

      <div class="block md:hidden ml-auto">
        <button
          class="p-4"
          @click="openMobileMenu = !openMobileMenu"
        >
          <font-awesome-icon
            class="dark:text-white"
            icon="bars"
          />
        </button>
      </div>
    </header>
  </div>
  <div
    v-if="openMobileMenu"
    id="mobileMenu"
    class="flex md:hidden flex-col px-8 space-y-4 my-4"
  >
    <div class="flex flex-col items-start space-y-4">
      <template
        v-for="menuItem in menuItems"
        :key="menuItem.title"
      >
        <a
          v-if="menuItem.externalLink"
          class="navbar-item flex justify-center aligns-center font-medium ease-in-out duration-200 dark:text-white"
          :href="menuItem.link"
          target="_blank"
        >
          <span class="flex items-center"> {{ menuItem.title }} </span>
        </a>

        <router-link
          v-else
          class="navbar-item flex justify-center aligns-center font-medium ease-in-out duration-200 dark:text-white"
          :to="menuItem.link"
        >
          <span class="flex items-center"> {{ menuItem.title }} </span>
        </router-link>
      </template>
    </div>

    <div class="flex-row items-center">
      <span class="font-medium dark:text-white">SXP/USD: {{ price }}</span>
    </div>

    <div class="flex-row items-center">
      <span class="h-5" />
      <button @click="toggleDarkMode">
        <span class="text-block font-medium dark:text-white">{{ onDarkMode ? 'Light' : 'Dark' }} mode</span>
        <font-awesome-icon
          class="ml-2 dark:text-white"
          :icon="onDarkMode ? 'sun' : 'moon'"
        />
      </button>
    </div>

    <div class="block md:hidden ml-auto" />
  </div>
</template>

<script>
import IconSolar from '@/components/icons/IconSolar.vue'

import { execGetRequest } from '@/util/http-common.js'

export default {
  components: {
    IconSolar,
  },
  data() {
    return {
      menuItems: [
        {
          title: 'How To Stake',
          link: 'https://sxpdirectory.com/stake-sxp/',
          externalLink: true,
        },
        {
          title: 'SXPViet',
          link: 'https://sxpviet.com/',
          externalLink: true,
        },
      ],
      price: 0,
      onDarkMode: false,
      openMobileMenu: false
    }
  },

  created() {
    this.fetchSxpPrice()
    this.onDarkMode = this.isOnDarkMode()
  },

  methods: {
    toggleDarkMode() {
      if (localStorage.theme === 'light' || !('theme' in localStorage)) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }

      this.onDarkMode = this.isOnDarkMode()
    },

    isOnDarkMode() {
      return document.documentElement.classList.contains('dark')
    },

    fetchSxpPrice() {
      execGetRequest('https://api.coingecko.com/api/v3/simple/price?ids=swipe&vs_currencies=usd', (response) => {
        this.price = Number.parseFloat(response.swipe.usd).toFixed(2)
      })
    },
  },
}
</script>

<style>
.navbar-item > span:hover {
  color: var(--theme-color-secondary-500);
  border-bottom: 2px solid var(--theme-color-secondary-300);
}

.toggle-dark-mode {
  color: var(--theme-color-secondary-700);
}
</style>
