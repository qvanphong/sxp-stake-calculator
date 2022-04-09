<template>
  <BlockContainer />
  <div class="container mx-auto my-6">
    <span class="text-xl font-bold text-black dark:text-white">Payments</span>
    <div class="mt-2">
      <input
        v-model.lazy="searchValue"
        type="text"
        placeholder="Search payment by address"
        class="w-full md:w-2/5 lg:w-1/5 py-2 px-2 ease-in duration-150 bg-theme-secondary-200 hover:bg-theme-secondary-300 rounded-lg outline-none"
      >
    </div>

    <Table
      :headers="tableHeaders"
      class="w-full mt-2"
    >
      <tr
        v-for="payment in payments"
        :key="payment"
      >
        <td>
          <a
            :href="`https://explorer.solar.org/transactions/${payment.id}`"
            class="font-semibold text-theme-primary-600"
          >
            <IconTxId />
          </a>
        </td>
        <td>
          <span class="font-semibold">{{ payment.process_at }}</span>
        </td>
        <td>
          <span class="font-semibold">{{ payment.address }}</span>
        </td>
        <td>
          <span class="font-semibold">{{ payment.total_amount }} SXP</span>
        </td>
      </tr>
    </Table>
    <div class="flex justify-center mt-4">
      <VPagination
        v-model="page"
        :pages="pageCount"
        active-color="var(--theme-color-primary-600)"
        @update:modelValue="findPayments"
      />
    </div>
  </div>
</template>

<script>
import BlockContainer from '@/components/BlockContainer.vue'
import IconTxId from '@/components/icons/IconTxId.vue'
import Table from '@/components/Table.vue'
import VPagination from '@hennge/vue3-pagination'

import '@hennge/vue3-pagination/dist/vue3-pagination.css'

import { execGetRequest } from '@/util/http-common.js'
import { arktoshiToArk } from '@/util/converter.js'
import { mapState } from 'pinia'
import { useDelegateStore } from '@/stores/delegate'

export default {
  components: {
    BlockContainer,
    Table,
    IconTxId,
    VPagination,
  },

  data() {
    return {
      tableHeaders: ['ID', 'Processed Time', 'Destination', 'Amount'],
      payments: [],
      pageCount: 0,
      page: 1,
      searchValue: null,
    }
  },

  computed: {
    ...mapState(useDelegateStore, ['totalVotes']),
  },

  watch: {
    searchValue(value) {
      if (value) {
        this.findPayment(value)
      } else {
        this.findPayments()
      }
    },
  },

  created() {
    this.findPayments()
  },

  methods: {
    findPayments(page) {
      this.page = page ? page : 1

      execGetRequest(`payments?page=${this.page}`, this.successResponseCallback)
    },

    findPayment(paymentAddress, page) {
      this.page = page ? page : 1

      execGetRequest(`payment?page=${this.page}&address=${paymentAddress}`, this.successResponseCallback)
    },

    successResponseCallback(response) {
      this.payments = this.resultMapper(response.data.result)
      this.pageCount = response.data.total_page
    },

    resultMapper(result) {
      return result.map((payment) => {
        payment.total_amount = arktoshiToArk(payment.total_amount)
        return payment
      })
    },
  },
}
</script>

<style>
.Pagination .Page {
  padding: 1rem;
  font-size: 1rem;
}

.Pagination .Page-active {
  color: var(--theme-color-secondary-50);
  font-size: 1rem;
  font-weight: 500;
}
</style>
