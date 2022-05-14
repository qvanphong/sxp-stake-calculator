<template>
  <div class="overflow-auto dark:bg-black bg-theme-secondary-100">
    <div class="py-8 flex container mx-auto">
      <div class="md:w-full">
        <div
          id="block-container"
          class="flex grid-cols-2 gap-3 w-full md:grid xl:flex xl:gap-0 xl:space-x-3 xl:justify-center"
        >
          <BlockItem
            title="Height"
            :value="`${height}`"
            icon="hammer"
          />
          <BlockItem
            title="Total supply"
            :value="`${totalSupplyAsArk} SXP`"
            icon="list"
          />
          <BlockItem
            title="Total votes"
            :value="totalVotes"
            icon="user-group"
          />
          <BlockItem
            title="Market Cap"
            :value="`${marketCap} USD`"
            icon="chart-pie"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockItem from '@/components/BlockItem.vue'

import { arktoshiToArk } from '@/util/converter.js'
import { execGetRequest, API_URL } from '@/util/http-common.js'

export default {
  components: {
    BlockItem
  },
  data() {
    return {
      height: "0",
      supply: 0,
      marketCap: "0",
      totalVotes: "0%",
    }
  },
  computed: {
    totalSupplyAsArk() {
      return (arktoshiToArk(this.supply)).toLocaleString('en');
    }
  },
  created() {
    this.fetchBlockchainData();
    this.fetchMarketCap();
  },
  methods: {
    arktoshiToArk,

    fetchBlockchainData() {
      execGetRequest(API_URL.SXP + '/blockchain', (response) => {
        const responseData = response.data
        this.height = responseData.block.height.toLocaleString('en')
        this.supply = parseInt(responseData.supply);
      })
    },

    fetchMarketCap() {
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=swipe&order=market_cap_desc&per_page=1&page=1&sparkline=false';
      execGetRequest(url, (response) => {
        this.marketCap = response[0].market_cap.toLocaleString('en');
      })
    }
  }
}
</script>

<style>
#block-container *:last-child {
  flex: 1;
}
</style>
