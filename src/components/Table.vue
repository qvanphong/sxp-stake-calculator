<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="table">
    <div class="table-container">
      <table class="sticky-headers table-auto	md:table-fixed w-full">
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header"
              class="text-left text-theme-secondary-500"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
.table-container table thead th:not(:last-child)::after {
  content: '';
  position: absolute;
  border-left: 1px solid var(--theme-color-secondary-300);
  height: 35%;
  top: 33%;
  right: 0;
}

.table-container table thead th {
  position: relative;
}

.table-container table thead {
  border-bottom: 1px solid var(--theme-color-secondary-200);
}


.table-container table tr td {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--theme-color-secondary-300);
}

.table-container table tbody tr {
  transition-timing-function: cubic-bezier(.4,0,1,1);
  transition-duration: .05s;
}

.table-container table tbody tr:hover {
  background-color: var(--theme-color-secondary-200);
}

.table-container table tr td:not(:first-child) {
  padding-left: 0.75rem;
}

.table-container table tr th:not(:first-child) {
  padding: 0.75rem;
}


html.dark .table-container table thead th:not(:last-child)::after {
  border-left: 1px solid var(--theme-color-secondary-800);
}

html.dark  .table-container table thead  {
  border-bottom: 1px solid var(--theme-color-secondary-800);
}

html.dark .table-container table tr td {
  color: white;
  border-bottom: 1px solid var(--theme-color-secondary-800);
}

html.dark .table-container table tbody tr:hover {
  background-color: #101010;
}
</style>
