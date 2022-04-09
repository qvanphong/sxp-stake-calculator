<template>
  <BlockContainer />
  <div class="container mx-auto my-6">
    <span class="text-xl font-bold text-black dark:text-white">Voters</span>
    <div class="mt-2">
      <input
        v-model.lazy="searchValue"
        type="text"
        placeholder="Search voter by address"
        class="w-full md:w-2/5 lg:w-1/5 py-2 px-2 ease-in duration-150 bg-theme-secondary-200 hover:bg-theme-secondary-300 rounded-lg outline-none"
      >
    </div>

    <Table
      :headers="tableHeaders"
      class="w-full mt-2"
    >
      <tr
        v-for="voter in voters"
        :key="voter"
      >
        <td>
          <a
            :href="`https://explorer.solar.org/wallets/${voter.address}`"
            target="_blank"
            class="font-semibold text-theme-primary-600"
          >
            <span class="hidden md:block">
              {{ voter.address }}
            </span>
            <span class="block md:hidden">
              {{ shortenAddress(voter.address) }}
            </span>
          </a>
        </td>
        <td>
          <span class="font-semibold">{{ voter.unpaid }} SXP</span>
        </td>
        <td>
          <span class="font-semibold">{{ voter.paid }} SXP</span>
        </td>
      </tr>
    </Table>
    <div class="flex justify-center mt-4">
      <VPagination
        v-model="page"
        :pages="pageCount"
        active-color="var(--theme-color-primary-600)"
        @update:modelValue="fetchVoters"
      />
    </div>
  </div>
</template>

<script>
import BlockContainer from '@/components/BlockContainer.vue'
import Table from '@/components/Table.vue'
import VPagination from '@hennge/vue3-pagination'

import '@hennge/vue3-pagination/dist/vue3-pagination.css'

import { execGetRequest } from '@/util/http-common.js'
import { arktoshiToArk, toVoteWeight } from '@/util/converter.js'
import { mapState } from 'pinia'
import { useDelegateStore } from '@/stores/delegate'

export default {
  components: {
    BlockContainer,
    Table,
    VPagination,
  },

  data() {
    return {
      tableHeaders: ['Address', 'Unpaid', 'Paid'],
      voters: [],
      pageCount: 0,
      page: 1,
      searchValue: null,
    }
  },

  computed: {
    ...mapState(useDelegateStore, ['totalVotes'])
  },

  watch: {
    searchValue(value) {
      if (value) {
        this.findVoter(value)
      } else {
        this.fetchVoters();
      }
    }
  },

  created() {
    this.fetchVoters()
  },

  methods: {
    fetchVoters(page) {
      this.page = page ? page : 1

      execGetRequest(`voters?page=${this.page}`, this.successResponseCallback);
    },

    findVoter(voterAddress, page) {
      this.page = page ? page : 1

      execGetRequest(`voter?page=${this.page}&address=${voterAddress}`, this.successResponseCallback);
    },

    successResponseCallback(response) {
      this.voters = this.resultMapper(response.data.result)
      this.pageCount = response.data.total_page
    },

    resultMapper(result) {
      return result.map((voter) => {
            voter.paid = arktoshiToArk(voter.paid)
            voter.unpaid = arktoshiToArk(voter.unpaid)
            voter.weight = toVoteWeight(voter.paid)
            return voter
          })
    },

    shortenAddress(address) {
      return `${address.substring(0, 3)}...${address.substring(address.length - 3, address.length)}`
    }
  }

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
