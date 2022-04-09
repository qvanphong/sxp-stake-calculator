<template>
  <div class="flex justify-center mt-4">
    {{ pageCount }}
    <VPagination
      v-model="page"
      :pages="pageCount"
      active-color="var(--theme-color-primary-600)"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script>
import VPagination from '@hennge/vue3-pagination'

import '@hennge/vue3-pagination/dist/vue3-pagination.css'

export default {
  components: {
    VPagination,
  },
  props: {
    modelValue: { type: Number, default: 1 },
    pageCount: { type: Number, default: 1 },
    activeColor: { type: String, default: 'var(--theme-color-primary-600)' },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      page: 1,
    }
  },
  watch: {
    pageCount(value) {
      console.log(value)
    },
  },
}
</script>

<style></style>
