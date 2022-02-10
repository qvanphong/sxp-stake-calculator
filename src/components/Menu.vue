<template>
  <div>
    <div class="flex flex-row items-center justify-between py-4">
      <div class="flex items-center py-4">
        <img style="width: auto; height: 48px" src="/img/logo_only.png" />
        <div class="ml-4">
          <h2 class="text-xl font-bold text-orange-400">{{ $t("title") }}</h2>
        </div>
      </div>
      <div class="space-x-4 hidden lg:block">
        <a-button
          type="link"
          size="small"
          class="text-orange-400 text-lg font-bold hover:text-orange-700 p-0"
          @click="emitOpenHowToUse"
        >
          <span class="font-bold">{{ $t("use_instruction") }}</span>
        </a-button>
        <a class="text-orange-400 text-lg font-bold hover:text-orange-700">{{
          $t("stake_instruction")
        }}</a>
        <a
          class="text-orange-400 text-lg font-bold hover:text-orange-700"
          href="https://sxpviet.com"
          target="_blank"
          >SXPViet</a
        >
        <a-select
          v-model="locale"
          class="ml-4"
          default-value="en"
          style="width: 120px"
          @change="handleI18NChange"
        >
          <a-select-option value="en"> English </a-select-option>
          <a-select-option value="tr"> Turkish </a-select-option>
          <a-select-option value="vi"> Tiếng Việt </a-select-option>
        </a-select>
      </div>
      <div
        id="mobile_menu"
        class="block lg:hidden w-5 mr-4"
        @click="openingMenu = !openingMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="text-orange-400"
        >
          <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            fill="#fb923c"
            d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
          />
        </svg>
      </div>
    </div>
    <div
      v-if="openingMenu"
      class="flex flex-col items-start w-full bg-gray-100 space-y-2 py-6 mb-4 p-2"
    >
      <a-button
        type="link"
        size="small"
        class="text-orange-400 text-md font-bold hover:text-orange-700 p-0"
        @click="emitOpenHowToUse"
      >
        <span class="font-bold">{{ $t("use_instruction") }}</span>
      </a-button>
      <a class="text-orange-400 text-md font-bold hover:text-orange-700">{{
        $t("stake_instruction")
      }}</a>
      <a
        class="text-orange-400 text-md font-bold hover:text-orange-700"
        href="https://sxpviet.com"
        target="_blank"
        >SXPViet</a
      >
      <a-select
        v-model="locale"
        default-value="en"
        style="width: 120px"
        @change="handleI18NChange"
      >
        <a-select-option value="en"> English </a-select-option>
        <a-select-option value="tr"> Turkish </a-select-option>
        <a-select-option value="vi"> Tiếng Việt </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: null,
      openingMenu: false,
    };
  },

  created() {
    const locale = localStorage.getItem("locale");

    if (locale != null) {
      this.locale = localStorage.getItem("locale");
      this.$i18n.locale = this.locale;
    } else {
      this.locale = this.$i18n.locale;
    }
  },
  methods: {
    handleI18NChange(value) {
      this.$i18n.locale = value;
      localStorage.setItem("locale", value);
    },
    emitOpenHowToUse() {
      this.$emit("openHowToUse");
    },
  },
};
</script>

<style></style>
