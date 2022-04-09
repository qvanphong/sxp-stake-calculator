<template>
  <div class="flex bg-white  dark:bg-theme-secondary-900 rounded-xl py-4 px-6">
    <div class="flex flex-row flex-grow items-center space-x-4">
      <span class="w-11 h-11 flex justify-center items-center border-2 rounded-3xl">
        <font-awesome-icon :icon="icon" />
      </span>
      <div class="flex flex-col flex-grow space-y-1">
        <span class="text-sm whitespace-nowrap font-semibold text-theme-secondary-500">{{ title }}</span>
        <span class="text-md whitespace-nowrap font-semibold text-black  dark:text-white">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>
